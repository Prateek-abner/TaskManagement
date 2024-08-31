// app/dashboard/page.js
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';

const DashboardPage = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) {
      window.location.href = '/auth/login'; // Redirect to login if not authenticated
    } else {
      // Fetch tasks (mocked here)
      setTasks([{ id: 1, name: 'Sample Task' }]);
    }
  }, [user]);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;
