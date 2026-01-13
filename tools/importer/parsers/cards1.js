/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards1) block header
  const headerRow = ['Cards (cards1)'];
  const rows = [headerRow];

  // Find all card items using the specific class
  const items = element.querySelectorAll('.cmp-product-listing__item');

  items.forEach((item) => {
    // Image (first cell)
    const imgContainer = item.querySelector('.lazy-image-container');
    let img = imgContainer ? imgContainer.querySelector('img') : null;
    // Defensive: Only use the image element if present
    let imgCell = img || '';

    // Text content (second cell)
    // Title
    const title = item.querySelector('.cmp-product-listing__name');
    let titleEl = null;
    if (title) {
      titleEl = document.createElement('strong');
      titleEl.textContent = title.textContent.trim();
    }
    // Description
    const desc = item.querySelector('.cmp-product-listing__description');
    let descEl = null;
    if (desc) {
      descEl = document.createElement('p');
      descEl.textContent = desc.textContent.trim();
    }
    // Compose text cell
    const textCell = [];
    if (titleEl) textCell.push(titleEl);
    if (descEl) textCell.push(descEl);

    rows.push([imgCell, textCell]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
