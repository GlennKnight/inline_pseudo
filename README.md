# inline_pseudo: Experimenting with Inline Pseudo-Class Styling

A lightweight JavaScript library that lets you explore styling pseudo-classes directly within your element's attributes, providing an intuitive and experimental approach to CSS customisation.

Ever imagined styling an element's hover state inline, without juggling external stylesheets? `inline_pseudo` is a playful experiment that explores this concept, allowing you to define pseudo-class styles directly within your elements' attributes. It's designed for exploration and learning, not necessarily for production environments.

**Key Features:**

- **Inline Styling:** Apply pseudo-class styles (like `:hover`, `:focus`, `:disabled`) directly within element attributes using a `style` attribute with a colon-separated syntax.
- **Modifier Stacking:** Combine multiple pseudo-class styles within the same `style` attribute using semicolons as separators.
- **Conciseness:** Simplify styling by eliminating the need for external stylesheets for basic pseudo-class customization.
- **Exploration:** Experiment with inline pseudo-classes for rapid prototyping and learning.

**Disclaimer:**

While `inline_pseudo` offers an interesting way to play with CSS, it's essential to acknowledge its limitations:

- **Experimental:** This library is not intended for production use as it might have performance or compatibility issues.
- **Browser Support:** Inline pseudo-class styling might not be universally supported across all browsers, potentially leading to inconsistent behavior.
- **Specificity:** Inline styles can have higher specificity than external styles, potentially overriding intended styles.

**Installation:**

1. Clone the repository:

```
git clone https://github.com/GlennKnight/inline_pseudo.git
```

2. Install dependencies:
   
```
npm install
```

**Usage:**

1. Include the dist/inline_pseudo.min.js file at the top of your HTML body:

```html
<body>
    <script src="dist/inline_pseudo.min.js"></script>
</body>
```

2. Apply style attributes with colon-separated pseudo-class styles to your elements:

```html
<button style:hover="color: blue;">Click me</button>
<a style:hover="text-decoration: underline; color: green;">Visit my site</a>
<input type="text" style:disabled:hover="opacity: 0.5;">
```

3. Explore! Create multiple inline styles, combine modifiers, and experiment with various pseudo-classes to see how inline pseudo-class styling works.

**Building:**

To build the library and generate the minimized version, run:

```
npm run build
```

This creates an optimized `dist/inline_pseudo.min.js` file.

**License:**

This library is licensed under the MIT License (see LICENSE file for details).

**Contributions:**

Welcome contributions! Please create pull requests for any improvements or suggestions.

**Remember:** Use `inline_pseudo` responsibly and for experimental purposes only. While it offers an intriguing way to interact with CSS, keep in mind its limitations and potential implications.
