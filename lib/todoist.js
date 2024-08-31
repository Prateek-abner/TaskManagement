const TODOIST_API_URL = 'https://api.todoist.com/rest/v2/tasks';

export async function getTodoistTasks() {
  try {
    const response = await fetch(TODOIST_API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.TODOIST_API_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch Todoist tasks');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Todoist tasks:', error);
    return [];
  }
}

export async function closeTodoistTask(taskId) {
  try {
    const response = await fetch(`${TODOIST_API_URL}/${taskId}/close`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TODOIST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to close Todoist task');
    return true;
  } catch (error) {
    console.error('Error closing Todoist task:', error);
    return false;
  }
}
