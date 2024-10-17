// src/pages/api/businesses.js
import formidable from 'formidable';

// Enable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }
      // Process your form data here
      console.log('Fields:', fields);
      console.log('Files:', files);
      
      // Here you can save the data to your database

      return res.status(200).json({ message: 'Business listed successfully!' });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
