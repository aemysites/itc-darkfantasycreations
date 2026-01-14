/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero15)'];

  // 2. Background image row (none in this case)
  const bgRow = [''];

  // 3. Content row
  // Find the main content container
  const contentWrap = element.querySelector('.cmp-available-store__wrap');

  // Title and subheading
  let title, subheading;
  const titleDiv = contentWrap?.querySelector('.cmp-available-store__title');
  if (titleDiv) {
    title = titleDiv.querySelector('h2');
    subheading = titleDiv.querySelector('p');
  }

  // Store icons (links with images)
  const iconsList = contentWrap?.querySelector('.cmp-available-store__iconsList');
  let icons = [];
  if (iconsList) {
    icons = Array.from(iconsList.querySelectorAll('a'));
  }

  // Supporting text under icons
  const supportingText = contentWrap?.querySelector('.cmp-available-store__text p');

  // Compose the content cell
  // We'll use a div to keep the structure and let rendering handle the layout
  const contentDiv = document.createElement('div');
  if (title) contentDiv.appendChild(title);
  if (subheading) contentDiv.appendChild(subheading);
  if (icons.length) {
    const iconsDiv = document.createElement('div');
    iconsDiv.style.display = 'flex';
    iconsDiv.style.gap = '1em';
    icons.forEach(a => iconsDiv.appendChild(a));
    contentDiv.appendChild(iconsDiv);
  }
  if (supportingText) contentDiv.appendChild(supportingText);

  // Build the table
  const cells = [
    headerRow,
    bgRow,
    [contentDiv],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
