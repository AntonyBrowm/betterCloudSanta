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
I chose to build the frontend using React, a widely adopted JavaScript library known for its simplicity and efficiency in building user interfaces. By structuring the frontend components using React's component-based architecture, I aimed to streamline the user experience and provide a seamless interface for participants to interact with the Secret Santa platform.

### Backend Architecture:
For the backend infrastructure, I selected Express.js, a lightweight and flexible web application framework for Node.js. Leveraging Express.js, I developed a RESTful API to handle incoming requests, manage data operations, and enforce business logic related to Secret Santa assignments. While the backend implementation was straightforward, it provided the necessary functionality to support the frontend application effectively.

### Data Management:
In managing user data and Secret Santa assignments, I utilized Firebase Firestore, a NoSQL cloud database provided by Google. Firestore's real-time synchronization capabilities and scalability made it an ideal choice for my application's data storage needs. By structuring the database schema to accommodate user profiles, family relationships, and assignment history, I ensured efficient data management and seamless integration with the frontend and backend components.

### Constraint Handling:
To enforce constraints such as preventing self-assignment and restricting repeat pairings within a three-year period, I implemented validation mechanisms within my API endpoints. While these validations were effective in ensuring compliance with the specified rules, further refinement could have been explored to enhance the robustness of the constraint handling logic.

### Immediate Family Exclusion:
To address the exclusion of immediate family members from selecting each other as Secret Santas, I introduced a simple yet effective solution within the database schema. By establishing family groups and maintaining relationships between users, I enforced constraints that prevented intra-family assignments, promoting fairness and impartiality in the gift exchange process.

### Generation Algorithm:
My solution incorporated a basic assignment algorithm designed to randomly select Secret Santas for each participant while adhering to the specified constraints. Although the algorithm provided satisfactory results, opportunities for improvement existed in terms of optimizing assignment logic and enhancing fairness in the selection process.
