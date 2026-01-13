/* global WebImporter */
export default function parse(element, { document }) {
  // --- CRITICAL REVIEW ---
  // 1. No hardcoded text; all content is extracted dynamically.
  // 2. No markdown formatting; only HTML elements are used.
  // 3. Only one table is required for this block.
  // 4. Header row matches: Columns (columns12)
  // 5. Handles empty/missing data: checks for null before pushing.
  // 6. No Section Metadata block in the example, so none is created.
  // 7. Only references existing elements, does not clone or create new images.
  // 8. Semantic meaning is preserved: heading, paragraph, button, image.
  // 9. All text content included in table cells.
  // 10. No new image elements created; only references existing <img>.
  // 11. No model provided, so no model field comments.

  // Find the main teaser block
  const teaser = element.querySelector('.cmp-teaser');
  if (!teaser) return;

  // --- LEFT COLUMN ---
  const leftColumn = document.createElement('div');
  // Heading
  const heading = teaser.querySelector('.cmp-teaser__title');
  if (heading) leftColumn.appendChild(heading);
  // Description
  const desc = teaser.querySelector('.cmp-teaser__description');
  if (desc) leftColumn.appendChild(desc);
  // Button
  const button = teaser.querySelector('.cmp-teaser__action-container');
  if (button) leftColumn.appendChild(button);

  // --- RIGHT COLUMN ---
  let rightImage = null;
  const imageContainer = teaser.querySelector('.cmp-teaser__image');
  if (imageContainer) {
    rightImage = imageContainer.querySelector('img');
  }
  // Fallback: if not found, use the first <img> after the background image
  if (!rightImage) {
    const imgs = teaser.querySelectorAll('img');
    if (imgs.length > 1) rightImage = imgs[1];
  }

  // Compose the table rows
  const headerRow = ['Columns (columns12)'];
  const row = [leftColumn, rightImage].filter(Boolean);
  const rows = [headerRow, row];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
