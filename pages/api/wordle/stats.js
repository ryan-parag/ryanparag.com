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

  function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
  }

  const getPrediction = (array, value) => {
    let count = 0;
    array.forEach((v) => (v === value && count++));
    const prediction = count/array.length
    return prediction;
  }

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
      prediction: getPrediction(parsed()[0], 'present') + getPrediction(parsed()[0], 'correct')
    })
  })

  const getWins = () => {
    const losses = []
    const wins = {
      loss: 0,
      guesses: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0
      },
      winPercentage: null,
      numOfMatches: null,
      average: null,
      prediction: null
    }

    const firstGuesses = []

    wordles.map(item => {
      if(item.eval === 'X') {
        losses.push(item)
      }
      switch (item.eval) {
        case 'X':
          wins.loss++
          break;
        case '6':
          wins.guesses.six++
          break;
        case '5':
          wins.guesses.five++
          break;
        case '4':
          wins.guesses.four++
          break;
        case '3':
          wins.guesses.three++
          break;
        case '2':
          wins.guesses.two++
          break;
        case '1':
          wins.guesses.one++
          break;
        default:
          return ''
      }
      firstGuesses.push(item.prediction)
    })

    const reducer = (accumulator, curr) => accumulator + curr
    const prediction = firstGuesses.reduce(reducer)/firstGuesses.length

    const percentage = ((wordles.length - losses.length)/wordles.length) * 100 + '%'
    wins.winPercentage = percentage
    wins.numOfMatches = wordles.length
    wins.average = (((wins.guesses.one*1) + (wins.guesses.two*2) + (wins.guesses.three*3) + (wins.guesses.four*4) + (wins.guesses.five*5) + (wins.guesses.six*6)) / wins.numOfMatches).toFixed(2)
    wins.lastDate = wordles[0].date
    wins.firstDate = wordles[wordles.length - 1].date
    wins.prediction = (prediction * 5).toFixed(2)

    return wins
  }

  const stats = getWins()

  res.status(200).json({ stats });
}