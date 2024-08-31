// app/auth/signup/page.js
import { useState } from 'react';

const SignupPage = () => {
  const [email, setEmail] = useState('');

  const handleSignup = () => {
    // Signup logic here
    window.location.href = '/auth/login'; // Redirect to login after signup
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default SignupPage;
