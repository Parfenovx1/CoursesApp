import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';

function App() {
	return (
		<div className='App'>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Redirect to='/login' />
				</Route>
				<Route path='/courses' component={Courses} />
				{/* <Route path='/courses/add' component={CreateCourse} /> */}
				<Route path='/login' component={Login} />
				<Route path='/registration' component={Registration} />
				{/* <Route path='/courses/:courseId' component={CourseInfo} /> */}
			</Switch>
		</div>
	);
}

export default App;
