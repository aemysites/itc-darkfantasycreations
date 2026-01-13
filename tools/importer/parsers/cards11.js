/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards11) block header
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // Find all card elements
  const cardContainers = element.querySelectorAll('.cmp-product-explore-listing__product-item .card, .cmp-product-explore-listing__product-container > .card');
  // Defensive: fallback if above doesn't work
  const cards = cardContainers.length
    ? cardContainers
    : element.querySelectorAll('.card.cmp-card--recipe');

  cards.forEach((card) => {
    // Image: find the first img inside the card
    const img = card.querySelector('img');
    // Defensive: if no image, skip this card
    if (!img) return;

    // --- TEXT CONTENT ---
    // Tag (difficulty)
    let tag = card.querySelector('.cmp-card__tag-wrapper p');
    // Title (h5 inside a link)
    let titleLink = card.querySelector('.cmp-card__title a');
    let title = titleLink ? titleLink.querySelector('h5') : null;
    // Time/Description
    let time = card.querySelector('.cmp-card__time-in-minutes');

    // Compose text cell
    const textCell = document.createElement('div');
    if (tag) {
      const tagDiv = document.createElement('div');
      tagDiv.appendChild(tag.cloneNode(true));
      tagDiv.style.marginBottom = '8px';
      textCell.appendChild(tagDiv);
    }
    if (titleLink && title) {
      // Wrap h5 in a link
      const h5 = document.createElement('h5');
      h5.textContent = title.textContent;
      const a = document.createElement('a');
      a.href = titleLink.href;
      a.appendChild(h5);
      textCell.appendChild(a);
    }
    if (time) {
      const timeDiv = document.createElement('div');
      timeDiv.style.marginTop = '8px';
      timeDiv.appendChild(time.cloneNode(true));
      textCell.appendChild(timeDiv);
    }

    rows.push([
      img,
      textCell
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
