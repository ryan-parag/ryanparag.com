const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {
  if(req.method === 'POST') {

    const theme = req.body.submitted

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_THEMES_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: theme.name,
              },
            },
          ],
        },
        Grey900: {
          rich_text: [
            {
              text: {
                content: theme.grey900,
              },
            },
          ],
        },
        Grey800: {
          rich_text: [
            {
              text: {
                content: theme.grey800,
              },
            },
          ],
        },
        Grey700: {
          rich_text: [
            {
              text: {
                content: theme.grey700,
              },
            },
          ],
        },
        Grey600: {
          rich_text: [
            {
              text: {
                content: theme.grey600,
              },
            },
          ],
        },
        Grey500: {
          rich_text: [
            {
              text: {
                content: theme.grey500,
              },
            },
          ],
        },
        Grey400: {
          rich_text: [
            {
              text: {
                content: theme.grey400,
              },
            },
          ],
        },
        Grey300: {
          rich_text: [
            {
              text: {
                content: theme.grey300,
              },
            },
          ],
        },
        Grey200: {
          rich_text: [
            {
              text: {
                content: theme.grey200,
              },
            },
          ],
        },
        Grey100: {
          rich_text: [
            {
              text: {
                content: theme.grey100,
              },
            },
          ],
        },
        Grey0: {
          rich_text: [
            {
              text: {
                content: theme.grey0,
              },
            },
          ],
        },
        Transparent: {
          rich_text: [
            {
              text: {
                content: theme.transparent,
              },
            },
          ],
        },
        Primary: {
          rich_text: [
            {
              text: {
                content: theme.primary,
              },
            },
          ],
        },
        PrimaryTransparent: {
          rich_text: [
            {
              text: {
                content: theme.primaryTransparent,
              },
            },
          ],
        },
        PrimaryDark: {
          rich_text: [
            {
              text: {
                content: theme.primaryDark,
              },
            },
          ],
        },
        Secondary: {
          rich_text: [
            {
              text: {
                content: theme.secondary,
              },
            },
          ],
        },
        SecondaryTransparent: {
          rich_text: [
            {
              text: {
                content: theme.secondaryTransparent,
              },
            },
          ],
        },
        SecondaryDark: {
          rich_text: [
            {
              text: {
                content: theme.secondaryDark,
              },
            },
          ],
        },
        Tertiary: {
          rich_text: [
            {
              text: {
                content: theme.tertiary,
              },
            },
          ],
        },
        TertiaryTransparent: {
          rich_text: [
            {
              text: {
                content: theme.tertiaryTransparent,
              },
            },
          ],
        },
        TertiaryDark: {
          rich_text: [
            {
              text: {
                content: theme.tertiaryDark,
              },
            },
          ],
        },
        Likes: {
          number: 1,
        },
      }
    })
  
    res.status(201).json(theme)
  }
}