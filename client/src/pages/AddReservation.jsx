import React, { useState, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddReservation = () => {

	const timeRef=useRef()
	const dateRef=useRef()


	const navigate = useNavigate();
	const [values, setValues] = useState({
		matricule: '',
		noHours: Number,
		place: '1'
	});
	const onInputChange = e => {
		setValues(prev => {
			return {...prev, [e.target.name]: e.target.value }
		})
	}
	const addReservationHandler = e => {
		e.preventDefault();
		axios.post('http://localhost:5000/api/add-reservation',{...values, date:dateRef.current.value, time:timeRef.current.value},{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		}).then(res => {
			navigate('/dashboard', {replace: true});
		})
	}
  return (
    <>
        <Header />
        <div class="flex-grow flex-center mt-24">
			<div class="mt-8 bg-white shadow rounded-lg p-8 w-full max-w-md mx-auto">
				<div class="text-center">
					<h1 class="text-2xl font-bold text-blue-500">Faire une Reservation</h1>
					<p class="text-xs text-gray-500">Remplire le formulaire ci-dessous pour reserver une place</p>
				</div>
				<form class="mt-6" onSubmit={addReservationHandler}>
					<div>
						<label class="block text-xs text-gray-400" for="matricule">Matricule de voiture:</label>
						<input class="mt-1 border border-gray-400 outline-none px-2 py-2 rounded w-full" onChange={onInputChange} type="text" name="matricule" id="matricule" placeholder="1234 TUN 123" />
					</div>
					<div class="mt-4">
						<label class="block text-xs text-gray-400" for="noHours">Nombre d'heures:</label>
						<input class="mt-1 border border-gray-400 outline-none px-2 py-2 rounded w-full" onChange={onInputChange} type="number" name="noHours" id="noHours" placeholder="e.g. 3" />
					</div>
					<div class="mt-4">
						<label class="block text-xs text-gray-400" for="time">Temps de reservation:</label>
						<input ref={timeRef} type="time" name="time" id="time" required/>
					</div>
					<div class="mt-4">
						<label class="block text-xs text-gray-400" for="Date">Date de reservation:</label>
						<input ref={dateRef} type="Date" name="Date" id="Date" required/>
					</div>
					<div class="mt-4">
						<label class="block text-xs text-gray-400" for="place">Numero de la place:</label>
						<select class="mt-1 border border-gray-400 outline-none px-2 py-2 rounded w-full" onChange={onInputChange} name="place" id="place" >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="3">4</option>
                        <option value="3">5</option>
                        <option value="3">6</option>
                        <option value="3">7</option>
                        <option value="3">9</option>
						</select>
					</div>
					<button class="mt-6 bg-green-500 hover:bg-green-700 px-4 py-3 text-gray-50 font-medium rounded text-sm w-full">Submit</button>
				</form>
			</div>
		</div>

        <Footer />
    </>
  )
}

export default AddReservation