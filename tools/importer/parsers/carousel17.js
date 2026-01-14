/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel17) block header row
  const headerRow = ['Carousel (carousel17)'];

  // The source HTML contains only a decorative div, no slides/images/text
  // Output the header row as a table (required by validation)
  const cells = [headerRow];

  // Replace the original element with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
