/* global WebImporter */
export default function parse(element, { document }) {
  // Only a gradient overlay div, no actual carousel content in the HTML
  // Per requirements, header row must be a single column
  const headerRow = ['Carousel (carousel17)'];
  const cells = [headerRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
