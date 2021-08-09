const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {

  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_DATABASE_ID,
  });

  const now = {
    working: [],
    building: [],
    playing: [],
    reading: []
  }

  response.results.map(item => {

    const lineItem = {
      id: item.id,
      last_edited: item.last_edited_time,
      title: item.properties.Name.title[0].plain_text,
      description: item.properties.Description.rich_text[0].plain_text
    }

    switch (item.properties.Tags.select.name) {
      case 'Working':
        now.working.push(lineItem)
        break;
      case 'Building':
        now.building.push(lineItem)
        break;
      case 'Reading':
        now.reading.push(lineItem)
        break;
      default:
        now.playing.push(lineItem)
    }
  })

  res.status(200).json({ now });
}