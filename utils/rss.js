import { Feed } from "feed";
var markdown = require( "markdown" ).markdown;

const baseUrl = "https://notes.ryanparag.com";

const date = new Date();

const feedObject = new Feed({
  title: `Ryan's Notes`,
  description: "Hello, I'm Ryan Parag - these are my notes about designing in the open and building thoughtful products.",
  id: baseUrl,
  link: baseUrl,
  language: "en",
  image: `${baseUrl}/notes-logo.svg`,
  favicon: `${baseUrl}/favicon.ico`,
  copyright: `All rights reserved ${date.getFullYear()}, Ryan Parag`,
  updated: date,
  generator: "Next.js using Feed for Node.js",
  feedLinks: {
    rss2: `${baseUrl}/rss/feed.xml`,
    json: `${baseUrl}/rss/feed.json`,
    atom: `${baseUrl}/rss/atom.xml`,
  },
});

export const addPosts = (posts) => {
  posts.forEach((post) => {
    const url = `${baseUrl}/notes/${post.slug}`;
    feedObject.addItem({
      title: post.frontmatter.title,
      slug: url,
      id: url,
      date: new Date(post.frontmatter.date),
      author: post.frontmatter.author,
      description: post.frontmatter.description,
      content: `<img src="${post.frontmatter.hero_image}"/>` + markdown.toHTML(post.markdownBody)
    });
  });

  //fs.mkdirSync('./public/feed', { recursive: true });
  //fs.writeFileSync('./public/feed/feed.xml', feedObject.rss2());
  //fs.writeFileSync('./public/feed/atom.xml', feedObject.atom1());
  //fs.writeFileSync('./public/feed/feed.json', feedObject.json1());

  return feedObject.rss2()
}