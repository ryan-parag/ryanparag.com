const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {
  if(req.method === 'POST') {
    const pageId = req.body.message.id
    const response = await notion.pages.update({
      page_id: pageId,
      archived: req.body.message.delete,
      properties: {
        Question: {
          title: [
            {
              text: {
                content: req.body.message.title,
              },
            },
          ],
        },
        Answer: {
          rich_text: [
            {
              text: {
                content: req.body.message.description,
              },
            },
          ],
        },
        Likes: {
          number: req.body.message.likes
        },
        Verified: {
          checkbox: true
        }
      },
    });
  
    res.status(201).json(req.body.message)
  }
}