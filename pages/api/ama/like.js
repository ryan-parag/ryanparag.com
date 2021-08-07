const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {
  if(req.method === 'POST') {
    const pageId = req.body.likeMessage.pageId
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        'Likes': {
          number: req.body.likeMessage.likes,
        },
      },
    });
  
    res.status(201).json(req.body.likeMessage)
  }
}