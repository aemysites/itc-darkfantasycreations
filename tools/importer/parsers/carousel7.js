/* global WebImporter */
export default function parse(element, { document }) {
  const carousel = element.querySelector('.cmp-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.cmp-carousel__item');
  const headerRow = ['Carousel (carousel7)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Image cell
    let imgCell = '';
    const prodImg = slide.querySelector('.cmp-banner__item-image-wrapper img');
    if (prodImg) {
      imgCell = prodImg;
    } else {
      const fallbackImg = slide.querySelector('img');
      if (fallbackImg) imgCell = fallbackImg;
    }

    // Text cell
    const textCellContent = [];
    // Title (h2)
    const h2 = slide.querySelector('.cmp-banner__title');
    if (h2) {
      const h2Clone = document.createElement('h2');
      h2Clone.innerHTML = h2.innerHTML;
      textCellContent.push(h2Clone);
    }
    // Subtitle (h3)
    const h3 = slide.querySelector('.cmp-banner__sub-title');
    if (h3) {
      const h3Clone = document.createElement('h3');
      h3Clone.innerHTML = h3.innerHTML;
      textCellContent.push(h3Clone);
    }
    // All product descriptions (all .cmp-banner__item-description)
    const descriptions = slide.querySelectorAll('.cmp-banner__item-description');
    descriptions.forEach(desc => {
      const p = document.createElement('p');
      p.innerHTML = desc.innerHTML;
      textCellContent.push(p);
    });
    // Video: convert to link with poster image (requirement #7)
    const video = slide.querySelector('video');
    if (video && video.src) {
      const videoLink = document.createElement('a');
      videoLink.href = video.src;
      videoLink.textContent = 'Watch video';
      if (video.poster) {
        const posterImg = document.createElement('img');
        posterImg.src = video.poster;
        videoLink.prepend(posterImg);
      }
      textCellContent.push(videoLink);
    }
    // CTA button (only as link with text)
    const cta = slide.querySelector('.cmp-button');
    if (cta && cta.href) {
      const ctaLink = document.createElement('a');
      ctaLink.href = cta.href;
      ctaLink.textContent = cta.textContent.trim();
      textCellContent.push(ctaLink);
    }

    rows.push([
      imgCell,
      textCellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
