import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { useState } from 'react';

function App() {
	const [show, setShow] = useState(false);
	return (
		<div className='App'>
			<Header />
			{show ? (
				<CreateCourse setShow={setShow} />
			) : (
				<Courses setShow={setShow} />
			)}
		</div>
	);
}

export default App;
