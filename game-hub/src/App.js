import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { useAuthContext } from './hooks/useAuthContext'

import HeaderComponent from './components/header/HeaderComponent'
import FooterComponent from './components/footer/FooterComponent'

import HomePage from './pages/home/HomePage'
import GamePage from './pages/game/GamePage'
import RegisterPage from './pages/register/RegisterPage'
import ProfilePage from './pages/profile/ProfilePage'
import LogoutPage from './pages/logout/LogoutPage'
import LoginPage from './pages/login/LoginPage'
import PublishGamePage from './pages/publish_game/PublishGamePage'
import NotFoundPage from './pages/not_found/NotFoundPage'
import PasswordUpdatePage from './pages/password_update/PasswordUpdate'

function App() {
	const { authContext } = useAuthContext()

	return (
		<div className="App">
			<BrowserRouter>
				<HeaderComponent />

				<main>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/game/:slug' element={<GamePage />} />
						<Route path='/profile/password-update' element={authContext != null ? <PasswordUpdatePage /> : <LoginPage />} />
						<Route path='/profile' element={authContext != null ? <ProfilePage /> : <LoginPage />} />
						<Route path='/publish-game' element={authContext != null ? <PublishGamePage /> : <LoginPage />} />
						<Route path='/login' element={authContext == null ? <LoginPage /> : <ProfilePage />} />
						<Route path='/register' element={authContext == null ? <RegisterPage /> : <ProfilePage />} />
						<Route path='/logout' element={authContext != null ? <LogoutPage /> : <LoginPage />} />
						<Route path='/not-found' element={<NotFoundPage />} />
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				</main>

				<FooterComponent />
			</BrowserRouter>
		</div>
	);
}

export default App;
