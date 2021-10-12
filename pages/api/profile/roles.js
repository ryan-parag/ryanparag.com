const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {

  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_ROLE_DATABASE_ID,
  });

  const roles = {
    verified: []
  }

  response.results.map(item => {
    if(item.properties.Verified.checkbox) {
      roles.verified.push({
        id: item.id,
        company: item.properties.Company.title[0].plain_text,
        date: item.properties.Time.rich_text[0].plain_text,
        role: item.properties.Role.rich_text[0].plain_text,
        logo: item.properties.Icon.files[0].name,
        order: item.properties.Order.number,
        link: item.properties.Link.url
      })
    }
  })

  roles.verified.sort((a, b) => (parseFloat(a.order) > parseFloat(b.order)) ? -1 : 1)

  res.status(200).json({ roles });
}