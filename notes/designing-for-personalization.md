---
title: 'Desigining for Personalization'
author: 'Ryan Parag'
description: 'What are the ways we can design more personal experiences for users?'
date: '2020-09-17'
hero_image: ../static/designing-for-personalization.png
---

As users, we expect our modern digital products to understand us more thoroughly - to help drive a more seamless, personalized experience per our individual preferences. We see this in a multitude of ways, across mobile apps, websites, and even (more so) in our content streaming experiences:

- Custom app icons
- Personalized ecommerce recommendations
- Categorized TV shows and movies
- Dark / Light modes

Neilsen Norman Group summarizes the difference between customization and personalization fairly well:

> Customization gives control to the user and personalization gives control to the site. Both can enhance users’ experience, but only when carefully implemented.

[Customization vs. Personalization in the User Experience](https://www.nngroup.com/articles/customization-personalization/)

### Personalizing Experiences

The basic goal of personalizing an experience is **to prevent users from struggling to find information / content / products**. How can we show our users things we think they might prefer from the sea of content that we host on our platform?

Experience personalization has greatly influenced the way we shop for things and consume content in the modern era. We're seeing how detailed metadata associated with individual products, movies, podcasts, music, etc. is being used to categorize things the way systems assume we, as individuals, prefer.

Let's take a look at how Netflix shows us things based on the things we've previously watched and our individual user profile:

![Netflix personalization](../static/designing-for-personalization_1.png)

Netflix is also A/B testing on top of this, driving their deep learning platform and content designers to learn how and why certain users choose particular UI cards:

![Netflix personalization](../static/designing-for-personalization_2.png)

In this example, we're seeing how **designing the system** to perform certain background tasks can help provide a more personalized experience. Even though Netflix's example is a _very_ complex model, I think the starting point of how to design around personalization begins with a few basic questions:

- Who are our users?
- What do we know about them?
- What and how can we learn about them?
- What data can we sort for them based on what we know about each user?
- How do we show them this sorted data?
- How do we measure the success of "smarter" sorting?

Let's take a look at how Spotify answers those questions and opts to show users recommended content:

![Spotify personalization](../static/designing-for-personalization_3.png)

Spotify also chooses to mix content together, showing us a variation of content we've consumed alongside content that matches a higher frequency of metadata - all pointing to a more seamless, personalized experience.

![Spotify personalization](../static/designing-for-personalization_4.png)

This is a _super_ interesting method of designing for a better experience, and can probably be expounded on greatly. Here are a few more resources digging into these details more thoroughly:

- [UX Design for Personalization](https://www.uxmatters.com/mt/archives/2018/07/ux-design-for-personalization.php)
- [Artwork Personalization at Netflix](https://netflixtechblog.com/artwork-personalization-c589f074ad76)
- [Amazon’s User Experience: A Case Study](https://medium.com/@the_manifest/amazons-user-experience-a-case-study-fb567f79b51f)

### Customized Experiences

Rather than let the system dictate what a user sees, is it possible for us to let the user dictate their own experience upon segments of a digital product experience?

We see this in a ton of ways already - throughout our iOS settings, news feeds, theme pickers 😉, etc.

Let's take a look at how some teams are tackling customization in a few unique and common ways. In GitHub for Mobile, we can see a wide range of ways they're allowing the user to customize based on their preferences - providing fixed options to modify certain settings:

![GitHub personalization](../static/designing-for-personalization_5.png)

Some apps even let us choose the app icon we see in our view, before we jump into the app! Let's see how GitHub, PocketCasts, and Todoist gives users an array of app icon options:

![App icon personalization](../static/designing-for-personalization_6.png)

One of the most common ways digital products give to customize the UI and experience for individual users is through dark/light theming (and maybe a step further). Commonly dictated based on the user's OS settings, apps and browsers can grab and feed that preference to our digital products - building a sensible default and predicting a more seamless experience for the user.

If you'd like to do this on the web, all it takes is a bit of CSS or JS. If you're opting to do this in CSS, we can accomplish this in a simple way in modern browsers:

```css
@media (prefers-color-scheme: dark) {
  body {
    color: white;
    background: black;
  }
}

@media (prefers-color-scheme: light) {
  body {
    color: black;
    background: white;
  }
}
```

In JS, we can grab a user's OS theme with a simple function:

```js
if (window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.style.background = 'black';
  document.body.style.color = 'white';
}
```

Some apps take this to another level, giving users options in choosing pre-selected themes (kind of like this site). Todoist lets users select a theme and which type (light/dark) of neutral colors they prefer. They even let the users toggle if they would like to match per their OS preferences and make a more cohesive cross-platform experience by syncing:

![Todoist Customization](../static/designing-for-personalization_7.png)

### A Step Further

UI personalization and customization has made me curious on the limits to which we can go by giving users certain controls - and, more interestingly, when we don't have to. Most UI theming mechanisms provide a limited, strictly-defined amount of choices (as seen above). What if we could give users full control of the theme in an interface?

So I created a way for users to theme this site on their own. [Check it out!](../create-theme)

![Theme Creator](../static/designing-for-personalization_8.png)

I've been experimenting with ways to which we could give users fluid customization abilities, but provide them enough rails as to not degrade their experience.

I'm still playing around with this idea and gathering feedback, but by using [Lyft Design's Colorbox tool](https://www.colorbox.io/) and the algorithm they've crafted, we can create palette's on-the-fly using a minimal inputs.

To provide some rails for the user, I included a way for the user to gauge when their theme isn't matching certain WCAG requirements as well.

I'd love to hear what you think, and if you have any feedback contact me using the details below!