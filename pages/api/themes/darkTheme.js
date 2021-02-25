import { darkTheme } from '@components/Theme/'

const handler = (req, res) => {
  return res.json({ darkTheme });
};
export default handler;