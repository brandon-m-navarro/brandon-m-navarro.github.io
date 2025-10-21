// ExpandableImage.js
//
// A component that displays an image with an expand button.
// When the button is clicked, a modal opens to show the image
// in a larger view. The modal can be closed by clicking the
// close button, clicking outside the image, or pressing the
// Escape key.
//
// Public API
// @param {} options -
// {
//      container:   DOM element to contain the component (required)
//      imageSrc:    source URL of the image (required)
//      imageAlt:    alt text for the image (optional)
// }
//
'use strict';

export default class ExpandableImage {
  constructor(options) {
    // Destructure the options
    const { container, imageSrc, imageAlt } = options;

    // Validate container
    if (!container || !(container instanceof Element)) {
      console.error("ExpandableImage: container must be a valid DOM element");
      return;
    }

    this.container = container;
    this.imageSrc = imageSrc;
    this.imageAlt = imageAlt;
    this.initialize();
  }

  initialize() {
    this.createElements();
    this.addEventListeners();
  }

  createElements() {
    // Create image container
    this.imageContainer = document.createElement("div");
    this.imageContainer.className = "image-container";

    // Create image
    this.image = document.createElement("img");
    this.image.src = this.imageSrc;
    this.image.alt = this.imageAlt;

    // Create expand button
    this.expandButton = document.createElement("button");
    this.expandButton.className = "image-expand-btn";
    this.expandButton.innerHTML = "⛶";
    this.expandButton.title = "Expand image";

    // Create modal
    this.modal = document.createElement("div");
    this.modal.dataset.imageId = this.imageSrc;
    this.modal.className = "image-modal";
    this.modal.innerHTML = `
      <div class="image-modal-content">
        <img src="${this.imageSrc}" alt="${this.imageAlt}">
        <button class="modal-close-btn">×</button>
      </div>
    `;

    // Assemble elements
    this.imageContainer.appendChild(this.image);
    this.imageContainer.appendChild(this.expandButton);
    this.container.appendChild(this.imageContainer);
    this.container.appendChild(this.modal);

    // Store references
    this.modalCloseBtn = this.modal.querySelector(".modal-close-btn");
  }

  addEventListeners() {
    // Expand button click
    this.expandButton.addEventListener("click", () => {
      this.openModal();
    });

    // Modal close button click
    this.modalCloseBtn.addEventListener("click", () => {
      this.closeModal();
    });

    // Close modal when clicking outside image
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.closeModal();
      }
    });
  }

  openModal() {
    this.modal.classList.add("active");
    document.body.classList.add('modal-open');
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.modal.classList.remove("active");
    document.body.classList.remove('modal-open');
    document.body.style.overflow = "";
  }

  // Update image source if needed
  updateImage(newSrc, newAlt) {
    this.imageSrc = newSrc;
    this.imageAlt = newAlt;
    this.image.src = newSrc;
    this.image.alt = newAlt;
    this.modal.querySelector("img").src = newSrc;
    this.modal.querySelector("img").alt = newAlt;
  }
}
