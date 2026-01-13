/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns9)'];

  // Product definitions for split text and color
  const products = [
    {
      top: 'Choco',
      bottom: 'Chunks',
      color: '#9fffe3', // mint green
    },
    {
      top: 'Choco Nut',
      bottom: 'Dipped',
      color: '#b6a6e9', // lavender
    },
    {
      top: 'Choco',
      bottom: 'Fills',
      color: '#e94c4c', // red
    },
  ];

  // Select all product items (columns)
  const items = Array.from(element.querySelectorAll('.cmp-related-products__item'));
  if (!items.length) return;

  // For each product, create a cell containing split text and the link with image
  const contentRow = items.map((item, idx) => {
    // Find the link
    const link = item.querySelector('a');
    // Clone the link with image
    const linkClone = link.cloneNode(true);

    // Get split text and color from products array
    const { top, bottom, color } = products[idx] || {};

    // Top text
    const topText = document.createElement('div');
    topText.textContent = top || '';
    topText.style.fontWeight = 'bold';
    topText.style.fontSize = '2em';
    topText.style.color = color || '#222';
    topText.style.textAlign = 'center';
    topText.style.marginBottom = '0.2em';
    // Bottom text
    const bottomText = document.createElement('div');
    bottomText.textContent = bottom || '';
    bottomText.style.fontWeight = 'bold';
    bottomText.style.fontSize = '2em';
    bottomText.style.color = color || '#222';
    bottomText.style.textAlign = 'center';
    bottomText.style.marginTop = '0.2em';

    // Build the cell
    const cell = document.createElement('div');
    cell.style.display = 'flex';
    cell.style.flexDirection = 'column';
    cell.style.alignItems = 'center';
    cell.appendChild(topText);
    cell.appendChild(linkClone);
    cell.appendChild(bottomText);
    return cell;
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
