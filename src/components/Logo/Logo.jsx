import './Logo.css';
import logo from '../../images/epam.png';

function Logo() {
	return (
		<div className='logo-wrapper' data-testid='logo'>
			<img className='logo' alt='logo' src={logo} />
		</div>
	);
}

export default Logo;
