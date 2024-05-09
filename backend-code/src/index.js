const express = require('express');
const cors = require('cors'); 
const admin = require('firebase-admin'); 
var serviceAccount = require("../src/bettercloud-santa-firebase-adminsdk-5z483-873a30a1a6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });


const db = admin.firestore();

const app = express();
const port = process.env.PORT || 5000; 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.post('/families', async (req, res) => {
  try {
    const { name, generation = 1 } = req.body; 


    if (!name) {
      return res.status(400).send('Missing required field: name');
    }

  
    const familyId = db.collection('family').doc().id_unique_family;


    await db.collection('family').doc(familyId).set({
      id_unique_family: familyId,
      last_name: last_name,
      generation: generation,
    });

    res.status(201).send({ id_unique_family: familyId, name, generation }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating family');
  }
});


app.get('/families', async (req, res) => {
  try {
    const families = [];
    const querySnapshot = await db.collection('family').get();
    querySnapshot.forEach((doc) => {
      families.push(doc.data());
    });
    res.status(200).send(families);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving families');
  }
});


app.put('/family/:familyId', async (req, res) => {
  try {
    const familyId = req.params.id_unique_family;
    const { name, generation } = req.body;

    if (!name) {
      return res.status(400).send('Missing required field: name');
    }

   
    await db.collection('family').doc(familyId).update({
      last_name: name,
      generation: generation, 
    });

    res.status(200).send('Family details updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating family');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
