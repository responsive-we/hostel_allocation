const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Papa = require('papaparse');
const fs = require('fs');
const allocateRooms = require('./allocator');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.post('/allocate', upload.fields([{ name: 'groupFile' }, { name: 'hostelFile' }]), (req, res) => {
  const groupFile = req.files['groupFile'][0];
  const hostelFile = req.files['hostelFile'][0];

  // Log the filenames and sizes of uploaded files
  console.log(`Uploaded Group File: ${groupFile.originalname} (${groupFile.size} bytes)`);
  console.log(`Uploaded Hostel File: ${hostelFile.originalname} (${hostelFile.size} bytes)`);

  try {
    const groupData = Papa.parse(fs.readFileSync(groupFile.path, 'utf8'), { header: true }).data.filter(group => group['Group ID']);
    const hostelData = Papa.parse(fs.readFileSync(hostelFile.path, 'utf8'), { header: true }).data.filter(hostel => hostel['Hostel Name']);

    console.log('Parsed Group Data:', groupData);
    console.log('Parsed Hostel Data:', hostelData);

    const allocation = allocateRooms(groupData, hostelData);

    console.log('Allocation:', allocation);

    res.json(allocation);
  } catch (error) {
    console.error('Error processing files:', error);
    res.status(500).json({ error: 'Error processing files' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
