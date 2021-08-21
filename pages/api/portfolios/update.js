const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {
  if(req.method === 'POST') {
    const pageId = req.body.portfolio.id

    const getTags = () => {
      const tags = []
      req.body.portfolio.tags.map(item => {
        tags.push({ name: item })
      })

      return tags
    }
    
    const response = await notion.pages.update({
      page_id: pageId,
      archived: req.body.portfolio.archived,
      properties: {
        Name: {
          title: [
            {
              text: {
                content: req.body.portfolio.name,
              },
            },
          ],
        },
        Portfolio: {
          url: req.body.portfolio.link
        },
        Password: {
          checkbox: req.body.portfolio.password
        },
        Likes: {
          number: req.body.portfolio.likes
        },
        Verified: {
          checkbox: req.body.portfolio.verified
        },
        Tags: {
          multi_select: getTags()
        },
        Description: {
          rich_text: [
            {
              text: {
                content: req.body.portfolio.description,
              },
            },
          ],
        },
      },
    });
  
    res.status(201).json(req.body.portfolio)
  }
}