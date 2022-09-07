import React,{ useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		name: '',
		cin: '',
		password: '',
		phoneNumber: ''
	});
	const handleInputChange = (e) => {
		setValues(prev => {
			return {...prev, [e.target.name]: e.target.value}
		});
	}
	const formSubmitHandler = e => {
		e.preventDefault();
		axios.post('http://localhost:5000/api/register',values).then(res => {
			navigate('/', { replace: true });
		}).catch(console.error());
	}
  return (
    <>
    <Header />
    <div className="flex-grow flex justify-center items-center">
		<div className="mt-24 max-w-md w-full bg-gray-50 p-8 rounded-lg">
			<div>
				<h2 className="text-center text-3xl font-extrabold text-gray-900">Register</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
				 Or
				<Link to={'/'} className="font-medium text-blue-600 hover:text-blue-500 ml-1">Login to your account </Link>
				</p>
			</div>
			<form className="mt-8 space-y-6" onSubmit={formSubmitHandler}>
				<input type="hidden" name="remember" value="true" />
				<div className="rounded-md shadow-sm -space-y-px">
					<div>
						<label htmlFor="cin" className="sr-only">CIN</label>
						<input id="cin" name="cin" onChange={handleInputChange} type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="CIN" pattern="[0-9]{8}"/>
					</div>
					<div>
						<label htmlFor="name" className="sr-only">Name</label>
						<input id="name" name="name" onChange={handleInputChange} type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Full name"/>
					</div>
					<div>
						<label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
						<input id="phoneNumber" onChange={handleInputChange} name="phoneNumber" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Phone Number" pattern="[0-9]{8}" />
					</div>
					<div>
						<label htmlFor="password" className="sr-only">Password</label>
						<input id="password" name="password" onChange={handleInputChange} type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" />
					</div>
				</div>
		
				<div>
					<button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
						<span className="absolute left-0 inset-y-0 flex items-center pl-3">
						<svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
						</svg>
						</span>
						Register
					</button>
				</div>
			</form>
		</div>
	    </div>
        <Footer />
    </>
        
        

  )
}

export default Register