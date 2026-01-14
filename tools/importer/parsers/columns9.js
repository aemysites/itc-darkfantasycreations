/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns (columns9)
  const headerRow = ['Columns (columns9)'];

  // Find all product items (cards)
  const items = element.querySelectorAll('.cmp-related-products__item');

  // Each card becomes a column in a single row
  const row = Array.from(items).map((item) => {
    const link = item.querySelector('a');
    const img = link ? link.querySelector('img') : null;
    // Extract the product name from the image alt attribute
    const productName = img ? img.alt : '';
    // Split product name into two lines (by space before last word)
    let nameLines = [productName];
    if (productName.trim().length > 0) {
      const parts = productName.trim().split(' ');
      if (parts.length > 1) {
        nameLines = [
          parts.slice(0, -1).join(' '),
          parts.slice(-1)[0]
        ];
      }
    }
    // Create a text element for the product name with two lines
    const nameElem = document.createElement('div');
    nameElem.appendChild(document.createTextNode(nameLines[0]));
    if (nameLines.length > 1) {
      nameElem.appendChild(document.createElement('br'));
      nameElem.appendChild(document.createTextNode(nameLines[1]));
    }
    // Compose cell: product name + image/link
    const cell = document.createElement('div');
    cell.appendChild(nameElem);
    if (link) {
      cell.appendChild(link);
    }
    return cell;
  });

  // Only add a row if there are cards
  const rows = row.length > 0 ? [row] : [];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
