import './Header.css';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import { useHistory } from 'react-router';
import { logout } from '../../store/user/actionCreators';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Header(props) {
	const history = useHistory();
	const submitHandler = function () {
		props.logout().then((response) => {
			localStorage.removeItem('token');
			history.push('/login');
		});
	};
	return (
		<div className='header-wrapper'>
			<Logo />
			<div className='user-and-button'>
				{props.user.isAuth ? (
					<p className='user-name'>
						{props.user.name ? props.user.name : props.user.email}
					</p>
				) : null}
				{props.user.isAuth ? (
					<Button handler={submitHandler} value='Logout' />
				) : null}
			</div>
		</div>
	);
}

Header.propTypes = {
	logout: PropTypes.func.isRequired,
	user: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
	return { user: state.user };
}

const mapActionsToProps = {
	logout: logout,
};

export default connect(mapStateToProps, mapActionsToProps)(Header);
