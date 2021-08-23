---
title: 'Building a Community Website'
author: 'Ryan Parag'
description: 'Aggregating Slack groups and events in my local design community'
date: '2020-07-20'
hero_image: /static/building-a-community-website.png
---

A few weeks back (~ late June 2020), I was having trouble tracking down where I could join a few of the local design Slack communities in the Tampa Bay area. There wasn't a central location for me to see which communities were in the area and what events they had coming up.

So, I set out to quickly [build a website](https://tampabay.design) that would aggregate that data in a central location and help those in the area that were just starting out in design (or are not currently part of any of the communities) to join in on their discussions. 

I've been playing with Next.js and Styled Components lately and thought it would be a fun way to experiment with a few modern web tools. In this post, I'll quickly go over how I built it. We needed a few basic functions on the website:

- Show local design communities hosting events
- Post links to join the various local Slack communities
- Allow new, or not listed design communities, to submit their org to be listed
- Allow communities to submit events

Using `Next.js`, `Styled Components`, and Google Forms, I quickly spun up a small site that lists the major communities designers can join:

![Tampabay.design](../static/building-a-community-website_2.png)

Users can fill out the Google Form using the link to notify me about their organization to be listed,

With my limited knowledge as a non-dev, I also needed a way for communities to submit events to a database, but not list them until I can verify them. Some orgs are using Meetup, some using Eventbrite, and some using another event hosting site du jour.

I decided I would just grab all of the currently upcoming events and throw them in an Airtable doc:

![Airtable](../static/building-a-community-website_3.png)

By using Airtable, I could grab all upcoming events for all the communities in a single API call. After an event's date had passed, it would no longer be listed. I also included a column called _Verified_ to mark an event as verified and listed in the event list on the website.

If an event was unverified, I would receive a notification and a message on the website, letting me know to verify the event in Airtable, either on Airtable's website or mobile app - case closed 👏.

![Events](../static/building-a-community-website_4.png)

Hopefully that was helpful in case you want to do the same for your community, or even if you want to help contribute on [this website](https://github.com/TampaBayDesigners/tampabaydesigners). I'll keep updating this site with more features that could be helpful to other designers in the area, but if you have an idea, ping me using the form below - I'd love to hear about your ideas.