const express = require('express');
const cors = require('cors'); // optional, for CORS
const admin = require('firebase-admin'); // Firebase Admin SDK

// Initialize Firebase App (replace with your credentials)
const firebaseConfig = {
  // ... your Firebase project credentials ...
};

admin.initializeApp(firebaseConfig);

// Get Firestore instance
const db = admin.firestore();

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port 3000
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// Route for user registration
app.post('/register', async (req, res) => {
  try {
    const { name, email, id_unique_family } = req.body; // Extract data from request body

    // Validation (optional)
    if (!name || !email || !id_unique_family) {
      return res.status(400).send('Missing required fields');
    }

    // Check if family exists (implement later)
    // ...

    // Create user document in Firestore
    const userRef = db.collection('users').doc();
    await userRef.set({
      id: userRef.id,
      name: name,
      last_name: last_name,
      email: email,
      id_unique_family: familyId,
      generation: generation,
      role: 'user',
    });

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
