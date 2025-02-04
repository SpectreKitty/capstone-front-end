import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGameUI } from '../../contexts/GameUIContext';
import '../../styles/Login.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const { login, register, signInAnonymously } = useAuth();
  const { showError } = useGameUI();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const result = isRegistering
      ? await register(email, password)
      : await login(email, password);
    
    if (!result.success) {
      showError(result.error);
    }
  };

  const handleAnonymousSignIn = async () => {
    const result = await signInAnonymously();
    if (!result.success) showError(result.error);
  };
  
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className='form-title'>{isRegistering ? 'Register' : 'Login'}</h2>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            id='password'
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required 
          />
        </div>
        <button 
          type='submit'  
          className='login-button'
          id="submit-button"
          name="submit-button"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <div className="auth-divider">or</div>
        <button
          type='button'
          className='anonymous-button'
          id="anonymous-button"
          name="anonymous-button"
          onClick={handleAnonymousSignIn}
        >
          Play Anonymously
        </button>	
        <button
          type='button'
          className='switch-button'
          name="switch-mode-button"
          id="switch-mode-button"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? 'Already have an account? Login'
            : 'Need an account? Register'}
        </button>
      </form>
    </div>
  );
}