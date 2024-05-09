const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const bodyParser = require('body-parser')
var serviceAccount = require("../src/bettercloud-santa-firebase-adminsdk-5z483-873a30a1a6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });


const db = admin.firestore();

const app = express();
const port = process.env.PORT || 5000; 
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json())
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/pairings', async (req, res) => {
    try {
        const { id_participant1, id_participant2 } = req.body;

        // Verificar si los IDs de los participantes están presentes
        if (!id_participant1 || !id_participant2) {
            return res.status(400).send('Se requieren los IDs de los participantes.');
        }

        // Consultar la base de datos para verificar si uno de los participantes ya es Santa en el mismo año
        const existingPairing = await db.collection('santa_gift')
            .where('year', '==', new Date().getFullYear())
            .where('id_participant1', '==', id_participant1)
            .get();

        // Verificar si ya existe una asignación para id_participant1 en el mismo año
        if (!existingPairing.empty) {
            return res.status(200).send('El primer participante ya ha sido asignado como Santa en este año.');
        }

        // Crear la asignación de intercambio de regalos
        const pairing = {
            id_exchange: id_participant1 + id_participant2 + "Exchange_2", 
            id_participant1: id_participant1,
            id_participant2: id_participant2,
            year: new Date().getFullYear(),
            status: 'pending'
        };

        // Agregar la asignación a la base de datos
        await db.collection('santa_gift').add(pairing);

        res.status(201).send('Asignación de intercambio de regalos generada exitosamente.');
    } catch (error) {
        console.error('Error al generar la asignación de intercambio de regalos:', error);
        res.status(500).send('Error al generar la asignación de intercambio de regalos.');
    }
});


app.get('/users', async (req, res) => {
    try {
      const users = await getUsersFromDatabase(); 
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
      const users = await getUsersFromDatabase();
  
      const querySnapshot = await db.collection('santa_gift').get();
  
      const assignments = [];
      for (const doc of querySnapshot.docs) {
        const assignmentData = doc.data();
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
      const users = await getgiftsFromDatabase(); 
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching Santa gift assignments:', error);
      res.status(500).send('Error fetching Santa gift assignments');
    }
  });
  
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
