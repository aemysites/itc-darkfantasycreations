/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct child by class
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList && child.classList.contains(className));
  }

  // 1. Header row
  const headerRow = ['Columns (columns10)'];

  // 2. Find the main content container
  const cmpProductSwiper = element.querySelector('.cmp-product-swiper');

  // Defensive: If not found, do nothing
  if (!cmpProductSwiper) return;

  // 3. Left column: Title, subtitle, swipe visual, big cookie image
  // Title
  const title = cmpProductSwiper.querySelector('.cmp-product-swiper__title');
  // Subtitle
  const subtitle = cmpProductSwiper.querySelector('.cmp-product-swiper__sub-title');
  // Swipe icon (the arrow visual)
  const swipeIcon = cmpProductSwiper.querySelector('.cmp-product-swiper__swipe-icon');
  // Large cookie image (the first .cmp-product-swiper__cookie-img)
  const cookieImg = cmpProductSwiper.querySelector('.cmp-product-swiper__cookie-img');

  // Compose left column
  const leftCol = document.createElement('div');
  if (title) leftCol.appendChild(title);
  if (subtitle) leftCol.appendChild(subtitle);
  if (swipeIcon && swipeIcon.parentElement) leftCol.appendChild(swipeIcon.parentElement); // use the container for swipe icon
  if (cookieImg) leftCol.appendChild(cookieImg);

  // 4. Right column: Product card image and caption
  const section2 = cmpProductSwiper.querySelector('.cmp-product-swiper__section2');
  let rightCol;
  if (section2) {
    rightCol = section2;
  } else {
    rightCol = document.createElement('div');
  }

  // 5. Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [leftCol, rightCol],
  ], document);

  // 6. Replace original element
  element.replaceWith(table);
}
