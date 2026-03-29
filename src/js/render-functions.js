import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");

export const lightbox = new SimpleLightbox(".gallery a");

export function createGallery(images) {
  const markup = images
    .map(
      img => `
      <li>
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" />
        </a>
      </li>
    `
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
  document.querySelector(".loader").classList.add("visible");
}

export function hideLoader() {
  document.querySelector(".loader").classList.remove("visible");
}

export function showLoadMoreButton() {
  document.querySelector(".load-more").classList.add("visible");
}

export function hideLoadMoreButton() {
  document.querySelector(".load-more").classList.remove("visible");
}