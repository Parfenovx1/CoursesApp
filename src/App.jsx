import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { useState } from 'react';
import mockedAuthorsList from './sampleAuthors';
import mockedCoursesList from './sampleCourses';

function App() {
	let [courses, setCourses] = useState(mockedCoursesList);
	let [authors, setAuthors] = useState(mockedAuthorsList);
	const [show, setShow] = useState(false);

	return (
		<div className='App'>
			<Header />
			{show ? (
				<CreateCourse
					courses={courses}
					setCourses={setCourses}
					authors={authors}
					setAuthors={setAuthors}
					setShow={setShow}
				/>
			) : (
				<Courses
					courses={courses}
					setCourses={setCourses}
					authors={authors}
					setAuthors={setAuthors}
					setShow={setShow}
				/>
			)}
		</div>
	);
}

export default App;
