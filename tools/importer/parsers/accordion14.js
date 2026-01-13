/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) return;

  // Find all accordion items
  const items = accordion.querySelectorAll('.cmp-accordion__item');
  if (!items.length) return;

  // Build the header row
  const rows = [ ['Accordion (accordion14)'] ];

  // For each accordion item, extract the title and content
  items.forEach(item => {
    // Title: get the button with the title span
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

    // Content: get the panel
    const panel = item.querySelector('.cmp-accordion__panel');
    let content = '';
    if (panel) {
      // Find the main text container inside the panel
      const textBlock = panel.querySelector('.cmp-text');
      if (textBlock) {
        content = textBlock;
      } else {
        // Fallback: use panel's innerHTML as a div
        const div = document.createElement('div');
        div.innerHTML = panel.innerHTML;
        content = div;
      }
    }

    // Add row: [title, content]
    rows.push([title, content]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
