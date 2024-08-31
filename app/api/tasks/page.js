// app/api/tasks/page.js
'use client'; // Mark this file as a client component

import { useUser } from '../../contexts/UserContext';
import OfflineModeIndicator from '../../components/OfflineModeIndicator';
import { useState, useEffect } from 'react';

function TaskPage() {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [prioritizedTasks, setPrioritizedTasks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data.asanaTasks.concat(data.todoistTasks));
        setPrioritizedTasks(data.prioritizedTasks);
        setRecommendations(data.recommendations);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Task Management</h1>
      <OfflineModeIndicator />
      {user ? <p>Welcome, {user.name}!</p> : <p>Please log in.</p>}
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => <li key={task.id}>{task.name}</li>)}
      </ul>
      <h2>Prioritized Tasks</h2>
      <ul>
        {prioritizedTasks.map((task, index) => <li key={index}>{task}</li>)}
      </ul>
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((recommendation, index) => <li key={index}>{recommendation}</li>)}
      </ul>
    </div>
  );
}

export default TaskPage;
