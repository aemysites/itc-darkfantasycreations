/* global WebImporter */

export default function parse(element, { document }) {
  // Cards (cards3) block header
  const headerRow = ['Cards (cards3)'];
  const rows = [headerRow];

  // Find the carousel track containing the cards
  const track = element.querySelector('.cmp-carousel__container .slick-track');
  if (!track) return;

  // Each card is a .cmp-carousel__item
  const cards = track.querySelectorAll('.cmp-carousel__item');

  cards.forEach(card => {
    // Image: inside .cmp-card__image img
    const img = card.querySelector('.cmp-card__image img');
    // Tag: .cmp-card__tag-wrapper p (optional)
    const tag = card.querySelector('.cmp-card__tag-wrapper p');
    // Title: .cmp-card__title h5 (inside an <a>)
    const titleLink = card.querySelector('.cmp-card__title a');
    const title = titleLink ? titleLink.querySelector('h5') : null;
    // Description: .cmp-card__time-in-minutes
    const desc = card.querySelector('.cmp-card__time-in-minutes');

    // Build the text cell
    const textCellContent = [];
    if (tag) {
      // Wrap tag in a <p> for structure
      const tagP = document.createElement('p');
      tagP.textContent = tag.textContent;
      textCellContent.push(tagP);
    }
    if (titleLink && title) {
      // Use the link, but only keep the h5 inside
      const heading = document.createElement('h5');
      heading.textContent = title.textContent;
      // If the link has an href, wrap heading in a link
      if (titleLink.href) {
        const a = document.createElement('a');
        a.href = titleLink.href;
        a.appendChild(heading);
        textCellContent.push(a);
      } else {
        textCellContent.push(heading);
      }
    }
    if (desc) {
      const descP = document.createElement('p');
      descP.textContent = desc.textContent;
      textCellContent.push(descP);
    }

    // Add the row: [image, text content]
    rows.push([
      img ? img : '',
      textCellContent
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
