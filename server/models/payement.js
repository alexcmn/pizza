const mongoose = require('mongoose');

const payementSchema = mongoose.Schema({
    street:{
        required: true,
        type: String
    },
    city:{
        required: true,
        type: String
    },
    zip:{
        required: true,
        type: String
    },
    card:{
        required: true,
        type: String
    },
    expiration:{
        required: true,
        type: String
    },
    cvv:{
        required: true,
        type: String
    }    
});

const Payement = mongoose.model('Payement', payementSchema);

module.exports = { Payement };