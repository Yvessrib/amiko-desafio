//Mongoose para interação com o BD
import express from 'express'
import mongoose from 'mongoose'
import Calls from '../src/model/CallModel.js'
import http from 'http'

//Criando o servidor e configurando a leitura de JSON
const app = express()
app.use(express.json())
const server = http.createServer(app)
const port = 3000

//Criando rota de POST para criação de chamadas
app.post('/calls', async (req, res) => {

  //Verificação e validação do número de quarto
  if(req.body.hospital.roomNumber > 0) {
    const call = new Calls({
      id: req.body.id,
      name: req.body.name,
      hospital: {
        name: req.body.hospital.name,
        roomNumber: req.body.hospital.roomNumber,
      }
    });

    //Salvando a chamada no BD
    await call.save();  
    
    //Enviando a resposta 
    res.send('Chamado criado com sucesso!') 
  } else {
    //Definindo o status da resposta
    res.status(400).send('O número do quarto deve ser maior ou igual a 1') 
  }
  
})

//Criando rota de GET para a listagem de chamadas
app.get('/calls', async (req, res) => {
  // Armazena os valores de nome do hospital e número do quarto
  const { hospitalName, roomNumber } = req.query

  //Varifável de filtro
  let filter = {}

  if (hospitalName) {
    // Coloca no filtro o nome do hospital
    filter['hospital.name'] = hospitalName

    if (roomNumber) {

      //Busca o quarto específico
      const roomExists = await Calls.findOne({
        'hospital.name': hospitalName,
        'hospital.roomNumber': Number(roomNumber)
      })

      //Verifica a exitência do quarto, caso não tenha, lança o erro
      if(!roomExists) {
        return res.status(400).send('Quarto não encontrado')
      }

      // Coloca no filtro o número do quarto
      filter['hospital.roomNumber'] = Number(roomNumber)
    }
  }

  //Busca as chamadas de acordo com o filtro
  const calls = await Calls.find(filter)
  res.send(calls.map(call => ({
    hospitalName: call.hospital.name,
    roomNumber: call.hospital.roomNumber,
    call: call.name,
  })))

  
})



app.listen(port, () => {
  mongoose.connect('mongodb+srv://admin:passwordadmin@amiko-api.wbzrcsm.mongodb.net/?retryWrites=true&w=majority&appName=amiko-api');
  console.log(`Example app listening at http://localhost:${port}`)
})

export default app