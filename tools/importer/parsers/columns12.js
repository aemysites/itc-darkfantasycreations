/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns12)'];

  // Defensive: Find the main teaser content and image
  // The structure is: left column (text, button), right column (image)
  let leftColContent = [];
  let rightColContent = [];

  // Find the teaser (main content block)
  const teaser = element.querySelector('.cmp-teaser');

  if (teaser) {
    // Left column: heading, description, button
    const content = teaser.querySelector('.cmp-teaser__content');
    if (content) {
      // Heading
      const heading = content.querySelector('.cmp-teaser__title');
      if (heading) leftColContent.push(heading);
      // Description
      const desc = content.querySelector('.cmp-teaser__description');
      if (desc) leftColContent.push(desc);
      // Button
      const buttonContainer = content.querySelector('.cmp-teaser__action-container');
      if (buttonContainer) leftColContent.push(buttonContainer);
    }
    // Right column: image
    const imageWrap = teaser.querySelector('.cmp-teaser__image');
    if (imageWrap) {
      // Find the actual image element
      const img = imageWrap.querySelector('img');
      if (img) rightColContent.push(img);
    } else {
      // Fallback: sometimes teaser img is outside .cmp-teaser__image
      const fallbackImg = teaser.querySelector('img');
      if (fallbackImg) rightColContent.push(fallbackImg);
    }
  }

  // Build the table: header row, then one row with two columns
  const tableRows = [
    headerRow,
    [leftColContent, rightColContent]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
