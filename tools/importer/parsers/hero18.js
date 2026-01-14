/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract the main hero image (background image)
  function getHeroImage(el) {
    const img = el.querySelector('picture img');
    if (img) return img;
    return el.querySelector('img');
  }

  // Helper: Extract all text content from the hero block
  function getHeroTextContent(el) {
    // Collect all text nodes that are visually present in the hero
    const texts = [];
    // Heading
    let heading = Array.from(el.querySelectorAll('*')).find(e => e.textContent.trim().replace(/\s+/g,' ').toUpperCase() === 'FULFILL FANTASY OF EVERY HEART');
    if (heading) {
      const h = document.createElement('h1');
      h.textContent = heading.textContent.trim();
      texts.push(h);
    }
    // Subheading
    let subheading = Array.from(el.querySelectorAll('*')).find(e => e.textContent.trim().includes('Discover the World of Fantasy'));
    if (subheading) {
      const p = document.createElement('p');
      p.textContent = subheading.textContent.trim();
      texts.push(p);
    }
    // CTA button
    const cta = el.querySelector('a, button');
    if (cta) {
      texts.push(cta.cloneNode(true));
    }
    // Disclaimer/small print
    let disclaimer = Array.from(el.querySelectorAll('*')).find(e => e.textContent.trim().includes('Milk Chocolate solids'));
    if (disclaimer) {
      const small = document.createElement('small');
      small.textContent = disclaimer.textContent.trim();
      texts.push(small);
    }
    return texts.length ? texts : [''];
  }

  // 1. Header row: must match block name exactly
  const headerRow = ['Hero (hero18)'];

  // 2. Image row: reference the <img> element if found
  const heroImg = getHeroImage(element);
  const imageRow = [heroImg ? heroImg : ''];

  // 3. Text row: extract all text content from the HTML (heading, subheading, CTA, disclaimer)
  const textRow = [getHeroTextContent(element)];

  // Build the table using WebImporter.DOMUtils.createTable
  const cells = [headerRow, imageRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
