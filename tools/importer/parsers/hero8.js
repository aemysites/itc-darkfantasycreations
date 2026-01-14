/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero8)'];

  // --- Background Image Row ---
  // Find the background image (first <img> direct child of .cmp-teaser)
  let bgImg = '';
  const teaser = element.querySelector('.cmp-teaser');
  if (teaser) {
    const teaserImgs = Array.from(teaser.children).filter(e => e.tagName === 'IMG');
    if (teaserImgs.length > 0) {
      bgImg = teaserImgs[0];
    }
  }
  const bgImgRow = [bgImg || ''];

  // --- Content Row ---
  // Heading, subheading, CTA, decorative image (dessert) in this cell
  const contentParts = [];
  if (teaser) {
    const content = teaser.querySelector('.cmp-teaser__content');
    if (content) {
      const heading = content.querySelector('.cmp-teaser__title');
      if (heading) contentParts.push(heading);
      const desc = content.querySelector('.cmp-teaser__description');
      if (desc) contentParts.push(desc);
      const cta = content.querySelector('.cmp-teaser__action-container');
      if (cta) contentParts.push(cta);
    }
    // Decorative image: .cmp-teaser__image img (dessert photo)
    const decoImgEl = teaser.querySelector('.cmp-teaser__image img');
    if (decoImgEl) {
      contentParts.push(decoImgEl);
    }
  }
  const contentRow = [contentParts];

  // Build table
  const cells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
