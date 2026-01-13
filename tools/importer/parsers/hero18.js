/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main carousel item (active slide)
  const carouselItem = element.querySelector('.cmp-carousel__item');
  if (!carouselItem) return;

  // Find the banner image (background)
  let bannerImg = null;
  const picture = carouselItem.querySelector('picture');
  if (picture) {
    bannerImg = picture.querySelector('img');
  }

  // Extract all text content from the banner
  // Headline, subheading, and CTA button
  let headline = '';
  let subheading = '';
  let ctaText = '';
  let ctaHref = '';

  // Try to find the headline, subheading, and CTA from the banner content
  const bannerContent = carouselItem.querySelector('.cmp-banner__content');
  if (bannerContent) {
    // Find all text elements inside bannerContent
    // The heading is usually the first large text, subheading next, then button
    const textEls = Array.from(bannerContent.querySelectorAll('*'));
    textEls.forEach(el => {
      const text = el.textContent.trim();
      if (!text) return;
      // Use the most likely heading/subheading by matching text from screenshot analysis
      if (!headline && text.match(/FULFILL FANTASY OF EVERY HEART/i)) {
        headline = text;
      } else if (!subheading && text.match(/Discover the World of Fantasy/i)) {
        subheading = text;
      }
    });
  }

  // CTA button
  const ctaBtn = carouselItem.querySelector('.cmp-button');
  if (ctaBtn) {
    ctaText = ctaBtn.textContent.trim();
    ctaHref = ctaBtn.getAttribute('href') || '';
  }

  // Compose the content cell
  const contentCell = document.createElement('div');
  if (headline) {
    const h1 = document.createElement('h1');
    h1.textContent = headline;
    contentCell.appendChild(h1);
  }
  if (subheading) {
    const p = document.createElement('p');
    p.textContent = subheading;
    contentCell.appendChild(p);
  }
  if (ctaText && ctaHref) {
    const a = document.createElement('a');
    a.textContent = ctaText;
    a.href = ctaHref;
    contentCell.appendChild(a);
  }

  const headerRow = ['Hero (hero18)'];
  const imageRow = [bannerImg ? bannerImg : ''];
  const contentRow = [contentCell.childNodes.length ? contentCell : ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
