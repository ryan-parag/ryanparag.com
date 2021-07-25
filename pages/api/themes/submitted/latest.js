import AirtablePlus from 'airtable-plus'

export default async (req, res) => {

  const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'themes'
  });

  const items = await airtable.read({
    sort: [{field: 'Date', direction: 'desc'}],
    maxRecords: 8
  });

  const latest = items[0].fields
  latest.length = 8

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ latest });
};