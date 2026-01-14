/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Hero (hero21)'];

  // Find the hero content root
  const wrap = element.querySelector('.cmp-available-store__wrap');
  if (!wrap) return;

  // 2nd row: Background image/color (optional)
  // If there's a background color, represent it as a styled div (no text)
  let bgCell = '';
  const bgColor = wrap.getAttribute('data-hlx-imp-bgcolor');
  if (bgColor) {
    const bgDiv = document.createElement('div');
    bgDiv.style.backgroundColor = bgColor;
    bgCell = bgDiv;
  }
  const bgRow = [bgCell];

  // 3rd row: Content, grouped for clarity
  const content = document.createElement('div');

  // Title and subheading group
  const titleGroup = document.createElement('div');
  const titleWrap = wrap.querySelector('.cmp-available-store__title');
  if (titleWrap) {
    Array.from(titleWrap.childNodes).forEach(node => {
      titleGroup.appendChild(node.cloneNode(true));
    });
  }
  content.appendChild(titleGroup);

  // Store icons group
  const iconsGroup = document.createElement('div');
  const iconsList = wrap.querySelector('.cmp-available-store__iconsList');
  if (iconsList) {
    Array.from(iconsList.children).forEach(link => {
      // Fix alt attribute for Flipkart icon if needed
      const img = link.querySelector('img');
      if (img && link.href && link.href.includes('flipkart.com')) {
        img.alt = 'Flipkart';
      }
      iconsGroup.appendChild(link.cloneNode(true));
    });
  }
  content.appendChild(iconsGroup);

  // Info text group
  const infoGroup = document.createElement('div');
  const infoText = wrap.querySelector('.cmp-available-store__text');
  if (infoText) {
    Array.from(infoText.childNodes).forEach(node => {
      infoGroup.appendChild(node.cloneNode(true));
    });
  }
  content.appendChild(infoGroup);

  const contentRow = [content];

  // Compose the table
  const cells = [
    headerRow,
    bgRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
