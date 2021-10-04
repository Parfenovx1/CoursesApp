import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import './Header.css';

function Header() {
	return (
		<div className='header-wrapper'>
			<Logo />
			<div className='user-and-button'>
				<p className='user-name'>Dave</p>
				<Button value='Logout' />
			</div>
		</div>
	);
}

export default Header;
