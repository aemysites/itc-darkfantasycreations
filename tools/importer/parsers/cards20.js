/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards20) block header
  const headerRow = ['Cards (cards20)'];

  // Find all card items
  const cardEls = element.querySelectorAll('.cmp-product-listing__item');

  const rows = Array.from(cardEls).map(cardEl => {
    // Image (first cell)
    const imgContainer = cardEl.querySelector('.lazy-image-container');
    let img = imgContainer ? imgContainer.querySelector('img') : null;

    // Text content (second cell)
    const title = cardEl.querySelector('.cmp-product-listing__name');
    const desc = cardEl.querySelector('.cmp-product-listing__description');
    const cellContent = [];
    if (title) {
      const h = document.createElement('h3');
      h.textContent = title.textContent; // do not trim or alter, preserve exactly
      cellContent.push(h);
    }
    if (desc) {
      const p = document.createElement('p');
      p.innerHTML = desc.innerHTML; // preserves &nbsp; and all HTML
      cellContent.push(p);
    }
    return [img, cellContent];
  });

  // Create table with header row as a single cell (not <th>), per guidelines
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  element.replaceWith(table);
}
