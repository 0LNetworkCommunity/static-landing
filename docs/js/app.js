// Alpine.js initialization and data loading
document.addEventListener('alpine:init', () => {
  console.log('Alpine.js initialized successfully');

  Alpine.data('app', () => ({
    data: {},
    mobileMenuOpen: false,
    loaded: false,

    init() {
      console.log('Fetching content...');
      fetch('data/text-content.json')
        .then(response => {
          if (!response.ok) throw new Error('Failed to load content');
          return response.json();
        })
        .then(json => {
          console.log('Content loaded successfully');
          this.data = json;
          this.loaded = true;
          this.$nextTick(() => this.$el.classList.add('show'));
        })
        .catch(error => {
          console.error('Error loading content:', error);
          this.data = {
            brand: { name: 'Open Libra' },
            navigation: [],
            hero: { title: 'Loading...', subtitle: '' },
            buttons: { faq: 'FAQ' },
            socialLinks: [],
            about: {},
            foundation: {},
            inventions: {},
            example: {},
            governance: {},
            documentation: {},
            cta: {},
            links: {}
          };
          this.loaded = true;
          this.$nextTick(() => this.$el.classList.add('show'));
        });
    }
  }));
});