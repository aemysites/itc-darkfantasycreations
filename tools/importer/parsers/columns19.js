/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns19)'];

  // Find the main teaser container (the block root)
  const teaser = element.querySelector('.cmp-teaser');
  if (!teaser) return;

  // --- LEFT COLUMN: Text content (heading, description, button) ---
  const content = teaser.querySelector('.cmp-teaser__content');
  const leftColumn = document.createElement('div');
  if (content) {
    // Heading
    const heading = content.querySelector('.cmp-teaser__title');
    if (heading) leftColumn.appendChild(heading);
    // Description
    const description = content.querySelector('.cmp-teaser__description');
    if (description) leftColumn.appendChild(description);
    // Button
    const button = content.querySelector('.cmp-teaser__action-container a');
    if (button) leftColumn.appendChild(button);
  }

  // --- RIGHT COLUMN: Main image (the recipe photo) ---
  let rightImage = null;
  const imageContainer = teaser.querySelector('.cmp-teaser__image');
  if (imageContainer) {
    rightImage = imageContainer.querySelector('img');
  }
  // Fallback: if not found, try any img after the first (background) image
  if (!rightImage) {
    const imgs = teaser.querySelectorAll('img');
    if (imgs.length > 1) rightImage = imgs[1];
  }

  // If rightImage exists, reference the actual image element (not clone)
  let rightCell = document.createTextNode('');
  if (rightImage) {
    rightCell = rightImage;
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [leftColumn, rightCell],
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
