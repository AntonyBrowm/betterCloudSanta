import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/pairings';
import { SantaAssignments } from "../../components/santaAssigment/component";
import { GiftExchangeForm } from '../../components/newAssigment/component';
import './styles.css';

export const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(Array.isArray(usersData) ? usersData : []);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <GiftExchangeForm users={users} />
      </div>
      <div>
        <SantaAssignments />
      </div>
    </>
  );
};

export default Home;
