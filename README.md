### To execute the backend, follow these steps:

Navigate to the "backend-code" directory.
Run the following command:
node src/exchange.js

### Once the backend is running, proceed to start the frontend:

Navigate to the "challenge-code" directory.
Run the following command:
npm run dev

### In tackling the Secret Santa challenge, my approach was straightforward yet effective, focusing on the utilization of familiar technologies and practical solutions to address the specified constraints. While acknowledging areas where further optimization could have been beneficial, my primary objective was to deliver a functional and reliable solution within the allotted timeframe.

### Frontend Structure:
I chose to build the frontend using React, a widely adopted JavaScript library known for its simplicity and efficiency in building user interfaces. By structuring the frontend components using React's component-based architecture, I aimed to streamline the user experience and provide a seamless interface for participants to interact with the Secret Santa platform. Also Redux to persist de User data.

### Backend Architecture:
For the backend infrastructure, I selected Express.js, a lightweight and flexible web application framework for Node.js. Leveraging Express.js, I developed a RESTful API to handle incoming requests, manage data operations, and enforce business logic related to Secret Santa assignments. While the backend implementation was straightforward, it provided the necessary functionality to support the frontend application effectively.

### Data Management:
In managing user data and Secret Santa assignments, I utilized Firebase Firestore, a NoSQL cloud database provided by Google. Firestore's real-time synchronization capabilities and scalability made it an ideal choice for my application's data storage needs. By structuring the database schema to accommodate user profiles, family relationships, and assignment history, I ensured efficient data management and seamless integration with the frontend and backend components.

### Immediate Family Exclusion:
To address the exclusion of immediate family members from selecting each other as Secret Santas, I introduced a simple yet effective solution within the database schema. By establishing family groups and maintaining relationships between users, I enforced constraints that prevented intra-family assignments, promoting fairness and impartiality in the gift exchange process.

### Generation Algorithm:
My solution incorporated a basic assignment algorithm designed to randomly select Secret Santas for each participant while adhering to the specified constraints. Although the algorithm provided satisfactory results, opportunities for improvement existed in terms of optimizing assignment logic and enhancing fairness in the selection process.

### Colections

This data structure to organize and store information efficiently and coherently, allowing easy access and manipulation of data related to participants, Secret Santa assignments, and families.

Users Collection:
Stores detailed information about each participant, 
including their name, email, and family affiliation. 
This collection enables us to manage users and their roles within the system, as well as identify familial relationships between them.
Field	Description
#### Document ID	Unique identifier for the user document.
#### email	Email address of the user.
#### generation	Generation of the user within the application.
#### dUniqueFamily	Unique identifier for the family used internally.
#### id_unique_family	Unique identifier for the family.
#### id_user	ID of the user.
#### lastName	Last name of the user.
#### last_name	Last name of the user.
#### name	First name of the user.
#### role	Role of the user (e.g., user).
Santa_gift Collection:
Records Secret Santa assignments, indicating who should buy a gift for whom. 
Each document in this collection represents a unique assignment and includes information such as participant IDs and the assignment's status.
This allows us to maintain a record of past assignments and ensure that each participant receives a unique gift.
Field	Description
#### Document ID	Unique identifier for the assignment document.
#### id_exchange	Unique identifier for the gift exchange.
#### id_participant1	ID of the first participant.
#### id_participant2	ID of the second participant.
#### status	Status of the assignment (e.g., pending).
#### year	Year of the assignment.
Family Collection: 
Contains details about the families participating in the Secret Santa gift exchange.
This collection helps us group participants based on their familial relationships, making it easier to apply constraints such as preventing members of the same family from selecting each other as Secret Santas.
Field	Description
#### Document ID	Unique identifier for the family document.
#### generation	Generation of the family within the application.
#### id_unique_family	Unique identifier for the family.
#### last_name	Last name of the family.  
