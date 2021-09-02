export const designTokens = {
  layoutWidth: {
    sm: '672px',
    lg: '782px'
  },
  breakpoints: [
    '1440px', // 0
    '1256px', // 1
    '1080px', // 2
    '968px',  // 3
    '768px',  // 4
    '640px',  // 5
    '512px',  // 6
    '420px'   // 7
  ],
  space: [
    '0px',  // 0
    '4px',  // 1
    '8px',  // 2
    '16px', // 3
    '24px', // 4
    '32px', // 5
    '48px', // 6
    '64px', // 7
    '96px', // 8
    '128px',// 9
    '256px',// 10
  ],
  sizing: {
    _xs: '0.75rem',
    _sm: '0.875rem',
    _base: '1rem',
    _lg: '1.125rem',
    _xl: '1.25rem',
    _2xl: '1.5rem',
    _3xl: '1.875rem',
    _4xl: '2.25rem',
    _5xl: '3rem',
    _6xl: '3.75rem',
    _7xl: '4.5rem',
    _8xl: '6rem',
    _9xl: '8rem'
  },
  fontSizes: [
    '1.2rem',   // 0
    '1.4rem',   // 1
    '1.6rem',   // 2
    '2.4rem',   // 3
    '3.2rem',   // 4
    '4.4rem',   // 5
    '5.6rem',   // 6
    '8.8rem',   // 7
  ],
  fontSizesMobile: [
    '1.2rem',   // 0
    '1.4rem',   // 1
    '1.6rem',   // 2
    '1.8rem',   // 3
    '2.4rem',   // 4
    '3.0rem',   // 5
    '3.6rem',   // 6
    '4.0rem',   // 7
  ],
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    monospace: "'iA Quattro', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  fontWeights: {
    body: 400,
    subheading: 600,
    bold: 700,
    heading: 900,
  },
  lineHeights: {
    body: '160%',
    compact: '140%',
    bigHeading: '110%',
    heading: '128%',
    smallHeading: '135%',
    code: '160%',
  },
  colors: {
    base: {
      grey900: 'hsla(220, 24%, 7%, 1)',
      grey800: 'hsla(220, 21%, 13%, 1)',
      grey700: 'hsla(220, 18%, 21%, 1)',
      grey600: 'hsla(220, 15%, 29%, 1)',
      grey500: 'hsla(220, 12%, 37%, 1)',
      grey400: 'hsla(220, 9%, 68%, 1)',
      grey300: 'hsla(220, 6%, 76%, 1)',
      grey200: 'hsla(220, 3%, 91%, 1)',
      grey100: 'hsla(0, 0%, 96%, 1)',
      grey0: 'hsla(0, 0%, 100%, 1)',
    },
    states: {
      green: 'hsla(171, 100%, 41%, 1)',
      blue: 'hsla(179, 44%, 64%, 1)',
      pink: 'hsla(334, 66%, 71%, 1)',
      greenTransparent: 'hsla(171, 100%, 41%, .2)',
      blueTransparent: 'hsla(179, 44%, 64%, .2)',
      pinkTransparent: 'hsla(334, 66%, 71%, .2)',
      visited: 'hsla(334, 86%, 43%, 1)',
      greenDark: 'hsla(171, 100%, 35%, 1)',
      blueDark: 'hsla(179, 44%, 40%, 1)',
    }
  }
};