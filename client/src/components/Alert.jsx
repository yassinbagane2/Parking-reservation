import React from 'react'
import "./Alert.css"

 const Alert = ({onClose, onDeleteReservation}) => {
    
  return (
    <div className="alert-model">
            <h1 className="alert-model__title">
                Tu Es Sure ?!
            </h1>
            <div className="alert-model__buttons">
                <button onClick={onClose.bind(null,false)} className="btn btn1">annuler</button>
                <button onClick={onDeleteReservation} className="btn btn2">confirmer</button>
            </div>
    </div>
  )
}

export default Alert ;