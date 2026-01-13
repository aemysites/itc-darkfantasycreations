/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Columns block
  const headerRow = ['Columns (columns4)'];

  // --- COLUMN 1: Logos and any text nodes from HTML ---
  const logoContainer = element.querySelector('.cmp-new-footer__logo');
  const leftColDiv = document.createElement('div');
  if (logoContainer) {
    // ITC logo (inside a link)
    const itcLogoLink = logoContainer.querySelector('a');
    if (itcLogoLink) leftColDiv.appendChild(itcLogoLink.cloneNode(true));
    // FSSAI logo (standalone img)
    const fssaiLogo = logoContainer.querySelector('img.cmp-image__image_df_fssai');
    if (fssaiLogo) leftColDiv.appendChild(fssaiLogo.cloneNode(true));
    // Extract any text nodes directly from logoContainer (for flexibility)
    Array.from(logoContainer.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        leftColDiv.appendChild(p);
      }
    });
    // Also check for any <span> or <p> inside logoContainer
    logoContainer.querySelectorAll('span, p').forEach(el => {
      if (el.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = el.textContent.trim();
        leftColDiv.appendChild(p);
      }
    });
    // Do NOT inject any extra text not present in the HTML
  }

  // --- COLUMN 2: Main Navigation (About Us, Contact Us, etc) ---
  const navBlock = element.querySelector('.cmp-new-footer__nav');
  let mainNav = null, secondaryNav = null;
  if (navBlock) {
    const navGroups = navBlock.querySelectorAll('ul.cmp-new-footer__nav-group');
    if (navGroups.length > 0) mainNav = navGroups[0].cloneNode(true);
    if (navGroups.length > 1) secondaryNav = navGroups[1].cloneNode(true);
  }

  // Build the table rows
  const cells = [
    headerRow,
    [leftColDiv, mainNav, secondaryNav]
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
