/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row must match block name exactly
  const headerRow = ['Hero (hero15)'];

  // No background image, so row 2 is blank (solid color, but not an image)
  const bgRow = [''];

  // Compose the main content cell
  // Find the main content wrapper
  const heroContent = element.querySelector('.cmp-available-store__content');
  const contentCell = document.createElement('div');

  // Title (h2)
  const titleWrap = heroContent && heroContent.querySelector('.cmp-available-store__title');
  if (titleWrap) {
    const h2 = titleWrap.querySelector('h2');
    if (h2) {
      contentCell.appendChild(h2.cloneNode(true));
    }
    // Subheading (p)
    const sub = titleWrap.querySelector('p');
    if (sub) {
      contentCell.appendChild(sub.cloneNode(true));
    }
  }

  // Icon row (store links with images) - simplify: only the links with images
  const iconsList = heroContent && heroContent.querySelector('.cmp-available-store__iconsList');
  if (iconsList) {
    const iconsRow = document.createElement('div');
    iconsRow.style.display = 'flex';
    iconsRow.style.gap = '1em';
    [...iconsList.querySelectorAll('a')].forEach((a) => {
      const iconLink = document.createElement('a');
      iconLink.href = a.href;
      iconLink.target = a.target;
      const img = a.querySelector('img');
      if (img) {
        iconLink.appendChild(img.cloneNode(true));
      }
      iconsRow.appendChild(iconLink);
    });
    contentCell.appendChild(iconsRow);
  }

  // Supporting text (p under icons)
  const supporting = heroContent && heroContent.querySelector('.cmp-available-store__text');
  if (supporting) {
    const p = supporting.querySelector('p');
    if (p) {
      contentCell.appendChild(p.cloneNode(true));
    }
  }

  // Compose the table rows
  const contentRow = [contentCell];
  const cells = [
    headerRow,
    bgRow,
    contentRow,
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
