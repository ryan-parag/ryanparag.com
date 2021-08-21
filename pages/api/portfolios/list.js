const { Client } = require('@notionhq/client');
const mail = require('@sendgrid/mail');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const triggerEmail = (data) => {
  mail.setApiKey(process.env.SENDGRID_API_KEY);

  const message = {
    to: 'parag.ryan@gmail.com',
    from: 'parag.ryan@gmail.com',
    subject: `New portfolio added`,
    text: data.portfolio.name,
    html: data.portfolio.name,
  };

  mail.send(message)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

export default async (req,res) => {
  if(req.method === 'POST') {

    const getTags = () => {
      const tags = []
      req.body.portfolio.tags.map(item => {
        tags.push({ name: item })
      })

      return tags
    }

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
          number: 1
        },
        Password: {
          checkbox: req.body.portfolio.password
        },
        Verified: {
          checkbox: false
        },
        Tags: {
          multi_select: getTags()
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

    triggerEmail(req.body)
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

      const getTags = () => {
        const items = []

        if(item.properties.Tags.multi_select.length > 0) {
          item.properties.Tags.multi_select.map(tag => {
            items.push(tag.name)
          })
        }

        return items
      }

      const data = {
        id: item.id,
        name: item.properties.Name.title[0].plain_text,
        description: item.properties.Description.rich_text[0].plain_text,
        password: item.properties.Password.checkbox,
        link: item.properties.Portfolio.url,
        likes: item.properties.Likes.number,
        created: item.created_time,
        tags: getTags()
      }
      if(item.properties.Verified.checkbox) {
        portfolios.verified.push(data)
      } else {
        portfolios.waiting.push(data)
      }
    })

    portfolios.verified.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
    portfolios.waiting.sort((a, b) => (a.created > b.created) ? -1 : 1)
  
    res.status(200).json({ portfolios });
  }
}