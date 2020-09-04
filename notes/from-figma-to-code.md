---
title: 'From Figma to Code'
author: 'Ryan Parag'
description: 'Designing a simple Bitcoin Tracker and translating to code'
date: '2020-09-04'
hero_image: ../static/from-figma-to-code.png
---

In an effort to keep up with this site's ethos and show a bit more of how I design things, I thought I could share a Figma file and show the code used to produce what is contained in a Figma prototype.

------------------

TLDR:

[Click here for the Figma file](https://www.figma.com/file/yZBajBKy1rlvunZXe1Hqub/Bitcoin-Tracker?node-id=2%3A5175)

[Click here to go to the CodePen](https://codepen.io/ryanparag/pen/mdPMqmv)

------------------

### What tools would I need?

Everything you need should be easily available 😀:
- [Figma](https://figma.com)
- A code editor or [CodePen](https://codepen.io)

_Optional_
- Pen & paper

------------------

### What are we going to build?

Let's build a few simple cards to track the prices of Bitcoin. ~~That way, we can see how much money we lost when we bought in during the hype.~~

We can also use [Coindesk's](https://coindesk.com) open API when moving to code 👍.

Let's start with a use case: **a user wants to be able to see the current price of Bitcoin and a few recent price trends.** For fun, we'll throw in a way to toggle between light and dark mode - for the night traders.

Let's also start by reverse engineering what I did:

[Click here for the Figma file](https://www.figma.com/file/yZBajBKy1rlvunZXe1Hqub/Bitcoin-Tracker?node-id=2%3A5175)

------------------

### Design Tokens

In order to start building some of the base UI, I created a color palette (with shades and tints) and text styles (with multiple weights):

![Color Styles](../static/from-figma-to-code_1.png)

![Text Styles](../static/from-figma-to-code_2.png)

------------------

### Components

Now that we have a few colors and text styles to use, we can start building components. Since we're incorporating a dark and light mode, we probably need two versions of a components to accomodate for each theme. We would start by building a _.base_ components - prefixed with a period to avoid publishing when we publish a library.

Now that we have a _.base_ we would use that to build light/dark versions of the components:

![Themed components](../static/from-figma-to-code_3.png)

Once we finish building our components, we ca start building the layout:

![Layout](../static/from-figma-to-code_4.png)

Since we have different versions of our components for light/dark mode, duplicating and switching out components should be easy:

![Prototype](../static/from-figma-to-code_5.png)

### Code

Now that we have a functioning prototype in Figma, we can start crafting a bit of code. If you'd like to skip to the end:

[Click here to go to the CodePen](https://codepen.io/ryanparag/pen/mdPMqmv)

By using CSS custom properties (variables) we can build out the theme switcher fairly quickly.

```css
// light mode
--bg: var(--sail-color-gray-50);
--color: var(--sail-color-gray-900);
--subtleColor: var(--sail-color-gray-400);
--successBg: var(--sail-color-green-100);
--successColor: var(--sail-color-green-500);
--dangerBg: var(--sail-color-red-100);
--dangerColor: var(--sail-color-red-500);
--cardBg: var(--sail-color-white);
--cardShadow: var(--sail-color-gray-100);
--cardBgHover: var(--sail-color-white);
--primary: var(--sail-color-blue-500);
--primarySubtle: var(--sail-color-blue-100);
--transparent: rgba(255,255,255,0);
--transparentSubtle: rgba(255,255,255,.6);

// dark mode
--bg: var(--sail-color-gray-900);
--color: var(--sail-color-gray-100);
--successBg: var(--sail-color-green-700);
--successColor: var(--sail-color-green-200);
--dangerBg: var(--sail-color-red-700);
--dangerColor: var(--sail-color-red-200);
--cardBg: var(--sail-color-gray-900);
--cardShadow: var(--sail-color-gray-800);
--cardBgHover: var(--sail-color-gray-800);
--primarySubtle: var(--sail-color-blue-800);
--transparent: rgba(26,31,54,0);
--transparentSubtle: rgba(26,31,54,.6);
```

We also need to call the data from Coindesk. Since the current price data and historical data are two different endpoints, we need to make multiple calls.

By using axios, we're able to do this easily:

```js
axios.all([
  axios.get(current_url),
  axios.get(history_url)
])
.then(res => {
  // do stuff with the data
})
```

After a little bit of styling and data transformation, we should have something close to this:

![Prototype](../static/from-figma-to-code_6.png)

### Conclusion

I'd love to know if this helps you design things and if shedding a bit of light on my process helps. If you have any ideas that could make this small project better, send me a message!