const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req,res) => {
  if(req.method === 'POST') {

  } else {
    const response = await notion.databases.query({ 
      database_id: process.env.NOTION_AMA_DATABASE_ID,
    });
  
    const questions = {
      answered:[],
      waiting: []
    }
  
    response.results.map(item => {
      if(item.properties.Verified.checkbox) {
        questions.answered.push({
          id: item.id,
          question: item.properties.Question.title[0].plain_text,
          answer: item.properties.Answer.rich_text[0].plain_text,
          likes: item.properties.Likes.number,
          created: item.created_time,
          edited: item.last_edited_time
        })
      } else {
        questions.waiting.push({
          id: item.id,
          question: item.properties.Question.title[0].plain_text,
          created: item.created_time,
          edited: item.last_edited_time,
          likes: item.properties.Likes.number,
        })
      }
    })
  
    res.status(200).json({ questions });
  }
}