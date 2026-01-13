/* global WebImporter */
export default function parse(element, { document }) {
  // Extract left column: title, serves (from left), tags, ingredients (with time grouped as in source)
  const left = element.querySelector('.cmp-recipe-detail__left-container');
  const title = left.querySelector('.cmp-recipe-detail__title');
  const servesLeft = left.querySelector('.cmp-recipe-detail__recipe-serves');
  const tags = left.querySelector('.cmp-recipe-detail__tags');
  const ingredients = left.querySelector('.cmp-recipe-detail__ingredients');

  // Compose left column fragment
  const leftCol = document.createElement('div');
  if (title) leftCol.appendChild(title.cloneNode(true));
  if (servesLeft) leftCol.appendChild(servesLeft.cloneNode(true));
  if (tags) leftCol.appendChild(tags.cloneNode(true));
  if (ingredients) leftCol.appendChild(ingredients.cloneNode(true));

  // Extract right column: share, serves (from right only)
  const right = element.querySelector('.cmp-recipe-detail__right-container');
  const share = right.querySelector('.cmp-recipe-detail__social-share');
  const servesRight = right.querySelector('.cmp-recipe-detail__recipe-serves');

  // Compose right column fragment
  const rightCol = document.createElement('div');
  if (share) rightCol.appendChild(share.cloneNode(true));
  if (servesRight) rightCol.appendChild(servesRight.cloneNode(true));

  // Compose table rows
  const headerRow = ['Columns (columns5)'];
  const contentRow = [leftCol, rightCol];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
