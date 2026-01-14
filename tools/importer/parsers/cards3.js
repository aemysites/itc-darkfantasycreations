/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards3) block: 2 columns, multiple rows. First row is block name.
  const headerRow = ['Cards (cards3)'];
  const rows = [headerRow];

  // Find all card items within the carousel
  const cardItems = element.querySelectorAll('.cmp-carousel__item');

  cardItems.forEach(cardItem => {
    // Image cell (first column)
    let imageEl = cardItem.querySelector('.cmp-card__image img');
    if (!imageEl) {
      imageEl = document.createElement('span');
      imageEl.textContent = 'No image';
    }

    // Text cell (second column)
    const info = cardItem.querySelector('.cmp-card__info');
    const textCellContent = [];

    // Three-dot options icon (vertical ellipsis)
    const dots = cardItem.querySelector('.cmp-card__three-dots');
    if (dots) {
      // Use a Unicode vertical ellipsis as a placeholder
      const dotsIcon = document.createElement('span');
      dotsIcon.textContent = '\u22EE';
      dotsIcon.style.float = 'right';
      dotsIcon.style.fontSize = '18px';
      dotsIcon.style.marginLeft = '8px';
      textCellContent.push(dotsIcon);
    }

    // Tag (difficulty)
    const tagWrapper = info && info.querySelector('.cmp-card__tag-wrapper p');
    if (tagWrapper) {
      const tagPill = document.createElement('div');
      tagPill.textContent = tagWrapper.textContent;
      tagPill.style.display = 'inline-block';
      tagPill.style.padding = '2px 10px';
      tagPill.style.borderRadius = '12px';
      tagPill.style.background = '#3a2a18';
      tagPill.style.color = '#fff';
      tagPill.style.fontSize = '12px';
      tagPill.style.marginBottom = '8px';
      textCellContent.push(tagPill);
    }

    // Title (as heading, preserve link)
    const titleLink = info && info.querySelector('.cmp-card__title a');
    if (titleLink) {
      const h5 = titleLink.querySelector('h5');
      if (h5) {
        const link = document.createElement('a');
        link.href = titleLink.href;
        link.textContent = h5.textContent;
        link.style.fontWeight = 'bold';
        link.style.display = 'block';
        textCellContent.push(document.createElement('br'));
        textCellContent.push(link);
      }
    }

    // Description (time)
    const timeDiv = info && info.querySelector('.cmp-card__time-in-minutes');
    if (timeDiv) {
      textCellContent.push(document.createElement('br'));
      const timeText = document.createElement('span');
      timeText.textContent = timeDiv.textContent;
      textCellContent.push(timeText);
    }

    rows.push([imageEl, textCellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
