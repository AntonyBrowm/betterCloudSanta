import { useState } from 'react';
import { generateNewSantaGift } from '../services/pairings';

const useSantaGiftGenerator = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleGenerateAssignments = async (selectedUser1, selectedUser2) => {
    try {
      if (!selectedUser1 || !selectedUser2) {
        console.error('Please select both users.');
        return;
      } 
      if(selectedUser1==selectedUser2){
        setSuccessMessage("Santa can't give gifts to himself");
        return;
      }
      const response = await generateNewSantaGift(selectedUser1, selectedUser2);
      console.log(response);
      setSuccessMessage(response);
      setTimeout(() => {
        window.location.reload(); 
      }, 2000);
    } catch (error) {
      console.error('Error generating new Secret Santa assignments:', error);
    }
  };

  return { handleGenerateAssignments, successMessage };
};

export default useSantaGiftGenerator;