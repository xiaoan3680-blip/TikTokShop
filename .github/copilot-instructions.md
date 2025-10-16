# Copilot Instructions for TikTok Seller University E-commerce Project

## Project Overview
This is a single-file HTML project (`Untitled-1.html`) for a TikTok Seller University-themed e-commerce demo. The project uses Tailwind CSS via CDN and customizes TikTok brand colors. The UI is styled with the Inter font from Google Fonts and features a modern, mobile-responsive layout.

## Key Patterns & Conventions
- **Single HTML File:** All markup, styles, and scripts are contained in `Untitled-1.html`. There are no external JS or CSS files.
- **Tailwind CSS:** Styling is done using Tailwind utility classes. Custom colors for TikTok branding are defined in the Tailwind config script block.
- **Font:** Uses Inter font via Google Fonts import in a `<style>` block.
- **Branding:** Custom colors (`tiktok-black`, `tiktok-pink`, `tiktok-cyan`) are used for backgrounds, buttons, and highlights.
- **Responsive Design:** The layout is mobile-first and adapts to different screen sizes using Tailwind's responsive classes.
- **No Build Tools:** No build, test, or deployment scripts are present. All development is done directly in the HTML file.

## Developer Workflow
- **Edit Directly:** Make all changes in `Untitled-1.html`.
- **Preview:** Open the file in a browser to view changes. No local server or build step is required.
- **Add Components:** Use semantic HTML and Tailwind classes for new UI elements. Extend the Tailwind config in the `<script>` block if new custom colors are needed.
- **Debugging:** Use browser DevTools for inspecting layout and styles.

## Examples
- To add a TikTok-branded button:
  ```html
  <button class="tiktok-primary text-white px-4 py-2 rounded">Đăng ký</button>
  ```
- To extend Tailwind colors:
  ```js
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          'tiktok-new': '#abcdef'
        }
      }
    }
  }
  ```

## External Dependencies
- [Tailwind CSS CDN](https://cdn.tailwindcss.com)
- [Google Fonts: Inter](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap)

## File Reference
- `Untitled-1.html`: Main and only source file. Contains all code and configuration.

---
If you add new files or introduce build tools, update this document to reflect new workflows and conventions.
