const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {

  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_WORDLE,
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  const wordles = []

  response.results.map(item => {
    const firstLine = item.properties.Result.title[0].plain_text.split('\n')[0];
    const match = firstLine.split(' ')[1];
    const result = firstLine.split(' ')[2];
    const results = item.properties.Result.title[0].plain_text.split('\n').slice(1)

    const parsed = () => {
      const answers = []
      results.map(item => {

        const replaced = item.replace(/⬛/g, '0').replace(/⬜/g, '0').replace(/🟨/g, '1').replace(/🟩/g, '2')

        const guess = replaced.split('')

        const parsedGuess = []

        guess.map(a => {
          if(a === '0') {
            parsedGuess.push('absent')
          } else if(a === '1') {
            parsedGuess.push('present')
          } else if(a === '2') {
            parsedGuess.push('correct')
          }
        })

        answers.push(parsedGuess)
      })

      return answers
    }

    wordles.push({
      id: item.id,
      result: parsed(),
      date: item.properties.Date.date.start,
      matchNumber: match,
      eval: result.split('')[0],
      hardMode: firstLine.includes('*')
    })
  })

  res.status(200).json({ wordles });
}