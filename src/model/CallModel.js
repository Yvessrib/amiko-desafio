import mongoose from 'mongoose'

//Criando o model à ser utilizado para as chamadas
const Calls = mongoose.model('Calls',{
  id: String,
  name: String,
  hospital: {
    name: String,
    roomNumber: Number,
  }
});

export default Calls