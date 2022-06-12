const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {

  let results = []

  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_WORDLE,
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  results = [...response.results]

  while(response.has_more) {
    let data = await notion.databases.query({ 
      database_id: process.env.NOTION_WORDLE,
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
      start_cursor: response.next_cursor,
    });

    results = [...results, ...data.results]
  }

  const wordles = []

  res.status(200).json({ response });
}