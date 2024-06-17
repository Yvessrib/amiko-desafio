import supertest from 'supertest'
import mongoose from 'mongoose'
import app from './app'

//Configurando o server para os testes 
let server
const port = 3001

//Iniciando o server
beforeAll(() => {
  server = app.listen(port, () => {
    mongoose.connect('mongodb+srv://admin:passwordadmin@amiko-api.wbzrcsm.mongodb.net/?retryWrites=true&w=majority&appName=amiko-api');
    console.log(`Example app listening at http://localhost:${port}`)
  })
})

//Finalizando o server
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

//Testando a rota GET /calls
describe("GET /calls", () => {
  it("should return with a status 200 and a list of calls",
    async() => {
      const response = await supertest(server).get('/calls')

      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
    }
  )
})

//Testando a rota POST /calls
describe("POST /calls", () => {
  it("should create a call in the database using and object and return 200",
    async() => {
      const call = {
        id: '123',
        name: 'Test Call',
        hospital: {
          name: 'Test Hospital',
          roomNumber: 101,
      },
    };

    const response = await supertest(server).post('/calls').send(call)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object);
  },)
})
