// Alpine.js state and functionality
document.addEventListener('alpine:init', () => {
    Alpine.data('content', () => ({
        data: {
            header: { title: 'Loading...' },
            main: { description: 'Loading...' },
            footer: { copyright: 'Loading...' }
        },
        async loadContent() {
            try {
                const response = await fetch('data/content.json');
                if (!response.ok) throw new Error('Failed to load content');
                this.data = await response.json();
            } catch (error) {
                console.error('Error loading content:', error);
            }
        }
    }));
});
