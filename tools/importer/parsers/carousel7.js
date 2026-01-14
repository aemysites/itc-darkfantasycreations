/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel root
  const carousel = element.querySelector('.cmp-carousel');
  if (!carousel) return;

  // Find all carousel slides
  const slides = carousel.querySelectorAll('.cmp-carousel__item');
  if (!slides.length) return;

  // Prepare header row as required
  const headerRow = ['Carousel (carousel7)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // --- IMAGE COLUMN ---
    // Use the product image in the left column
    let imgEl = slide.querySelector('.cmp-banner__item-image-wrapper img');
    if (!imgEl) {
      imgEl = slide.querySelector('.cmp-banner__content img');
    }

    // --- TEXT COLUMN ---
    const textContent = [];

    // Title (h2) and subtitle (h3)
    const title = slide.querySelector('.cmp-banner__title');
    if (title) {
      const h2 = document.createElement('h2');
      h2.innerHTML = title.innerHTML;
      textContent.push(h2);
    }
    const subtitle = slide.querySelector('.cmp-banner__sub-title');
    if (subtitle) {
      const h3 = document.createElement('h3');
      h3.innerHTML = subtitle.innerHTML;
      textContent.push(h3);
    }

    // Product name: extract from overlay text in image area
    // Try to find overlay text in .cmp-banner__item-image-wrapper sibling nodes
    const imageWrapper = slide.querySelector('.cmp-banner__item-image-wrapper');
    if (imageWrapper) {
      let sibling = imageWrapper.nextSibling;
      while (sibling) {
        if (
          sibling.nodeType === Node.ELEMENT_NODE &&
          sibling.tagName === 'DIV' &&
          sibling.textContent.trim()
        ) {
          const strong = document.createElement('strong');
          strong.textContent = sibling.textContent.trim();
          textContent.push(strong);
        }
        sibling = sibling.nextSibling;
      }
    }

    // Product descriptions (multiple <p> possible)
    const descriptions = slide.querySelectorAll('.cmp-banner__item-description');
    descriptions.forEach((desc) => {
      const p = document.createElement('p');
      p.innerHTML = desc.innerHTML;
      textContent.push(p);
    });

    // Video (if present, add as a link to the video src)
    const video = slide.querySelector('video');
    if (video && video.src) {
      const videoLink = document.createElement('a');
      videoLink.href = video.src;
      videoLink.textContent = 'Watch Video';
      textContent.push(videoLink);
    }

    // CTA Button (anchor)
    const cta = slide.querySelector('.cmp-button');
    if (cta) {
      const simpleCTA = document.createElement('a');
      simpleCTA.href = cta.getAttribute('href');
      simpleCTA.textContent = cta.textContent.trim();
      textContent.push(simpleCTA);
    }

    rows.push([
      imgEl || '',
      textContent.length ? textContent : ''
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
