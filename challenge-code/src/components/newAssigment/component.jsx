import { useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes si aún no lo has hecho
import './styles.css'; 
import useSantaGiftGenerator from '../../utils/handle';

export const GiftExchangeForm = ({ users }) => {
  const [selectedUser1, setSelectedUser1] = useState('');
  const [selectedUser2, setSelectedUser2] = useState('');
  const { handleGenerateAssignments, successMessage } = useSantaGiftGenerator();

  const handleGenerate = () => {
    if (!selectedUser1 || !selectedUser2) {
      console.error('Please select both users.');
      return;
    }
    console.log(successMessage);
    handleGenerateAssignments(selectedUser1, selectedUser2);
  };

  return (
    <div className="gift-exchange-form">
      <h1>Generate New Santa Gift</h1>
      <select onChange={(e) => setSelectedUser1(e.target.value)} value={selectedUser1}>
        <option value="">Select User 1</option>
        {users.map((user) => (
          <option key={user.id_user} value={user.id_user}>{`${user.name} ${user.last_name}`}</option>
        ))}
      </select>
      <select onChange={(e) => setSelectedUser2(e.target.value)} value={selectedUser2}>
        <option value="">Select User 2</option>
        {users.map((user) => (
          <option key={user.id_user} value={user.id_user}>{`${user.name} ${user.last_name}`}</option>
        ))}
      </select>
      <button onClick={handleGenerate}>Generate Assignments</button>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

// Definir propTypes para las props del componente
GiftExchangeForm.propTypes = {
  users: PropTypes.array.isRequired,
};
