import './Logo.css';
import logo from '../../images/epam.png';

function Logo() {
	return (
		<div className='logo-wrapper'>
			<img className='logo' alt='logo' src={logo} />
		</div>
	);
}

export default Logo;
