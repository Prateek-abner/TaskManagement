// app/auth/login/page.js
import { useState } from 'react';
import { useUser } from '../../../contexts/UserContext';

const LoginPage = () => {
  const { login } = useUser();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    login({ email });
    window.location.href = '/dashboard'; // Redirect to dashboard after login
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
