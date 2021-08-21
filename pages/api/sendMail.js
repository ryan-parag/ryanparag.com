export default (req, res) => {
  if(req.method === 'POST') {
    const body = JSON.parse(req.body);
    console.log(body);
    res.status(200).json({ status: 'OK' });
  } else {
    res.status(200).json({ status: 'No email sent' });
  }
};