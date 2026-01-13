/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards13) block header row
  const headerRow = ['Cards (cards13)'];

  // Find the card container
  const card = element.querySelector('.cmp-card');
  if (!card) return;

  // --- IMAGE ---
  const img = card.querySelector('img') || element.querySelector('img') || '';

  // --- TEXT CONTENT ---
  const textCellContent = [];

  // Title (username)
  const title = card.querySelector('.cmp-card__username');
  const h = document.createElement('h4');
  h.textContent = title ? title.textContent : '';
  textCellContent.push(h);

  // Rating (stars)
  const ratingContainer = card.querySelector('.cmp-card__rating');
  const ratingEl = document.createElement('div');
  if (ratingContainer) {
    const stars = ratingContainer.querySelectorAll('.rating-star');
    ratingEl.textContent = Array.from(stars).map(() => '★').join('');
  } else {
    ratingEl.textContent = '';
  }
  textCellContent.push(ratingEl);

  // Description
  const desc = card.querySelector('.cmp-card__description');
  const p = document.createElement('p');
  p.textContent = desc ? desc.textContent : '';
  textCellContent.push(p);

  // Build the table rows
  const rows = [
    headerRow,
    [img, textCellContent]
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
