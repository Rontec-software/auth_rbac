import cors from 'cors'
import express from 'express'

const porta = process.env.API_PORT ?? 3003
const app = express()

//middlerwares
app.use(express.json())
app.use(express.urlencoded( {extended: true}))
app.use(
  cors(
    {
    origin: '*',
    optionsSuccessStatus: 200,
    }
  )
)
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
})

export default app
