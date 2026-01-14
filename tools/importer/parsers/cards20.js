/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards20) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards20)'];
  const rows = [headerRow];

  // Find all card items
  const cardItems = element.querySelectorAll('.cmp-product-listing__item');
  cardItems.forEach(card => {
    // Image (first cell)
    const imgContainer = card.querySelector('.lazy-image-container');
    let imgEl = imgContainer ? imgContainer.querySelector('img') : null;

    // Text (second cell)
    const titleEl = card.querySelector('.cmp-product-listing__name');
    const descEl = card.querySelector('.cmp-product-listing__description');
    // Compose text cell: title as heading, description below
    const textCell = document.createElement('div');
    if (titleEl) {
      const h = document.createElement('h3');
      h.textContent = titleEl.textContent;
      textCell.appendChild(h);
    }
    if (descEl) {
      const p = document.createElement('p');
      // Use descEl.textContent to preserve visible text, including trailing spaces
      p.textContent = descEl.textContent;
      textCell.appendChild(p);
    }
    rows.push([
      imgEl,
      textCell
    ]);
  });

  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
