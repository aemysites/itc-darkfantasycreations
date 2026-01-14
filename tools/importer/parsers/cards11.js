/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Cards block
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // Find all card elements within the parent container
  const cardContainers = element.querySelectorAll('.cmp-product-explore-listing__product-item .card.cmp-card--recipe');

  cardContainers.forEach(card => {
    // Image extraction (first cell)
    const imgContainer = card.querySelector('.cmp-card__image img');
    let imageEl = null;
    if (imgContainer) {
      imageEl = imgContainer;
    }

    // Text content extraction (second cell)
    const info = card.querySelector('.cmp-card__info');
    const tag = info && info.querySelector('.cmp-card__tag-wrapper p');
    const titleLink = info && info.querySelector('.cmp-card__title a');
    const title = titleLink && titleLink.querySelector('h5');
    const time = info && info.querySelector('.cmp-card__time-in-minutes');

    // Compose text cell
    const textCell = document.createElement('div');
    if (tag) {
      const tagDiv = document.createElement('div');
      tagDiv.appendChild(tag.cloneNode(true));
      textCell.appendChild(tagDiv);
    }
    if (titleLink && title) {
      // Wrap the h5 in the link
      const titleDiv = document.createElement('div');
      const link = document.createElement('a');
      link.href = titleLink.href;
      link.appendChild(title.cloneNode(true));
      titleDiv.appendChild(link);
      textCell.appendChild(titleDiv);
    }
    if (time) {
      const timeDiv = document.createElement('div');
      timeDiv.appendChild(time.cloneNode(true));
      textCell.appendChild(timeDiv);
    }

    rows.push([imageEl, textCell]);
  });

  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
