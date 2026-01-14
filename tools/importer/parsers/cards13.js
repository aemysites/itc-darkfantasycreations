/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards13) block: 2 columns, each row is a card with image and text
  const headerRow = ['Cards (cards13)'];

  // Find image
  const img = element.querySelector('img');

  // Find title and description (always include, even if empty)
  const title = element.querySelector('.cmp-card__username');
  const description = element.querySelector('.cmp-card__description');

  // Find rating stars (preserve as empty divs, faithful to source)
  const ratingStars = element.querySelectorAll('.rating-star');
  const ratingContainer = document.createElement('div');
  ratingStars.forEach(() => {
    const starDiv = document.createElement('div');
    starDiv.className = 'rating-star';
    ratingContainer.appendChild(starDiv);
  });

  // Compose text cell: always include title, rating, description (even if empty)
  const textCellContent = [];
  const heading = document.createElement('h4');
  heading.textContent = title ? title.textContent.trim() : '';
  textCellContent.push(heading);
  textCellContent.push(ratingContainer);
  const desc = document.createElement('p');
  desc.textContent = description ? description.textContent.trim() : '';
  textCellContent.push(desc);

  // Card row: [image, text]
  const cardRow = [img, textCellContent];

  // Build table
  const cells = [headerRow, cardRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(table);
}
