import VoiceCommandButton from '../components/VoiceCommandButton';

export default function HomePage() {
  const handleVoiceCommand = (command) => {
    if (command.includes('add task')) {
      alert('Voice command recognized: Add Task');
    } else if (command.includes('complete task')) {
      alert('Voice command recognized: Complete Task');
    }
    // Add more command handling here
  };

  return (
    <main>
      <h1>AI Productivity Tool</h1>
      <VoiceCommandButton onCommand={handleVoiceCommand} />
      {/* Other components... */}
    </main>
  );
}
