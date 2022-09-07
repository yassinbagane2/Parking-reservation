const mongoose = require('mongoose')



const ReservationSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    matricule: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: new Date()
    },
    noHours: {
        type: Number,
        required: true
    },
    place: {
        type: String,
        default: 1
    },
    time:String,
    date:String

});

module.exports = mongoose.model('Reservation', ReservationSchema);