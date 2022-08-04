import { createHtmlElement } from 'dom-utils';
import galleryHtml from './templates/gallery-template.html';
import unselected from './templates/radio-unselected-svg-template.html';
import selected from './templates/radio-selected-svg-template.html';
import './gallery.css';

export default function createImageGallery(images) {
  let currentImage = 0;

  const galleryTemplate = createHtmlElement({ tag: 'template' });
  galleryTemplate.innerHTML = galleryHtml;

  const gallery = galleryTemplate.content.firstElementChild.cloneNode(true);
  const imageContainer = gallery.querySelector('.image-container');

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
    const imagesDiv = gallery.querySelectorAll('.gallery .image-wrapper');
    const buttons = gallery.querySelector('.gallery .gallery-buttons');
    clearGalleryButtons();

    imagesDiv.forEach((item, index) => {
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

  function displayImage(index) {
    imageContainer.style.top = `calc(${-index}*100%)`;
    buildButtonsPanel();
  }

  displayImage(currentImage);

  function nextImage() {
    currentImage += 1;

    if (currentImage > images.length - 1) {
      currentImage = 0;
    }
    displayImage(currentImage);
  }

  function previousImage() {
    currentImage -= 1;

    if (currentImage < 0) {
      currentImage = images.length - 1;
    }

    displayImage(currentImage);
  }

  gallery.querySelector('.nav-left').addEventListener('click', previousImage);
  gallery.querySelector('.nav-right').addEventListener('click', nextImage);

  setInterval(nextImage, 5000);

  return gallery;
}
