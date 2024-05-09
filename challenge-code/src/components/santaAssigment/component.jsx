import { useEffect, useState } from 'react';
import { getSantaAssignments } from '../../services/pairings';
import './styles.css'; // Importar el archivo de estilos

export const SantaAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getSantaAssignments();
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching Santa gift assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="santa-assignments-container">
      <h1 className="santa-assignments-title">Santa Gift Assignments</h1>
      <ul className="santa-assignments-list">
        {assignments.map((assignment, index) => (
          <li key={index} className="santa-assignment-item">
            <span className="santa-assignment-label">Santa:</span> 
            <span className="santa-assignment-participant">{assignment.participant1}</span> 
            <span className="santa-assignment-arrow">to</span> 
            <span className="santa-assignment-participant">{assignment.participant2}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
