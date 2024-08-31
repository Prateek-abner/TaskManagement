const ASANA_API_URL = 'https://app.asana.com/api/1.0';

export async function getAsanaTasks() {
  try {
    const response = await fetch(`${ASANA_API_URL}/tasks?opt_fields=name,due_on`, {
      headers: {
        Authorization: `Bearer ${process.env.ASANA_ACCESS_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch Asana tasks');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Asana tasks:', error);
    return [];
  }
}

export async function completeAsanaTask(taskId) {
  try {
    const response = await fetch(`${ASANA_API_URL}/tasks/${taskId}/complete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.ASANA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to complete Asana task');
    return true;
  } catch (error) {
    console.error('Error completing Asana task:', error);
    return false;
  }
}
