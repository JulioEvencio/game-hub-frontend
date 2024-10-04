import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Home from './pages/home/Home';
import Register from './pages/register/Register';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />

				<main>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</main>

				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
