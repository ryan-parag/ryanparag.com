import AirtablePlus from 'airtable-plus'

export default async (req, res) => {

  const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASE,
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'featured'
  });

  const featured = await airtable.read();

  const items = featured.map((item) => ({
    name: item.fields.Name,
    description: item.fields.Description,
    link: item.fields.Link,
    outbound: true
  }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ items });
};