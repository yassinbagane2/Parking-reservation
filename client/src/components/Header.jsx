import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Header = () => {
	const navigate = useNavigate();
	const logoutHandler = () => {
		localStorage.removeItem('token');
		navigate('/', { replace: true });
	}
  return (
    <nav className="py-8 text-white flex justify-between items-center flex-shrink-0 max-w-6xl w-full mx-auto">
		<div className="font-bold text-2xl">Smart Parking</div>
		<div className="flex items-center text-sm">
			{localStorage.getItem('token') ? <button className='px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded' onClick={logoutHandler}>Logout</button> : 
			<ul>
				<Link to={'/'} className="text-gray-50 mr-6">Home</Link>
				<Link to={'/about'} className="text-gray-400 hover:text-gray-50 mr-6">About</Link>
				<Link to={'/contact'} className="text-gray-400 hover:text-gray-50">Contact Us</Link>
			</ul>
			}
		</div>
	</nav>
  )
}

export default Header