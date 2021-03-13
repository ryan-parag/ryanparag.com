import AirtablePlus from 'airtable-plus'

export default async (req, res) => {

  const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'now'
  });

  const items = await airtable.read({
    sort: [{field: 'Modified', direction: 'desc'}]
  });

  const now = {
    working: [],
    building: [],
    playing: [],
    reading: []
  }

  items.map(item => {
    switch (item.fields.Type) {
      case 'Working':
        now.working.push(item.fields)
        break;
      case 'Building':
        now.building.push(item.fields)
        break;
      case 'Reading':
        now.reading.push(item.fields)
        break;
      default:
        now.playing.push(item.fields)
    }
  })

  const lastModified = items[1].fields.Modified

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ lastModified, now });
};