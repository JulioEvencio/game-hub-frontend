import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />

				<Routes>
					<Route path='/' />
				</Routes>

				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
