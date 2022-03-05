const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {
  if(req.method === 'POST') {

    let today = new Date()

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_WORDLE,
      },
      properties: {
        Result: {
          title: [
            {
              text: {
                content: req.body.message.result,
              },
            },
          ],
        },
        Date: {
          type: "date",
          date: {
            start: today.toISOString(),
            end: null,
            time_zone: 'EST'
          }
        },
      }
    })
  
    res.status(201).json(req.body.message)
  }
}