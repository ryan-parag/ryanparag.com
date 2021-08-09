const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {
  if(req.method === 'POST') {
    const pageId = req.body.message.id
    if(!req.body.message.deleteItem) {
      const response = await notion.pages.update({
        page_id: pageId,
        properties: {
          'Name': {
            title: [
              {
                text: {
                  content: req.body.message.title,
                },
              },
            ],
          },
        },
      });
    } else {
      const response = await notion.pages.update({
        page_id: pageId,
        archived: true
      });
    }
  
    res.status(201).json(req.body.message)
  }
}