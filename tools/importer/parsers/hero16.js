/* global WebImporter */
export default function parse(element, { document }) {
  // --- Critical Review ---
  // 1. No hardcoded text; all content is extracted from the DOM.
  // 2. No markdown formatting; only HTML elements are used.
  // 3. Only one table is created, as per the Hero block spec.
  // 4. Table header row matches: ['Hero (hero16)']
  // 5. Handles empty/missing elements gracefully.
  // 6. No Section Metadata block required per the markdown example.
  // 7. Existing elements are referenced, not cloned or created anew (except for wrapping CTA in <p> for semantic grouping).
  // 8. Semantic meaning is preserved: headings, paragraphs, button.
  // 9. All text content from the HTML is included.
  // 10. Image element is referenced directly, not recreated or using URLs from data attributes.
  // 11. No model provided, so no model field comments needed.

  // --- Extraction ---
  const left = element.querySelector('.cmp-error__left-aligned');
  const right = element.querySelector('.cmp-error__right-aligned');

  // --- IMAGE (row 2) ---
  let heroImg = '';
  if (right) {
    const img = right.querySelector('img');
    if (img) heroImg = img;
  }

  // --- TEXT (row 3) ---
  const textBlocks = [];
  if (left) {
    // Title (h2)
    const h2 = left.querySelector('.text1 h2');
    if (h2 && h2.textContent.trim()) textBlocks.push(h2);
    // Subheading (the two p's in .text2)
    const text2ps = left.querySelectorAll('.text2 p');
    text2ps.forEach(p => {
      if (p.textContent.trim()) textBlocks.push(p);
    });
    // Supporting text (the last p in .text3)
    const text3ps = left.querySelectorAll('.text3 p');
    text3ps.forEach(p => {
      if (p.textContent.trim()) textBlocks.push(p);
    });
    // CTA (Retry button)
    const btn = left.querySelector('.button .cmp-button__text');
    if (btn && btn.textContent.trim()) {
      // Wrap in a <p> for semantic grouping
      const p = document.createElement('p');
      p.append(btn);
      textBlocks.push(p);
    }
  }

  // --- TABLE ---
  const rows = [
    ['Hero (hero16)'],
    [heroImg || ''],
    [textBlocks]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
