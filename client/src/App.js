import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import  { Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AddReservation from './pages/AddReservation';
import Alert from './components/Alert';


function App() {
  const [userRole, setUserRole] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [reservationId, setReservationId] = useState("");

  console.log("id id :",reservationId)
  useEffect(() => {
		axios.get('http://localhost:5000/api/user-role',{
			headers:{
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		}).then(res => {
      console.log("check role :",res.data)
			setUserRole(res.data.role);
		})
	  },[])

    const deleteReservation = () => {
      console.log(reservationId)
      console.log("front delete")
      axios.delete('http://localhost:5000/'+ reservationId,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(res => {
        setShowAlert(false)
        setReservations(reservations => reservations.filter(reservation => reservation._id !== res.data._id ));
      })
    }


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={<UserDashboard userRole={userRole} onShowAlert={setShowAlert} reservations={reservations} setReservations={setReservations} setReservationId={setReservationId}/>} /> 
        <Route path='/add-reservation' element={<AddReservation userRole={userRole}/>}/>
      </Routes>
      {showAlert&&<Alert setReservationId={setReservationId} onDeleteReservation={deleteReservation} onClose={setShowAlert}  />}
    </>
  );
}

export default App;
