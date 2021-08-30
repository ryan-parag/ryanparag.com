const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {

  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_THEMES_DATABASE_ID,
  });

  const themes = []

  response.results.map(item => {
    themes.push({
      id: item.id,
      created: item.created_time,
      likes: item.properties.Likes.number,
      name: item.properties.Name.title[0].text.content,
      grey900: item.properties.Grey900.rich_text[0].plain_text,
      grey800: item.properties.Grey800.rich_text[0].plain_text,
      grey700: item.properties.Grey700.rich_text[0].plain_text,
      grey600: item.properties.Grey600.rich_text[0].plain_text,
      grey500: item.properties.Grey500.rich_text[0].plain_text,
      grey400: item.properties.Grey400.rich_text[0].plain_text,
      grey300: item.properties.Grey300.rich_text[0].plain_text,
      grey200: item.properties.Grey200.rich_text[0].plain_text,
      grey100: item.properties.Grey100.rich_text[0].plain_text,
      grey0: item.properties.Grey0.rich_text[0].plain_text,
      transparent: item.properties.Transparent.rich_text[0].plain_text,
      primary: item.properties.Primary.rich_text[0].plain_text,
      secondary: item.properties.Secondary.rich_text[0].plain_text,
      tertiary: item.properties.Tertiary.rich_text[0].plain_text,
      primaryTransparent: item.properties.PrimaryTransparent.rich_text[0].plain_text,
      secondaryTransparent: item.properties.SecondaryTransparent.rich_text[0].plain_text,
      tertiaryTransparent: item.properties.TertiaryTransparent.rich_text[0].plain_text,
      primaryDark: item.properties.PrimaryDark.rich_text[0].plain_text,
      secondaryDark: item.properties.SecondaryDark.rich_text[0].plain_text,
      tertiaryDark: item.properties.TertiaryDark.rich_text[0].plain_text
    })
  })

  res.status(200).json({ themes });
}