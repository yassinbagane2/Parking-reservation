import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {  useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const UserDashboard = ({userRole, onShowAlert, reservations, setReservations,setReservationId }) => {
	const navigate = useNavigate();
	

	const token = localStorage.getItem('token');

	useEffect(() => {

		if (!token) {	
			navigate('/', { replace: true });
		}
		else{
			if(userRole === "User"){
				axios.get('http://localhost:5000/api/reservations',{
					headers:{
						Authorization: `Bearer ${token}`,
						role:"User"
					}
				}).then(res => {
					console.log("event", res.data)
					setReservations(res.data);
				});
			}
			if(userRole==="Admin"){
				axios.get('http://localhost:5000/api/reservations',{
					headers:{
						Authorization: `Bearer ${token}`,
						role:"Admin"
					}
				}).then(res => {
					setReservations(res.data);
				});
			}

		}
	},[userRole])

	

  return (
    <>
        <Header userRole={userRole}/>
        <div className="flex-grow flex justify-center items-center">
			<div className="bg-white shadow rounded-lg p-8 w-3/4 mt-12">
				<div className="flex items-center justify-between w-[90%] mx-auto">
					<div>
						<h1 className="font-bold text-3xl text-blue-500 uppercase" id="title">{userRole === 'Admin' ? 'Tous Les Reservations' : 'Mes réservations'}</h1>
						<p className="text-sm text-gray-400">Liste des réservations:</p>
					</div>
					<div>
						<Link to={'/add-reservation'} className="p-4 bg-green-500 rounded text-white text-sm font-medium" href="add_reservation.html" id="addReservationBtn">Faire une réservation</Link>
					</div>
				</div>
				<div className="mt-6 overflow-x-auto w-full">
					<table className="table w-[85%] mx-auto">
						<thead>
							<tr>
								<th></th>
								<th id="clientNameCol">Nom du client</th>
								<th>Matricule</th>
								<th>Date de reservation</th>
								<th>Nombre d'heures</th>
								<th>N° Place</th>
								<th>Date</th>
								<th>Time</th>
								<th className="text-right">Actions</th>
							</tr>
						</thead>
						<tbody id="reservations">
						{reservations.map(reservation => (
							<tr key={reservation._id}>
								<th></th>
								<th className='text-blue-900'>{reservation.name.fullname}</th>
								<td className='text-center'>{reservation.matricule}</td>
								<td className='text-center'>{new Date(reservation.created).toDateString()}</td>
								<td className='text-center'>{reservation.noHours === null ? '<span class="text-red-400">N/A</span>' : reservation.noHours}</td>
								<td className='text-center'>{reservation.place}</td>
								<td className='text-center'>{reservation.date}</td>
								<td className='text-center'>{reservation.time}</td>
								<td class="text-right">
									<button onClick={_=>{
										onShowAlert(true)
										setReservationId(reservation._id)
									}} class="px-2 py-2 text-xs font-medium bg-red-500 hover:bg-red-600 text-gray-50 rounded" type="button" >
										{ userRole === 'Admin' ? 'Supprimer' : 'Annuler' }
									</button>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>
		</div>

        <Footer />
    </>
  )
}

export default UserDashboard