const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {
  if(req.method === 'POST') {

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_AMA_DATABASE_ID,
      },
      properties: {
        Question: {
          title: [
            {
              text: {
                content: req.body.message.text,
              },
            },
          ],
        },
        Answer: {
          rich_text: [
            {
              text: {
                content: '',
              },
            },
          ],
        },
        Likes: {
          number: 1,
        },
      }
    })
  
    res.status(201).json(req.body.message)
  }
}