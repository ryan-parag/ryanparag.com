import { notionLight, notionDark, darkTheme, lightTheme, hyrule, zora, gerudo, hebra, eldin, sheikah, korok, yiga } from '@components/Theme/'

const handler = (req, res) => {

  const themes = [notionLight, notionDark, darkTheme, lightTheme, hyrule, zora, gerudo, hebra, eldin, sheikah, korok, yiga]
  return res.json({ themes });
};
export default handler;