/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion container
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) return;

  // Find all accordion items
  const items = accordion.querySelectorAll('.cmp-accordion__item');
  if (!items.length) return;

  // Build the table rows
  const rows = [
    ['Accordion (accordion14)'], // Header row
  ];

  items.forEach(item => {
    // Title: find the button with the title span
    const button = item.querySelector('.cmp-accordion__button');
    let title = '';
    if (button) {
      const titleSpan = button.querySelector('.cmp-accordion__title');
      if (titleSpan) {
        title = titleSpan.textContent.trim();
      } else {
        title = button.textContent.trim();
      }
    }
    // Content: find the panel
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let content = '';
    if (panel) {
      // Find the inner text container
      const textDiv = panel.querySelector('.cmp-text');
      if (textDiv) {
        content = textDiv;
      } else {
        content = panel;
      }
    }
    rows.push([
      title,
      content,
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
