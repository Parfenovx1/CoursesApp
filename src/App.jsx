import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import axios from 'axios';
import CourseInfo from './components/CourseInfo/CourseInfo';

function App() {
	let [courses, setCourses] = useState([]);
	let [authors, setAuthors] = useState([]);

	useEffect(() => {
		const fetchCoursesData = async () => {
			const response = await axios.get('http://localhost:3000/courses/all');

			setCourses(response.data.result);
		};
		const fetchAuthorsData = async () => {
			const response = await axios.get('http://localhost:3000/authors/all');

			setAuthors(response.data.result);
		};
		fetchCoursesData();
		fetchAuthorsData();
	}, []);

	const WrappedCourses = function (props) {
		return <Courses {...props} courses={courses} authors={authors} />;
	};
	const WrappedCreateCourse = function (props) {
		return (
			<CreateCourse
				{...props}
				courses={courses}
				setCourses={setCourses}
				authors={authors}
				setAuthors={setAuthors}
			/>
		);
	};

	const WrappedCourseInfo = function (props) {
		return <CourseInfo {...props} authors={authors} />;
	};

	return (
		<div className='App'>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Redirect to='/login' />
				</Route>
				<Route exact path='/courses' component={WrappedCourses} />
				<Route path='/courses/add' component={WrappedCreateCourse} />
				<Route path='/login' component={Login} />
				<Route path='/registration' component={Registration} />
				<Route path='/courses/:courseId' component={WrappedCourseInfo} />
			</Switch>
		</div>
	);
}

export default App;
