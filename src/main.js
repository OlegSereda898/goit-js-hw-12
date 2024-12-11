import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;

const perPage = 15;
const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function toggleLoader(isVisible) {
    loader.style.display = isVisible ? 'block' : 'none';
}

function toggleLoaderOnButton(isLoading) {
    if (isLoading) {
    loadMoreBtn.textContent = 'Loading images, please wait...';
    loadMoreBtn.disabled = true;
    } else {
    loadMoreBtn.textContent = 'Load more';
    loadMoreBtn.disabled = false;
    }
}

async function onSearch(event) {
    event.preventDefault();
    query = event.currentTarget.elements.searchQuery.value.trim();
    
    if (!query) {
        iziToast.warning({
            title: 'Warning',
            message: 'Search query cannot be empty!',
            position: "topRight",
            titleColor: "#ffff",
            messageColor: "#ffff"
        });
    return;
    }

    page = 1;
    gallery.innerHTML = '';
    loadMoreBtn.classList.add('hidden');
    toggleLoader(true);

    try {
    const { hits, totalHits } = await fetchImages(query, page, perPage);
    
    if (hits.length === 0) {
        iziToast.error({
            title: 'Error',
            message: 'No images match your search query!',
            position: "topRight",
            titleColor: "#ffff",
            messageColor: "#ffff"
        });
        return;
    }

    gallery.innerHTML = renderGallery(hits);
    lightbox.refresh();
    
        iziToast.success({
            title: 'Success',
            message: `Found ${totalHits} images.`,
            position: "topRight",
            titleColor: "#ffff",
            messageColor: "#ffff"
        });

    if (totalHits > perPage) {
        loadMoreBtn.classList.remove('hidden');
    }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
            position: "topRight",
            titleColor: "#ffff",
            messageColor: "#ffff",
            backgroundColor: "#ef4040",
        });
    console.error('Error:', error);
    } finally {
    toggleLoader(false);
    }
}

async function onLoadMore() {
    page += 1;
    toggleLoader(true);
    toggleLoaderOnButton(true);

    try {
    const { hits, totalHits } = await fetchImages(query, page, perPage);

    gallery.insertAdjacentHTML('beforeend', renderGallery(hits));
    lightbox.refresh();

    const totalLoaded = page * perPage;

    if (totalLoaded >= totalHits) {
        loadMoreBtn.classList.add('hidden');
        iziToast.info({
            title: 'Info',
            message: "You've reached the end of the search results.",
            position: "topRight",
            titleColor: "#ffff",
            messageColor: "#ffff"
        });
    }

    smoothScroll();
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Failed to load more images. Please try again later.',
            position: "topRight",
            titleColor: "#ffff",
            messageColor: "#ffff"
        });
    console.error('Error:', error);
    } finally {
        toggleLoader(false);
        toggleLoaderOnButton(false);
    }
}

function smoothScroll() {
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
    });
}

