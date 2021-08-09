import cookie from "cookie"
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req, res) => {

  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_AUTH_DATABASE_ID,
  });

  const sites = []

  response.results.map(item => {
    if(item.properties.Site.title[0].plain_text === 'ryanparag.com') {
      sites.push({
        pass: item.properties.Pass.rich_text[0].plain_text
      })
    }
  })

  if(req.body.token === sites[0].pass) {
    res.setHeader("Set-Cookie", cookie.serialize("token", process.env.AUTH_STRING, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: '/'
    }))
    res.status(200);
    res.json({ success: true })
  } else {
    res.setHeader("Set-Cookie", cookie.serialize("token", "error", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: '/'
    }))
    res.status(200);
    res.json({ success: true })
  }
}