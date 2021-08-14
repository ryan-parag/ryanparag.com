const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {
  if(req.method === 'POST') {

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: req.body.portfolio.name,
              },
            },
          ],
        },
        Portfolio: {
          url: req.body.portfolio.link
        },
        Likes: {
          number: req.body.portfolio.likes
        },
        Password: {
          checkbox: req.body.portfolio.password
        },
        Verified: {
          checkbox: false
        },
        Description: {
          rich_text: [
            {
              text: {
                content: req.body.portfolio.description,
              },
            },
          ],
        },
      }
    })
  
    res.status(201).json(req.body.portfolio)

  } else {
    const response = await notion.databases.query({ 
      database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID,
    });
  
    const portfolios = {
      verified:[],
      waiting: []
    }
  
    response.results.map(item => {
      if(item.properties.Verified.checkbox) {
        portfolios.verified.push({
          id: item.id,
          name: item.properties.Name.title[0].plain_text,
          description: item.properties.Description.rich_text[0].plain_text,
          password: item.properties.Password.checkbox,
          link: item.properties.Portfolio.url,
          likes: item.properties.Likes.number,
          created: item.created_time
        })
      } else {
        portfolios.waiting.push({
          id: item.id,
          name: item.properties.Name.title[0].plain_text,
          description: item.properties.Description.rich_text[0].plain_text,
          password: item.properties.Password.checkbox,
          link: item.properties.Portfolio.url,
          likes: item.properties.Likes.number,
          created: item.created_time
        })
      }
    })

    portfolios.verified.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
    portfolios.waiting.sort((a, b) => (a.created > b.created) ? -1 : 1)
  
    res.status(200).json({ portfolios });
  }
}