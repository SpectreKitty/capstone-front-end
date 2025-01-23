import { useState } from 'react';
import { useGameState } from '../../contexts/GameStateContext';
import '../../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const { login, register, signInWithGoogle, signInWithGithub, signInAnonymously } = useGameState();

  const handleSubmit = async(e) => {
		e.preventDefault();
		setError('');

		const result = isRegistering
			? await register(email, password)
			: await login(email, password);
		
		if (!result.success) {
			setError(result.error);
		}
  };

	const handleAnonymousSignIn = async () => {
		const result = await signInAnonymously();
		if (!result.success) setError(result.error);
	}
	
	return (
		<div className="login-container">
			<form onSubmit={handleSubmit} className="login-form">
				<h2 className='form-title'>{isRegistering ? ' Register' : 'Login'}</h2>
				{error && <div className="error-message">{error}</div>}
				<div className="form-group">
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Email'
						required/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						id='password'
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
						required />
				</div>
				<button 
					type='submit'  
					className='login-button'
					id="submit-button"
					name="submit-button">
					{isRegistering ? 'Register' : 'Login'}
				</button>
				<div className="auth-divider">or</div>
					<button
						type='button'
						className='anonymous-button'
						id="anonymous-button"
						name="anonymous-button"
						onClick={handleAnonymousSignIn}>
						Play Anonymously
					</button>	
				<button
					type='button'
					className='switch-button'
					name="switch-mode-button"
					id="switch-mode-button"
					onClick={() => setIsRegistering(!isRegistering)}>
						{isRegistering
							? 'Already have an account? Login'
							: 'Need an account? Register'}
					</button>
			</form>
		</div>
	)
}