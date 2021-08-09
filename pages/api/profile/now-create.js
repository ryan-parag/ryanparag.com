const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {
  if(req.method === 'POST') {

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: req.body.message.title,
              },
            },
          ],
        },
        Description: {
          rich_text: [
            {
              text: {
                content: req.body.message.description,
              },
            },
          ],
        },
        Tags: {
          select: {
            name: req.body.message.type
          }
        },
      }
    })
  
    res.status(201).json(req.body.message)
  }
}