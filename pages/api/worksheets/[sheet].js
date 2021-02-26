import AirtablePlus from 'airtable-plus'

export default async (req, res) => {

  const {
    query: { sheet },
  } = req

  const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: sheet
  });

  const items = await airtable.read();

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ items });
};