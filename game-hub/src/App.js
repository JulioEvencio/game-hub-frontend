import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Logout from './pages/logout/Logout';
import Login from './pages/login/Login';

function App() {
	const { tokenContext } = useAuthContext()

	return (
		<div className="App">
			<BrowserRouter>
				<Header />

				<main>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/profile' element={(tokenContext != null) ? <Profile /> : <Login />} />
						<Route path='/logout' element={(tokenContext != null) ? <Logout /> : <Login />} />
						<Route path='/Login' element={(tokenContext == null) ? <Login /> : <Profile />} />
						<Route path='/register' element={(tokenContext == null) ? <Register /> : <Profile />} />
					</Routes>
				</main>

				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
