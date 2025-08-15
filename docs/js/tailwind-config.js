// Tailwind CSS configuration
if (window.tailwind && window.tailwind.config) {
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          display: ['Poppins', 'sans-serif'],
          body: ['Roboto', 'sans-serif'],
          serif: ['Crimson Text', 'serif'],
        },
        colors: {
          'brand-red': '#E75A5C',
          'brand-cream': '#FAF3E7',
          'brand-charcoal': '#4A3B3C',
        },
      },
    },
  }
}