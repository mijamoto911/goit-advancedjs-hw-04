// Refactoring

import { createGalleryCard } from './js/render-functions';
import { searchPhotos } from './js/pixabay-api';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const searchFormElement = document.querySelector('.js-search-form');
const galleryElements = document.querySelector('.js-gallery');
const loaderElement = document.querySelector('.js-loader');
const loadMoreBtn = document.querySelector('.js-load-more-btn');
let lightbox;
let searchValue = '';
let page = 1;

const onSearchSubmit = async event => {
  event.preventDefault();

  searchValue = event.target.elements.user_query.value.trim();
  event.target.elements.user_query.value = '';
  page = 1;

  if (searchValue === '') {
    iziToast.error({
      message: 'Please fill in this place',
      position: 'topRight',
    });
    return;
  }

  galleryElements.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
  loaderElement.classList.remove('is-hidden');

  try {
    const { hits, totalHits } = await searchPhotos(searchValue, page);

    loaderElement.classList.add('is-hidden');

    if (hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    const galleryCards = hits.map(createGalleryCard).join('');
    galleryElements.innerHTML = galleryCards;

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery-link', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      lightbox.refresh();
    }

    if (totalHits > hits.length) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
    loaderElement.classList.add('is-hidden');
  }
};

const onLoadMoreClick = async () => {
  page += 1;
  loaderElement.classList.remove('is-hidden');

  try {
    const { hits, totalHits } = await searchPhotos(searchValue, page);

    loaderElement.classList.add('is-hidden');

    const galleryCards = hits.map(createGalleryCard).join('');
    galleryElements.insertAdjacentHTML('beforeend', galleryCards);

    lightbox.refresh();

    if (galleryElements.children.length >= totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    const { height: cardHeight } = document
      .querySelector('.gallery-card')
      .getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
    loaderElement.classList.add('is-hidden');
  }
};

searchFormElement.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);
