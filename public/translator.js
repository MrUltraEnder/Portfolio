(function () {
  /**
   * Simple bilingual translator using Google Cloud Translation API v2.
   * All visible text is collected and translated on demand.
   */
  const API_URL = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyC0YXtlxqfaRYg5PWTmQfgfXwDJwZBWpuw';
  const textNodes = [];
  let currentLang = 'en';
  let translations = [];

  // Collect visible text nodes excluding scripts, styles and empty nodes
  function collectTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.parentElement) return NodeFilter.FILTER_REJECT;
        const tag = node.parentElement.tagName;
        if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(tag)) return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (getComputedStyle(node.parentElement).display === 'none') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n;
    while ((n = walker.nextNode())) {
      n.__original = n.nodeValue;
      textNodes.push(n);
    }
  }

  // Call Google Translate API to translate texts to Spanish
  async function requestTranslations(texts) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: texts,
        source: 'en',
        target: 'es',
        format: 'text'
      })
    });
    const data = await res.json();
    return data.data.translations.map(t => t.translatedText);
  }

  async function translatePage(buttons) {
    if (!translations.length) {
      try {
        const texts = textNodes.map(n => n.__original);
        translations = await requestTranslations(texts);
      } catch (err) {
        console.error('Translation failed', err);
        buttons.forEach(b => (b.disabled = false));
        return;
      }
    }
    textNodes.forEach((node, i) => { node.nodeValue = translations[i]; });
    buttons.forEach(b => {
      b.textContent = 'EN';
      b.disabled = false;
    });
    currentLang = 'es';
    document.documentElement.lang = 'es';
  }

  function revertPage(buttons) {
    textNodes.forEach(node => { node.nodeValue = node.__original; });
    buttons.forEach(b => { b.textContent = 'ES'; });
    currentLang = 'en';
    document.documentElement.lang = 'en';
  }

  function init() {
    collectTextNodes(document.body);
    const buttons = Array.from(document.querySelectorAll('.language-toggle'));
    buttons.forEach(btn => {
      btn.textContent = 'ES';
      btn.addEventListener('click', () => {
        buttons.forEach(b => (b.disabled = true));
        if (currentLang === 'en') {
          translatePage(buttons);
        } else {
          revertPage(buttons);
          buttons.forEach(b => (b.disabled = false));
        }
      });
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
