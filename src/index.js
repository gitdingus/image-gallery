import { createHtmlElement } from 'dom-utils';
import galleryHtml from './templates/gallery-template.html';
import unselected from './templates/radio-unselected-svg-template.html';
import selected from './templates/radio-selected-svg-template.html';
import './gallery.css';


function createImageGallery(images) {
  let currentImage = 0;

  const galleryTemplate = createHtmlElement({ tag: 'template' });
  galleryTemplate.innerHTML = galleryHtml;

  const gallery = galleryTemplate.content.firstElementChild.cloneNode(true);
  const imageContainer = gallery.querySelector('.image-container');

  images.forEach((img) => {
    imageContainer.appendChild(getWrappedImage(img));
  });
  function clearGalleryButtons() {
    const buttonContainer = gallery.querySelector('.gallery .gallery-buttons');

    while (buttonContainer.hasChildNodes() === true) {
      buttonContainer.firstChild.remove();
    }
  }

  function getSvgFromTemplateFile(template) {
    const svgTemplate = createHtmlElement({ tag: 'template' });
    svgTemplate.innerHTML = template;

    const svg = svgTemplate.content.firstElementChild.cloneNode(true);
    return svg;
  }

  function buildButtonsPanel() {
    const images = gallery.querySelectorAll('.gallery .image-wrapper');
    const buttons = gallery.querySelector('.gallery .gallery-buttons');
    clearGalleryButtons();

    images.forEach((item, index) => {
      let newButton;
      if (index === currentImage) {
        newButton = getSvgFromTemplateFile(selected);
      } else {
        newButton = getSvgFromTemplateFile(unselected);
      }

      newButton.addEventListener('click', () => {
        displayImage(index);
      });

      buttons.appendChild(newButton);
    });
  }
  function displayCurrentImage() {
    imageContainer.style.top = `calc(${-currentImage}*100%)`;
    buildButtonsPanel();
  }

  function displayImage(index) {
    currentImage = index;
    displayCurrentImage();
  }

  displayCurrentImage();

  function nextImage() {
    currentImage += 1;

    if (currentImage > imagesArray.length - 1) {
      currentImage = 0;
    }
    displayCurrentImage();
  }

  function previousImage() {
    currentImage -= 1;

    if (currentImage < 0) {
      currentImage = imagesArray.length - 1;
    }

    displayCurrentImage();
  }

  gallery.querySelector('.nav-left').addEventListener('click', previousImage);
  gallery.querySelector('.nav-right').addEventListener('click', nextImage);

  function getWrappedImage(img) {
    const imageWrapper = createHtmlElement({
      tag: 'div',
      classes: ['image-wrapper'],
    });
    const image = createHtmlElement({
      tag: 'img',
      properties: {
        src: img,
      },
    });

    imageWrapper.appendChild(image);

    return imageWrapper;
  }

  setInterval(nextImage, 5000);

  return gallery;
}

const container = document.querySelector('.container');
container.appendChild(createImageGallery());
