'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [localTasks, setLocalTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [tasks, setTasks] = useState({ asanaTasks: [], todoistTasks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [voiceCommandActive, setVoiceCommandActive] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const addLocalTask = () => {
    if (taskInput.trim()) {
      const newTask = { text: taskInput.trim(), priority, dueDate };
      if (editingTask !== null) {
        const updatedTasks = localTasks.map((task, index) => 
          index === editingTask ? newTask : task
        );
        setLocalTasks(updatedTasks);
        setEditingTask(null);
      } else {
        setLocalTasks([...localTasks, newTask]);
      }
      setTaskInput('');
      setDueDate('');
      setPriority('low');
    }
  };

  const deleteLocalTask = (index) => {
    const updatedTasks = localTasks.filter((_, i) => i !== index);
    setLocalTasks(updatedTasks);
  };

  const editLocalTask = (index) => {
    setTaskInput(localTasks[index].text);
    setPriority(localTasks[index].priority);
    setDueDate(localTasks[index].dueDate);
    setEditingTask(index);
  };

  const completeTask = async (service, taskId) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, taskId }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete task');
      }

      const updatedTasks = await fetch('/api/tasks');
      const data = await updatedTasks.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredTasks = {
    asanaTasks: tasks.asanaTasks.filter(task => 
      filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'incomplete' && !task.completed)
    ),
    todoistTasks: tasks.todoistTasks.filter(task => 
      filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'incomplete' && !task.completed)
    )
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  // Organize tasks into columns based on priority
  const kanbanColumns = ['low', 'medium', 'high'];
  const columns = kanbanColumns.reduce((acc, priority) => {
    acc[priority] = localTasks.filter(task => task.priority === priority);
    return acc;
  }, {});

  // Toggle voice command activation
  const toggleVoiceCommand = () => {
    setVoiceCommandActive(!voiceCommandActive);
  };

  return (
    <main>
      <h1>AI Productivity Tool</h1>
      <h2>Task Dashboard</h2>

      <div>
        <h3>Add New Task</h3>
        <input 
          type="text" 
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a new task" 
        />
        <input 
          type="date" 
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addLocalTask}>
          {editingTask !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <div>
        <h3>Kanban Board</h3>
        {kanbanColumns.map(priority => (
          <div key={priority} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h4>{priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</h4>
            <div>
              {columns[priority].map((task, index) => (
                <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                  <p>{task.text}</p>
                  <p>Due: {task.dueDate}</p>
                  <button onClick={() => editLocalTask(index)}>Edit</button>
                  <button onClick={() => deleteLocalTask(index)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3>Voice Command</h3>
        <button onClick={toggleVoiceCommand}>
          {voiceCommandActive ? 'Deactivate Voice Command' : 'Activate Voice Command'}
        </button>
        {/* Integrate voice command functionality here */}
        {voiceCommandActive && <p>Voice command functionality is active.</p>}
      </div>

      <div>
        <h3>Asana Tasks</h3>
        <ul>
          {filteredTasks.asanaTasks.map((task, index) => (
            <li key={index}>
              {task.name}
              <button onClick={() => completeTask('asana', task.id)}>Complete</button>
            </li>
          ))}
        </ul>

        <h3>Todoist Tasks</h3>
        <ul>
          {filteredTasks.todoistTasks.map((task, index) => (
            <li key={index}>
              {task.content}
              <button onClick={() => completeTask('todoist', task.id)}>Complete</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
