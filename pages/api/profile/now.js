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
    switch (item.properties.Tags.select.name) {
      case 'Working':
        now.working.push({
          last_edited: item.last_edited_time,
          title: item.properties.Name.title[0].plain_text,
          description: item.properties.Description.rich_text[0].plain_text
        })
        break;
      case 'Building':
        now.building.push({
          last_edited: item.last_edited_time,
          title: item.properties.Name.title[0].plain_text,
          description: item.properties.Description.rich_text[0].plain_text
        })
        break;
      case 'Reading':
        now.reading.push({
          last_edited: item.last_edited_time,
          title: item.properties.Name.title[0].plain_text,
          description: item.properties.Description.rich_text[0].plain_text
        })
        break;
      default:
        now.playing.push({
          last_edited: item.last_edited_time,
          title: item.properties.Name.title[0].plain_text,
          description: item.properties.Description.rich_text[0].plain_text
        })
    }
  })

  res.status(200).json({ now });
}