---
title: 'A Figma Plugin for Design Tokens?'
author: 'Ryan Parag'
description: 'Creating a plugin to hand-off design tokens more flexibly and easily'
date: '2020-12-29'
hero_image: /static/creating-a-design-token-plugin.png
---

I recently began exploring [Figma's developer API](https://www.figma.com/plugin-docs/api/api-overview/) to try and make a few processes a bit better at the day job. 

It all started out with a problem we were facing when trying to make our *hand-off for design system components a bit easier between design and engineering* - so I started fumbling around with building a custom plugin to find a way to help ease that burden.

I was first inspired to venture into building a plugin after browsing other indie plugins and reading about [Spotify's in-house plugins](https://www.figma.com/community/file/832911648132248625/Spotify-Ways-of-Working).

### Resources

If you're interested in building a plugin to fix a problem on your own projects, here are a few resources I used:
- [Figplug](https://rsms.me/figplug/)
- [Figma Plugin Helpers](https://github.com/figma-plugin-helper-functions/figma-plugin-helpers)
- [Figma's Developer API Docs](https://www.figma.com/plugin-docs/api/api-overview/)
- [Figma Plugins by Varun Vachhar](https://varun.ca/figma-plugins/)

### What do I need to know?

If you're familiar with some basic web development, and even if you're not, building Figma Plugins is really easy - it would be helpful to know:
- HTML
- CSS
- JavaScript (Typescript helps!)
- React (with Figplug)

### Building the design token plugin

Let's start off with the flow we want the plugin to solve:

![Flow](../static/creating-a-design-token-plugin_1.png)

> Working out some bugs, but I'll upload screenshots soon!