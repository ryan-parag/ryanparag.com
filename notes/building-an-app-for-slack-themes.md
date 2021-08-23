---
title: 'Designing an App for Slack Themes'
author: 'Ryan Parag'
description: 'Learning how to scrap together a web app using React, Tailwind, and Firestore'
date: '2020-12-17'
hero_image: /static/designing-an-app-for-slack-themes.png
---

Can we not only design a web app, but plan and build one as well? Sure we can!

About a year and a half ago, I began to realize I had too many Slack workspaces and had a difficult time differentiating between them. So I set out to build a web app to help collect a bunch Slack Themes where users are able to copy and paste into Slack - [you can find it here](https://slack-themes.now.sh/)!

*__Sidenote:__ I'm not going to delve too much into the code or design, but if you have questions, feel free to look at the [repo on GitHub](https://github.com/ryan-parag/slack-themes) or contact me!*

Slack gives us a way to customize the theme of each workspace sidebar, and I thought this could be a neat way for others to help personalize and identify their different workspaces.

![Slack's Theme Customizer](../static/designing-an-app-for-slack-themes_1.png)
Slack's Theme Customizer

*But, in order to change a theme, I had to go through multiple steps: open the menu, click preferences, change theme.*

- How can we make the process of selecting themes simpler?
- What if a user wanted to do this in less steps?
- What if a user wanted access to more themes and options?

**End Goal**

*Let's set out to build a web application where users can find one of many curated themes to copy and paste quickly in their Slack workspaces*

Although there was a v1 of this web application, I'm going to go through the high-level steps of how I set out to build v2 from the ground up.

**What will we use to build it?**
- Figma: to help design our idea
- React & Next.js: to house all of our front-end logic and server-rendered pages
- Tailwind: to help build styles super quickly (and a bit of Styled Components)
- Firebase/Firestore: to help house all of our themes inside of a database

There are a few other things, like __framer-motion__ and __PostCSS__, but they won't be necessary.

## Getting Started with Data and Firestore

The first thing we should probably do is start to think how we will store our themes and which types of data will be associated with each theme:
- Theme name
- Theme colors
- Created by
- Date created
- Categories/groups
- Likes

Slack gives us the ability to customize 9 colors in a theme, all denoted by a label (eg. Active Item). Why don't we take a look at a data object of a theme that contains the items listed above:

```js
// theme object
{
  theme_name: 'Example Theme',
  active_item: '#5469D4',
  active_item_text: '#FFFFFF',
  active_presence:'#4CAF50',
  column_bg: '#191D27',
  hover_item: '#283040',
  mention_badge: '#F2453D',
  text_color: '#DEE5EE',
  top_nav_bg: '#000000',
  top_nav_text: '#DEE5EE',
  categories: ['dark', 'brand'],
  likes: 0,
  submittedBy: 'Ryan Parag',
  created: 1608255573
}
```

Now let's take a look on how to use and insert this data inside Google's Cloud Firestore. If you've never used Firebase/Firestore, you would first have to create a new project before setting up a database inside the project. [Here's a step-by-step tutorial on the setup](https://www.youtube.com/watch?v=3ZEz-iposj8)

After you've created a new project, we would need to enable Cloud Firestore as a databse. Here's a quick glance at mine, along with the how we would structure our data (collections and documents):

![Data inside Firestore](../static/designing-an-app-for-slack-themes_2.png)

Firestore gives us a few functions to add/edit/delete themes (documents) that we'll use across our app.

Example functions:
```js
// Add an item to a collection
const addTheme = (Theme) => {
  firebase.firestore()
    .collection(YourCollection)
    .doc(Theme.Id)
    .set(Theme)
}
```

```js
// Delete an item from a collection
const deleteTheme = (Theme) => {
  firebase.firestore()
    .collection(YourCollection)
    .doc(Theme.Id)
    .delete()
}
```

```js
// Update an item in a collection
const updateTheme = (Theme) => {
  firebase.firestore()
    .collection(YourCollection)
    .doc(Theme.Id)
    .update(Theme)
}
```

## Designing the App

Now that we have a place to store and grab our themes, we need to think about how we would design an easy-to-use interface for our stored themes.

What would each theme look like?

![Theme Item](../static/designing-an-app-for-slack-themes_3.png)

We can also let users copy the string of hex colors easily by clicking each theme card - where the user would subsequently paste into Slack and click the button that Slack generates to switch themes.

### Filtering and Sorting

How do we expect users to find themes that fits into their exploring criteria? Would they be searching for dark themes? Or purple themes? Would they be expecting to sort alphabetically or by which themes are most popular?

Since each theme has a set of groups/categories, we can build sets of filters and sorting mechanisms to make the UI for theme browsing flexible.

![Sorting](../static/designing-an-app-for-slack-themes_4.png)

In order to get our group filtering to work with our data in Firestore, we'll need to build a few indexes - these will help get our complex data query really fast:

![Firestore Indexes](../static/designing-an-app-for-slack-themes_5.png)

### Designing for Low Data

How do we design an app for users who may not have the fastest internet or may have a lesser-performing device?

To help lessen the load from the browser and network connection, we can limit how much data we pull with our Firestore query. Here's what that query looks like in `React`:

```js
  const [loadedThemes, setLoadedThemes] = useState([]) // initial array of themes
  const [sort, setSort] = useState('theme_name') // initial sorting (by theme_name or likes)
  const [order, setOrder] = useState('asc') // initial sort order
  const [queryAmount, setQueryAmount] = useState(27) // initial amount of themes

  firebase.firestore().collection('themes').limit(queryAmount).orderBy(sort, order).onSnapshot(snapshot => {
    const fetchedThemes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    setLoadedThemes(fetchedThemes)
  })
```

We can let users look at the next set of data by creating a button that increments the query limit:

![Update Query Limit](../static/designing-an-app-for-slack-themes_10.png)

```js
  const updateQueryAmount = () => {
    setQueryAmount(prev => prev + 27)
  }

  ...

  <button
    onClick={updateQueryAmount}
  >
    Show me more
  </button>
```

So we've finished our storage, design, and data transformation - let's take a look at what we have:

![Exploring Themes](../static/designing-an-app-for-slack-themes_6.png)

### Designing Options

On top of letting users browse and copy Slack themes, I wanted to give users a way to fine tune the listed themes to better fit how they would like to visualize them:

- Toggle the intrusive __Top Nav Bg__ color to help make each theme a bit more minimal
- Toggle the __Theme Name__ in the copied theme (this would help label the theme when pasting to a thread)

Let's design a space where users may toggle those settings:

![Settings](../static/designing-an-app-for-slack-themes_7.png)

### Collecting Submissions

What if a user has a great idea for a theme and wants to add it to our list?

Why don't we design a way for a user to easily submit a theme through our web app? We'll need to ask the user for a few things:

- What colors are in your theme?
- What do you want to call your theme?
- Let us know who you are - to give you credit, of course

![Theme Form](../static/designing-an-app-for-slack-themes_8.png)

Once submitted, we can add this to another Firestore collection (called __submitted__) in order to await our verification (we'll go over that a bit later).

### Building Engagement

Besides giving users the ability to upvote themes, we can also list a few of the most recently submitted themes:

![Success State](../static/designing-an-app-for-slack-themes_9.png)

----------------------------
> All done! or are we?

## Behind the Scenes

I don't want to have to manage theme submissions or editing through Firestore or by pushing new code. If we have all of our data in Firestore, we could design an easier way to update this data through our web app - all hidden behind some user authentication.

### What would a scenario for this look like?

1. User submits a new theme via our new theme submission form
2. Theme gets added to our __submitted__ collection in Firestore
3. I have to go into Firestore and manually move new theme from __submitted__ to __themes__ collection

Rather than do this in Firestore and entering this theme into the __themes__ collection manually, we could setup a todo list of sorts in an Admin page on our website.

To do this, I used:
- Firebase Auth: authenticate our admin logins
- Nookies: create authenticate tokens for server-side apps

### Login Page

We need a space for admins to login to the admin dashboard. Instead of walking through each step of setting up __firebase/auth__ and __nookies__, [here's a tutorial you can follow to do just that](https://www.youtube.com/watch?v=qBGAdenirbs).

![Login](../static/designing-an-app-for-slack-themes_11.png)

### Dashboard

Once logged in, what do need to display and how do we display to build context around our scenario?

We basically need a way to manage the different collections in our database, so why don't we build a simple navigation separating them?

![Dashboard](../static/designing-an-app-for-slack-themes_12.png)

From the image above, it seems as though there's a theme submission awaiting to be verified. We can view the submission as well as associate any groups we feel are suitable for the respective theme:

![Theme Submission](../static/designing-an-app-for-slack-themes_13.png)

Once we make any edits, we can click *Verify & Transfer* to move the submission from our __submitted__ collection to our __themes__ collection.

-----------------

## That's it, for now

This is as far as I've made it, but now that we have our data in Firestore, my next objective is to design an experience for an integrated Slack app - rather than copy/paste themes, we could give users the ability to get a theme directly from a */* command!

I didn't delve too much into the code or design here, but if you have questions, feel free to look at the [repo on GitHub](https://github.com/ryan-parag/slack-themes) or contact me using the details below!