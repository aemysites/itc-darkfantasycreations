/* global WebImporter */
export default function parse(element, { document }) {
  // --- HEADER ROW ---
  const headerRow = ['Hero (hero8)'];

  // --- BACKGROUND IMAGE ROW ---
  let bgImgUrl = null;
  const teaserDiv = element.querySelector('.cmp-teaser');
  if (teaserDiv) {
    bgImgUrl = teaserDiv.getAttribute('data-background-image-desktop');
    if (!bgImgUrl) {
      const bgImg = teaserDiv.querySelector(':scope > img');
      if (bgImg) bgImgUrl = bgImg.src;
    }
  }
  let bgImgEl = null;
  if (bgImgUrl) {
    bgImgEl = document.createElement('img');
    bgImgEl.src = bgImgUrl;
  }
  const bgImgRow = [bgImgEl ? bgImgEl : ''];

  // --- CONTENT ROW ---
  // Heading, description, CTA only
  const contentContainer = teaserDiv.querySelector('.cmp-teaser__content');
  let contentEls = [];
  if (contentContainer) {
    const heading = contentContainer.querySelector('.cmp-teaser__title');
    if (heading) contentEls.push(heading);
    const desc = contentContainer.querySelector('.cmp-teaser__description');
    if (desc) contentEls.push(desc);
    const cta = contentContainer.querySelector('.cmp-teaser__action-container a');
    if (cta) contentEls.push(cta);
  }
  const contentRow = [contentEls];

  // --- BUILD TABLE ---
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
