const express = require('express');
const cors = require('cors'); // optional, for CORS
const admin = require('firebase-admin'); // Firebase Admin SDK
const bodyParser = require('body-parser')
var serviceAccount = require("../src/bettercloud-santa-firebase-adminsdk-5z483-873a30a1a6.json");
// Initialize Firebase App (replace with your credentials)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

// Get Firestore instance
const db = admin.firestore();

const app = express();
const port = process.env.PORT || 5000; // Use environment variable or default port 3000
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/pairings', async (req, res) => {
    try {
        // Obtener los IDs de los participantes del cuerpo de la solicitud
        const { id_participant1, id_participant2 } = req.body;

        // Verificar si los IDs de los participantes son válidos
        if (!id_participant1 || !id_participant2) {
            return res.status(400).send('Se requieren los IDs de los participantes.');
        }

        // Crear la asignación de intercambio de regalos
        const pairing = {
            id_exchange: id_participant1+id_participant2 + "Exchange_2", 
            id_participant1:id_participant1,
            id_participant2:id_participant2,
            year: new Date().getFullYear(),
            status: 'pending'
        };

        // Guardar la asignación en Firestore
        await db.collection('santa_gift').add(pairing);

        // Enviar respuesta de éxito
        res.status(201).send('Asignación de intercambio de regalos generada exitosamente.');
    } catch (error) {
        console.error('Error al generar la asignación de intercambio de regalos:', error);
        res.status(500).send('Error al generar la asignación de intercambio de regalos.');
    }
});
// En tu archivo de rutas en el backend (por ejemplo, routes.js)

// Ruta para obtener todos los usuarios
app.get('/users', async (req, res) => {
    try {
      // Aquí realizas la lógica para obtener todos los usuarios desde la base de datos
      // y los devuelves como respuesta
      const users = await getUsersFromDatabase(); // Implementa esta función para obtener los usuarios
      res.status(200).json(users);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).send('Error al obtener los usuarios.');
    }
  });
  const getUsersFromDatabase = async () => {
    try {
      const usersRef = db.collection('users');
      const snapshot = await usersRef.get();
      const users = [];
      snapshot.forEach(doc => {
        users.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return users;
    } catch (error) {
      console.error('Error fetching users from Firestore:', error);
      throw error;
    }
  };

  const getgiftsFromDatabase = async () => {
    try {
      // Obtener todos los usuarios
      const users = await getUsersFromDatabase();
  
      const querySnapshot = await db.collection('santa_gift').get();
  
      const assignments = [];
      for (const doc of querySnapshot.docs) {
        const assignmentData = doc.data();
  
        // Encontrar los nombres de los participantes en la lista de usuarios
        const participant1 = users.find(user => user.id_user === assignmentData.id_participant1);
        const participant2 = users.find(user => user.id_user === assignmentData.id_participant2);
  
        assignments.push({
          id: doc.id,
          participant1: participant1 ? `${participant1.name} ${participant1.last_name}` : 'Unknown',
          participant2: participant2 ? `${participant2.name} ${participant2.last_name}` : 'Unknown',
          year: assignmentData.year,
          status: assignmentData.status,
        });
      }
  
      return assignments;
    } catch (error) {
      console.error('Error fetching Santa gift assignments:', error);
      throw error;
    }
  };
  
  
  
  
  app.get('/santa_exchange', async (req, res) => {
    try {
      const users = await getgiftsFromDatabase(); // Implementa esta función para obtener los usuarios
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching Santa gift assignments:', error);
      res.status(500).send('Error fetching Santa gift assignments');
    }
  });
  
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
