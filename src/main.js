import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;

const perPage = 15;
const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
    event.preventDefault();
    query = event.currentTarget.elements.searchQuery.value.trim();
    
    if (!query) {
    alert('Search query cannot be empty!');
    return;
    }

    page = 1;
    gallery.innerHTML = '';
    loadMoreBtn.classList.add('hidden');

    try {
    const { hits, totalHits } = await fetchImages(query, page, perPage);
    
    if (hits.length === 0) {
        alert('Sorry, no images match your search query.');
        return;
    }

    gallery.innerHTML = renderGallery(hits);
    lightbox.refresh();

    if (totalHits > perPage) {
        loadMoreBtn.classList.remove('hidden');
    }
    } catch (error) {
    console.error('Error:', error);
    }
}

async function onLoadMore() {
    page += 1;

    try {
    const { hits, totalHits } = await fetchImages(query, page, perPage);

    gallery.insertAdjacentHTML('beforeend', renderGallery(hits));
    lightbox.refresh();

    const totalLoaded = page * perPage;

    if (totalLoaded >= totalHits) {
        loadMoreBtn.classList.add('hidden');
        alert("We're sorry, but you've reached the end of search results.");
    }

    smoothScroll();
    } catch (error) {
    console.error('Error:', error);
    }
}

function smoothScroll() {
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
    });
}

