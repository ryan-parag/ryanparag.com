export default async (req,res) => {

  const {
    query: { year },
  } = req

  const response = await fetch(`https://ergast.com/api/f1/${year}.json`);
  const schedule = await response.json();
  const data = schedule.MRData.RaceTable

  const season = {
    season: data.season,
    races: []
  }

  data.Races.map(item => {
    const race = {
      name: item.raceName,
      track: item.Circuit.circuitName,
      race: item.round,
      date: item.date,
      time: item.time,
      country: item.Circuit.Location.country,
      city: item.Circuit.Location.locality
    }
    season.races.push(race)
  })

  res.status(200).json({ season });
}