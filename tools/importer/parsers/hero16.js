/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image for the second row
  const heroImage = element.querySelector('.cmp-error__right-aligned img');
  const imageCell = [heroImage ? heroImage.cloneNode(true) : ''];

  // Extract left-aligned content
  const left = element.querySelector('.cmp-error__left-aligned');
  const contentCell = document.createElement('div');

  if (left) {
    // Heading (first h2)
    const heading = left.querySelector('h2');
    if (heading) contentCell.appendChild(heading.cloneNode(true));

    // Subheading (all non-empty paragraphs in .text2)
    const text2 = left.querySelector('.text2 .cmp-text');
    if (text2) {
      const ps = Array.from(text2.querySelectorAll('p')).filter(p => p.textContent.trim() && p.textContent.trim() !== '\u00A0');
      if (ps.length) {
        // Group subheading as a single block
        const subheading = document.createElement('div');
        ps.forEach(p => subheading.appendChild(p.cloneNode(true)));
        contentCell.appendChild(subheading);
      }
    }

    // Description (all non-empty paragraphs in .text3)
    const text3 = left.querySelector('.text3 .cmp-text');
    if (text3) {
      const ps = Array.from(text3.querySelectorAll('p')).filter(p => p.textContent.trim() && p.textContent.trim() !== '\u00A0');
      if (ps.length) {
        const desc = document.createElement('div');
        ps.forEach(p => desc.appendChild(p.cloneNode(true)));
        contentCell.appendChild(desc);
      }
    }

    // CTA (button text, if present)
    const button = left.querySelector('.button .cmp-button__text');
    if (button) {
      // Represent CTA as a button for semantic clarity
      const cta = document.createElement('button');
      cta.textContent = button.textContent;
      contentCell.appendChild(cta);
    }
  }

  // Build the table rows
  const headerRow = ['Hero (hero16)'];
  const rows = [
    headerRow,
    imageCell,
    [contentCell],
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
