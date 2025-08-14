# Visual Identity Guide

## Typography

### Primary Typefaces

#### Poppins - Headlines and Titles
- **Usage**: Main headlines, navigation logo, important headings
- **Weights**:
  - Bold (700) for main headlines
  - Semibold (600) for the logo
  - Regular (400) for section headings
- **Characteristics**:
  - Geometric sans-serif
  - Modern and forward-thinking
  - Clean and professional
- **Example**: "Reimagining Global Finance"

#### Roboto - Body Text
- **Usage**: Body copy, navigation items, buttons, supporting text
- **Weights**:
  - Light (300) for body text and navigation
  - Regular (400) for emphasized body text
- **Characteristics**:
  - Highly readable
  - Professional and clean
  - Excellent for screen display
- **Example**: Navigation items, descriptive text

## Color Palette

### Primary Colors
- **Brand Red**
  - HEX: `#E75A5C`
  - Usage: Primary background color
  - Properties: Bold, energetic, commanding attention

### Secondary Colors
- **Brand Cream**
  - HEX: `#FAF3E7`
  - Usage: Text color, button borders
  - Properties: Warm, soft, highly readable on red background

### Opacity Variations
- Border colors: 20% opacity of Brand Cream
- Hover states: 80% opacity for interactive elements

## UI Elements

### Buttons
- **Border Style**:
  - 1px solid border using Brand Cream
  - Border radius: rounded-full (9999px)
  - Padding: 0.75rem 2.5rem (py-3 px-10)

### Button States
- **Default**:
  - Transparent background
  - Brand Cream border and text
- **Hover**:
  - Brand Cream background
  - Brand Red text
  - Smooth transition (duration: 300ms)

### Navigation
- Border bottom: 1px with 20% opacity of Brand Cream
- Links with hover opacity of 80%
- Consistent spacing (2rem) between items

## Layout

### Containers
- Maximum width: 1280px (default Tailwind container)
- Centered with auto margins
- Responsive padding: 1rem (16px) on smaller screens

### Spacing
- Vertical rhythm based on multiples of 4
- Major sections: 6rem (96px) padding top/bottom
- Text spacing:
  - 1.5rem (24px) between heading and body text
  - 4rem (64px) between main sections

## Typography Scale

### Headlines
- Main headline: 4.5rem (72px)
- Logo: 1.5rem (24px)
- Navigation: 0.875rem (14px)
- Body text: 1.25rem (20px)
- Button text: 1.125rem (18px)

## Best Practices

1. **Contrast & Readability**
   - Maintain high contrast between background and text
   - Use lighter font weights sparingly and only at larger sizes

2. **Spacing**
   - Maintain consistent vertical rhythm
   - Use generous whitespace around primary elements
   - Keep navigation items evenly spaced

3. **Responsive Design**
   - Adjust font sizes proportionally on smaller screens
   - Maintain button padding-to-text ratio across devices

4. **Interactions**
   - All interactive elements should have hover states
   - Transitions should be smooth (300ms duration)
   - Maintain consistent hover behaviors

## Implementation Notes

### CSS Classes (Tailwind)
```html
<!-- Typography -->
font-display  /* For Poppins */
font-body     /* For Roboto */

<!-- Colors -->
bg-brand-red  /* Background red */
text-brand-cream /* Text color */

<!-- Button Base -->
inline-block rounded-full border border-brand-cream
px-10 py-3 transition-colors duration-300
```

### Default HTML Structure
```html
<nav class="border-b border-opacity-20">
  <!-- Navigation content -->
</nav>

<main class="container mx-auto px-4 py-24">
  <!-- Main content -->
</main>
```

This guide serves as the source of truth for maintaining consistent design across the application. Always refer to these specifications when implementing new features or making design changes.
