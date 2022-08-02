import { createHtmlElement } from 'dom-utils';
import galleryHtml from './templates/gallery-template.html';
import unselected from './templates/radio-unselected-svg-template.html';
import selected from './templates/radio-selected-svg-template.html';
import pipe1 from './images/pipe-1.jpg';
import pipe2 from './images/pipe-2.jpg';
import pipe3 from './images/pipe-3.jpeg';
import pipe4 from './images/pipe-4.jpeg';
import './gallery.css';

function buildImagesArray() {
  return [pipe1, pipe2, pipe3, pipe4];
}

function getSvgFromTemplateFile(template) {
  const svgTemplate = createHtmlElement({ tag: 'template' });
  svgTemplate.innerHTML = template;

  const svg = svgTemplate.content.firstElementChild.cloneNode(true);

  return svg;
}

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

function createImageGallery() {
  const galleryTemplate = createHtmlElement({ tag: 'template' });
  galleryTemplate.innerHTML = galleryHtml;

  const gallery = galleryTemplate.content.firstElementChild.cloneNode(true);
  const imageContainer = gallery.querySelector('.image-container');
  const buttons = gallery.querySelector('.gallery-buttons');

  buildImagesArray().forEach((img) => {
    imageContainer.appendChild(getWrappedImage(img));
    buttons.appendChild(getSvgFromTemplateFile(unselected));
  });

  return gallery;
}

const container = document.querySelector('.container');
container.appendChild(createImageGallery());
