import { lightTheme } from '@components/Theme/'

const handler = (req, res) => {
  return res.json({ lightTheme });
};
export default handler;