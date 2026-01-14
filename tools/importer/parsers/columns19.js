/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns19)'];

  // --- COLUMN 1: Text content (heading, description, button) ---
  // Find the main teaser content container
  const teaserContent = element.querySelector('.cmp-teaser__content');
  // Defensive: If not found, fallback to the first div
  const leftCol = teaserContent || element.querySelector('div');

  // --- COLUMN 2: Main image (the dessert/cake) ---
  // Find the image container in the right column
  const imageCol = element.querySelector('.cmp-teaser__image img');
  // Defensive: If not found, fallback to any img not in leftCol
  let rightCol = null;
  if (imageCol) {
    rightCol = imageCol;
  } else {
    // Try to find any img not inside the left column
    const imgs = element.querySelectorAll('img');
    rightCol = Array.from(imgs).find(img => !leftCol || !leftCol.contains(img)) || imgs[0];
  }

  // --- Build the table ---
  const cells = [
    headerRow,
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
