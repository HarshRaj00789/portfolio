document.addEventListener('DOMContentLoaded', () => {
  // Helper to inject HTML components
  async function inject(selector, url, position = 'beforeend') {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
      const html = await res.text();
      document.querySelector(selector).insertAdjacentHTML(position, html);
    } catch (err) {
      console.error(err);
    }
  }

  // Inject header and footer using RELATIVE paths
  inject('body', 'components/header.html', 'afterbegin').then(() => {
    // Highlight active nav link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === path) {
        link.style.borderBottom = '2px solid #38bdf8';
      }
    });
  });

  inject('body', 'components/footer.html', 'beforeend');
});