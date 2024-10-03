import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/footer/Footer';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' />
				</Routes>

				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
