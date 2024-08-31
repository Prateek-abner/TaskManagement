import { getAsanaTasks, completeAsanaTask } from './asana';
import { getTodoistTasks, closeTodoistTask } from './todoist';

export async function getTasksFromAllManagers() {
  const asanaTasks = await getAsanaTasks();
  const todoistTasks = await getTodoistTasks();
  return { asanaTasks, todoistTasks };
}

export async function completeTaskInManager(service, taskId) {
  if (service === 'asana') {
    return await completeAsanaTask(taskId);
  } else if (service === 'todoist') {
    return await closeTodoistTask(taskId);
  }
  throw new Error('Unsupported task manager');
}
