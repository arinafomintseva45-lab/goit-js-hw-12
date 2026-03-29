import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions";

let page = 1;
let query = "";
let totalHits = 0;

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

form.addEventListener("submit", async e => {
  e.preventDefault();

  query = e.target.elements.search.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();

  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({ message: "No images found" });
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / 15);

    if (totalPages > 1) {
      showLoadMoreButton();
    }

  } catch (error) {
    iziToast.error({ message: "Error fetching images" });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page++;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / 15);

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const card = document.querySelector(".gallery a");
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });

  } catch (error) {
    iziToast.error({ message: "Error loading more images" });
  } finally {
    hideLoader();
  }
});