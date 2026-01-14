/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct children
  const children = Array.from(element.children);

  // Left column: logo block (the .cmp-image logo div)
  const logoBlock = children.find(child => child.classList.contains('cmp-image'));

  // Extract the license number text from logoBlock (it's not part of the images)
  let licenseText = '';
  if (logoBlock) {
    // Find the FSSAI logo image
    const fssaiImg = logoBlock.querySelector('img.cmp-image__image_df_fssai');
    // The license number is a text node after the FSSAI logo image
    let node = fssaiImg ? fssaiImg.nextSibling : null;
    while (node && (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '')) {
      node = node.nextSibling;
    }
    // If the text node contains the license number, use it
    if (node && node.nodeType === Node.TEXT_NODE && node.textContent.trim().includes('Lic. No.')) {
      licenseText = node.textContent.trim();
    }
    // If not found, try to find any element with the license number
    if (!licenseText) {
      const possible = logoBlock.querySelector('*');
      if (possible && possible.textContent.includes('Lic. No.')) {
        licenseText = possible.textContent.trim();
      }
    }
  }

  // Compose left column: logoBlock + licenseText
  let leftCol = null;
  if (logoBlock) {
    const logoClone = logoBlock.cloneNode(true);
    if (licenseText) {
      const licenseDiv = document.createElement('div');
      licenseDiv.textContent = licenseText;
      logoClone.appendChild(licenseDiv);
    }
    leftCol = logoClone;
  }

  // Middle/right columns: Navigation block (the .cmp-new-footer__nav div)
  const navBlock = children.find(child => child.classList.contains('cmp-new-footer__nav'));
  let middleNav = null, rightNav = null;
  if (navBlock) {
    const navGroups = navBlock.querySelectorAll(':scope > ul');
    if (navGroups[0]) middleNav = navGroups[0].cloneNode(true);
    if (navGroups[1]) rightNav = navGroups[1].cloneNode(true);
  }

  // Table header
  const headerRow = ['Columns (columns4)'];
  // Table content row (three columns)
  const contentRow = [leftCol, middleNav, rightNav];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace element
  element.replaceWith(table);
}
