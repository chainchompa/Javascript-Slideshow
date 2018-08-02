'use strict';

document.addEventListener('DOMContentLoaded', function() {
  const images = Array.from(
    document.querySelectorAll('#images li img')
  );
  const preview = document.querySelector('#preview');
  const previous = document.querySelector('#prev');
  const next = document.querySelector('#next');
  const play = document.querySelector('#play');
  const stop = document.querySelector('#stop');

  let selected = null;
  let interval = null;

  function selectPrevious(event) {
    if(event) {
      event.preventDefault();
    }

    let index = images.indexOf(selected);

    if(index === 0) {
      index = images.length;
    }

    selectImage(images[index - 1]);
  }

  function selectNext(event) {
    if(event) {
      event.preventDefault();
    }

    let index = images.indexOf(selected);

    if(index === images.length - 1) {
      index = -1;
    }

    selectImage(images[index + 1]);
  }

  function selectImage(img) {
    const url = img.getAttribute('src');
    const current = document.querySelector('.selected');

    if(current) {
      current.className = '';
    }

    img.className = 'selected';
    selected = img;

    preview.setAttribute('style', `background-image: url(${url})`);
  }

  function startSlideShow() {
    play.setAttribute('style', 'display: none');
    stop.setAttribute('style', '');
    interval = setInterval(selectNext, 5000);
  }

  function stopSlideShow() {
    play.setAttribute('style', '');
    stop.setAttribute('style', 'display: none');
    clearInterval(interval);
  }

  previous.addEventListener('click', selectPrevious);
  next.addEventListener('click', selectNext);
  play.addEventListener('click', startSlideShow);
  stop.addEventListener('click', stopSlideShow);

  for(let img of images) {
    img.addEventListener('click', function() {
      selectImage(img);
      window.scrollTo(0,0);
      stopSlideShow();
    })
  }

  selectImage(images[0]);
  startSlideShow();
});
