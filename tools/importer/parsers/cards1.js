/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header
  const headerRow = ['Cards (cards1)'];

  // Find all card items
  const cardEls = element.querySelectorAll('.cmp-product-listing__item');
  const rows = [];

  cardEls.forEach(cardEl => {
    // Image (first cell)
    const imgEl = cardEl.querySelector('.lazy-image-container img');
    // Reference the existing image element if present
    let imgCell = null;
    if (imgEl) {
      imgCell = imgEl;
    }

    // Text content (second cell)
    const titleEl = cardEl.querySelector('.cmp-product-listing__name');
    const descEl = cardEl.querySelector('.cmp-product-listing__description');
    // Compose text cell: title (strong), then description
    const textFrag = document.createElement('div');
    if (titleEl) {
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent;
      textFrag.appendChild(strong);
    }
    if (descEl) {
      textFrag.appendChild(document.createElement('br'));
      textFrag.appendChild(document.createTextNode(descEl.textContent));
    }
    rows.push([imgCell, textFrag]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
