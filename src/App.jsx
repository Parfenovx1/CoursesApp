import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

function App() {
	return (
		<div className='App'>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Redirect to='/login' />
				</Route>
				<Route path='/courses' component={Courses} />
				<Route path='/login' component={Login} />
				<Route path='/registration' component={Registration} />
			</Switch>
		</div>
	);
}

export default App;
