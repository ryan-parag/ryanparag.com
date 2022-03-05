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

    const evaulations = []
    const results = item.properties.Result.title[0].plain_text.split('\n').slice(1)

    const parsed = () => {
      const answers = []
      results.map(item => {

        const replaced = item.replace(/⬛/g, '0').replace(/🟨/g, '1').replace(/🟩/g, '2')

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
      eval: result.split('')[0]
    })
  })

  const losses = []
  const wins = {
    loss: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
    winPercentage: null,
    numOfMatches: null,
    average: null,
    firstDate: null,
    lastDate: null
  }

  const getWins = () => {
    const losses = []
    const wins = {
      loss: 0,
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      winPercentage: null,
      numOfMatches: null,
      average: null
    }

    wordles.map(item => {
      if(item.eval === 'X') {
        losses.push(item)
      }
      switch (item.eval) {
        case 'X':
          wins.loss++
          break;
        case '6':
          wins.six++
          break;
        case '5':
          wins.five++
          break;
        case '4':
          wins.four++
          break;
        case '3':
          wins.three++
          break;
        case '2':
          wins.two++
          break;
        case '1':
          wins.one++
          break;
        default:
          return ''
      }
    })

    const percentage = ((wordles.length - losses.length)/wordles.length) * 100 + '%'
    wins.winPercentage = percentage
    wins.numOfMatches = wordles.length
    wins.average = (((wins.one*1) + (wins.two*2) + (wins.three*3) + (wins.four*4) + (wins.five*5) + (wins.six*6)) / wins.numOfMatches).toFixed(2)
    wins.lastDate = wordles[0].date
    wins.firstDate = wordles[wordles.length - 1].date

    return wins
  }

  const stats = getWins()

  res.status(200).json({ stats });
}