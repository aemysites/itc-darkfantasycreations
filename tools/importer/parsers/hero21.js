/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero21)'];

  // 2. Background image row (none in this case)
  const bgRow = [''];

  // 3. Content row
  // Locate the main hero content wrapper
  const heroContent = element.querySelector('.cmp-available-store__wrap');
  if (!heroContent) return;

  // Compose a single cell containing all relevant content
  const contentCell = document.createElement('div');

  // Title and subheading
  const titleWrap = heroContent.querySelector('.cmp-available-store__title');
  if (titleWrap) {
    // Include all children of the titleWrap (h2 and p)
    Array.from(titleWrap.childNodes).forEach(node => {
      contentCell.appendChild(node.cloneNode(true));
    });
  }

  // Store icons (CTAs)
  const iconsList = heroContent.querySelector('.cmp-available-store__iconsList');
  if (iconsList) {
    // Place icons in a div for horizontal grouping
    const iconsDiv = document.createElement('div');
    iconsDiv.style.display = 'flex';
    iconsDiv.style.gap = '1em';
    Array.from(iconsList.children).forEach(child => {
      iconsDiv.appendChild(child.cloneNode(true));
    });
    contentCell.appendChild(iconsDiv);
  }

  // Supporting text
  const supportingTextWrap = heroContent.querySelector('.cmp-available-store__text');
  if (supportingTextWrap) {
    Array.from(supportingTextWrap.childNodes).forEach(node => {
      contentCell.appendChild(node.cloneNode(true));
    });
  }

  const contentRow = [contentCell];

  // Build the table
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
