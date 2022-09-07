import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios'
const Home = () => {
    const [err, setErr]=useState(null)

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard', { replace: true });
        }
    },[])
    const [values, setValues] = useState({
        cin: '',
        password: ''
    });
    const onInputChange = e => {
        setValues(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }
    const loginHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/login',values).then(res => {
            console.log(res.data);
            
            if(!res.data.status) {
                 return setErr(res.data.msg)
            }
            localStorage.setItem('token',res.data.token);
            navigate('/dashboard', { replace: true });
        }).catch(error => {
            console.log(error);
        });
    }
  return (
    <div className='home'>
        <Header />
        <main className='mt-24 flex-grow flex justify-center items-center max-w-6xl mx-auto text-white space-x-24'>
            <div className='w-1/2'>
                <h1 className='text-2xl font-bold text-white'>Parking en toute simplicité.</h1>
                <p className="mt-2 text-gray-300 leading-7">Dans Toute les ville du Pays Du monde , est une zone de remorquage désignée en vertu de la loi sur les véhicules et la circulation de l'État. Cela signifie que tout véhicule stationné ou conduit illégalement, ou avec des vignettes d'immatriculation ou d'inspection manquantes ou périmées, peut être remorqué. Lors des principaux jours fériés, l'arrêt, la station debout et le stationnement sont autorisés, sauf dans les zones où les règles d'arrêt, de station debout et de stationnement sont en vigueur sept jours sur sept (par exemple, "Pas de station debout à tout moment").</p>
                <div className="mt-8 space-x-2">
                    <Link to={'/about'} className="inline-block px-4 py-3 text-sm rounded-md bg-blue-600 hover:bg-blue-700 shadow">Learn more about us</Link>
                    <Link to={'/contact'} className="inline-block bg-gray-50 hover:bg-gray-200 px-4 py-3 text-sm text-black rounded-md shadow">Contact</Link>
                </div>
            </div>
            <div className='max-w-md w-full bg-gray-50 p-8 rounded-lg'>
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Log In</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                    Or
                    <Link to={'/register'} className="font-medium text-blue-600 hover:text-blue-500 ml-1">Create a new account </Link>
                    </p>
			    </div>
                <form className="mt-8 space-y-6" onSubmit={loginHandler}>
				<input type="hidden" name="remember" value="true" />
				<div className="rounded-md shadow-sm -space-y-px">
					<div>
						<label htmlFor="cin" className="sr-only">CIN</label>
						<input id="cin" name="cin" onChange={onInputChange} type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="CIN" />
					</div>
					<div>
						<label htmlFor="password" className="sr-only">Password</label>
						<input id="password" name="password" onChange={onInputChange} type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" />
					</div>
				</div>
		
				<div>
                    {err&&<div style={{color:"red",marginBlock:"10px",textAlign:"center"}}>{err}</div>}
					<button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
						<span className="absolute left-0 inset-y-0 flex items-center pl-3">
						<svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
						</svg>
						</span>
						Log in
					</button>
				</div>
			    </form>
            </div>
        </main>
        <Footer />
    </div>
  )
}

export default Home