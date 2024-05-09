import { useEffect, useState } from 'react';
import { getAllUsers, generateNewSantaGift } from '../../services/pairings';
import {SantaAssignments} from "../../components/santaAssigment/component";
import './styles.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser1, setSelectedUser1] = useState('');
  const [selectedUser2, setSelectedUser2] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleGenerateAssignments = async () => {
    try {
      if (!selectedUser1 || !selectedUser2) {
        console.error('Please select both users.');
        return;
      }
      
      const response = await generateNewSantaGift(selectedUser1, selectedUser2);
      console.log(response);
    } catch (error) {
      console.error('Error generating new Secret Santa assignments:', error);
    }
  };

  return (
    <><div>
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
      <button onClick={handleGenerateAssignments}>Generate Assignments</button>
    </div>
    <div>
        <SantaAssignments/>
    </div></>
  );
};

export default Home;


