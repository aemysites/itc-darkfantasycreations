/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Columns block
  const headerRow = ['Columns (columns5)'];

  // --- LEFT COLUMN CONTENT ---
  // Get left container (main content)
  const left = element.querySelector('.cmp-recipe-detail__left-container');
  // Defensive: if left is missing, fallback to element
  const leftContent = left || element;

  // Title
  const title = leftContent.querySelector('.cmp-recipe-detail__title');
  // Tags (as a container)
  const tags = leftContent.querySelector('.cmp-recipe-detail__tags');
  // Ingredients/time (as a container)
  const ingredientsTime = leftContent.querySelector('.cmp-recipe-detail__ingredients');
  // Compose left column fragment (do NOT include serves info)
  const leftColumn = document.createElement('div');
  if (title) leftColumn.appendChild(title);
  if (tags) leftColumn.appendChild(tags);
  if (ingredientsTime) leftColumn.appendChild(ingredientsTime);

  // --- RIGHT COLUMN CONTENT ---
  // Get right container (meta info)
  const right = element.querySelector('.cmp-recipe-detail__right-container');
  // Defensive: if right is missing, fallback to element
  const rightContent = right || element;

  // Share label (as a container)
  const share = rightContent.querySelector('.cmp-recipe-detail__social-share');
  // Serves info (as a container)
  const servesRight = rightContent.querySelector('.cmp-recipe-detail__recipe-serves');

  // Compose right column fragment
  const rightColumn = document.createElement('div');
  if (share) rightColumn.appendChild(share);
  if (servesRight) rightColumn.appendChild(servesRight.cloneNode(true));

  // --- TABLE STRUCTURE ---
  // 2 columns: left (main content), right (share/serves)
  const rows = [
    headerRow,
    [leftColumn, rightColumn],
  ];

  // Replace the original element with the new table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
