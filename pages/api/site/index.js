const { Octokit } = require("@octokit/rest")

export default async (req, res) => {

  const key = process.env.GITHUB_API_KEY
  const octokit = new Octokit({
    auth: key
  })

  const repoFetch = await octokit.request('/repos/ryan-parag/ryanparag.com')
  const repo = {
    link: repoFetch.data.html_url,
    updated: repoFetch.data.updated_at,
    name: repoFetch.data.name,
    owner: {
      avatar: repoFetch.data.owner.avatar_url,
      user: repoFetch.data.owner.login,
      link: repoFetch.data.owner.html_url
    }
  }
  
  return res.status(200).json({ repo })
}