# Styles

This folder contains all the global styles. Each SCSS partial file is imported into `global.scss` which should be imported in .

- `_breakpoint.scss`: SCSS variables for screen size. Using SCSS variables instead of CSS custom variables because the latter can't be used in media queries.
- `_size.css`: CSS custom variables for all size related.
- `_space.css`: CSS custom variables for fluid space values generated with [Utopia](https://utopia.fyi/space/calculator?c=320,18,1.2,1240,20,1.25,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12).
- `_typography.css`: CSS custom variables for fluid type values generated with [Utopia](https://utopia.fyi/type/calculator?c=320,16,1.2,1024,20,1.25,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12).
- `_color.scss`: CSS custom variables for color palette and light/dark mode.
- `_reset.scss`: Modern CSS reset file from [Piccalilli](https://piccalil.li/blog/a-modern-css-reset/).
