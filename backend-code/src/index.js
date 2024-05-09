const express = require('express');
const cors = require('cors'); // optional, for CORS
const admin = require('firebase-admin'); // Firebase Admin SDK
var serviceAccount = require("../src/bettercloud-santa-firebase-adminsdk-5z483-873a30a1a6.json");
// Initialize Firebase App (replace with your credentials)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

// Get Firestore instance
const db = admin.firestore();

const app = express();
const port = process.env.PORT || 5000; // Use environment variable or default port 3000
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
// Route for creating a new family
app.post('/families', async (req, res) => {
  try {
    const { name, generation = 1 } = req.body; // Extract data from request body

    // Validation (optional)
    if (!name) {
      return res.status(400).send('Missing required field: name');
    }

    // Generate a unique identifier for the family
    const familyId = db.collection('family').doc().id_unique_family;

    // Create a new family document in Firestore
    await db.collection('family').doc(familyId).set({
      id_unique_family: familyId,
      last_name: last_name,
      generation: generation,
    });

    res.status(201).send({ id_unique_family: familyId, name, generation }); // Send created family data
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating family');
  }
});

// Route for retrieving families (consider user roles)
app.get('/families', async (req, res) => {
  try {
    const families = [];
    const querySnapshot = await db.collection('family').get();
    querySnapshot.forEach((doc) => {
      families.push(doc.data());
    });

    // Implement role-based filtering (optional)
    // if (req.user.role === 'admin') {
    //   // Show all families
    // } else {
    //   // Show families based on user's family ID (logic needed)
    // }

    res.status(200).send(families);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving families');
  }
});

// Route for updating family details
app.put('/family/:familyId', async (req, res) => {
  try {
    const familyId = req.params.id_unique_family;
    const { name, generation } = req.body;

    // Validation (optional)
    if (!name) {
      return res.status(400).send('Missing required field: name');
    }

    // Update family document in Firestore
    await db.collection('family').doc(familyId).update({
      last_name: name,
      generation: generation, // Update generation if provided
    });

    res.status(200).send('Family details updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating family');
  }
});

// ... other routes (user registration, gift exchange pairing, etc.)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
