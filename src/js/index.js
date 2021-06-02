
import '../css/common.css';
// import './io.js'
import ImagesApiService from './services/apiService';
import imagesListTpl from '../templates/images-list.hbs';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
   e.preventDefault();
   const form = e.currentTarget;
   imagesApiService.query = form.elements.query.value;
   if (imagesApiService.query.trim() === '' ) {
   clearImagesContainer();
   return error({
      text: 'Sorry,not found,please check your request!',
      delay: 1500,
      closerHover: true,
   });
   }

   imagesApiService.resetPage();
   clearImagesContainer();
   fetchImages();
}

function getRefs() {
   return {
      searchForm: document.querySelector('.search-form'),
      imagesContainer: document.querySelector('.js-articles-container'),
      sentinel: document.querySelector('#sentinel'),
      };
}

function fetchImages() {
   return imagesApiService.fetchImages()
      .then(hits => {
      if (hits.length === 0) {
         error({
         text: 'No matches found!',
         delay: 1500,
         closerHover: true,
         });
      } else {
         renderImagesList(hits);
      }
   })
}

function renderImagesList(hits) {
   const markup = imagesListTpl(hits);
   refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
   
}

function clearImagesContainer() {
   refs.imagesContainer.innerHTML = '';
}

window.scrollTo({
   top: document.documentElement.scrollHeight,
   behavior: 'smooth',
});

const onEntry = entries => {
   entries.forEach(entry => {
      if (entry.isIntersecting && imagesApiService.query !== '' && imagesApiService.page > 1) {
         fetchImages()
      }
   });
};

const options = {
   rootMargin: '150px'
};
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel)