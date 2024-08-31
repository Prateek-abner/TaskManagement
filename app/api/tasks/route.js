// app/api/tasks/route.js

export async function GET() {
    // Mock data
    const data = {
      asanaTasks: [{ id: '1', name: 'Task 1' }, { id: '2', name: 'Task 2' }],
      todoistTasks: [{ id: '3', name: 'Task 3' }],
      prioritizedTasks: ['Task 1', 'Task 3'],
      recommendations: ['Task 2']
    };
  
    return new Response(JSON.stringify(data), { status: 200 });
  }
  