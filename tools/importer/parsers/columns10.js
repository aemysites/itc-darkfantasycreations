/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Columns block
  const headerRow = ['Columns (columns10)'];

  // Find the main content container
  const swiper = element.querySelector('[data-component="product-swiper"]');
  if (!swiper) return;

  // Left column: heading, subheading, swipe icon, large cookie image
  const title = swiper.querySelector('.cmp-product-swiper__title');
  const subtitle = swiper.querySelector('.cmp-product-swiper__sub-title');
  const swipeIconContainer = swiper.querySelector('.cmp-product-swiper__swipe-icon')?.closest('.lazy-image-container');
  const leftCookieImg = swiper.querySelector('.cmp-product-swiper__cookie-img');

  // Compose left column content
  const leftColElements = [];
  if (title) leftColElements.push(title);
  if (subtitle) leftColElements.push(subtitle);
  if (swipeIconContainer) leftColElements.push(swipeIconContainer);
  if (leftCookieImg) leftColElements.push(leftCookieImg);

  // Right column: product image and text (card)
  const section2 = swiper.querySelector('.cmp-product-swiper__section2');
  let rightColElements = [];
  if (section2) {
    rightColElements = Array.from(section2.children);
    // If the product image exists, and its alt is empty, add the visible text from the <p> below the image
    const prodImg = section2.querySelector('img');
    const prodLabel = section2.querySelector('p');
    if (prodImg && prodLabel && prodLabel.textContent.trim()) {
      // Insert the label after the image
      rightColElements.splice(1, 0, prodLabel.cloneNode(true));
    }
  }

  // Build the table rows
  const rows = [
    headerRow,
    [leftColElements, rightColElements]
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
