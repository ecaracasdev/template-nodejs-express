import express  from 'express'
import morgan from 'morgan'

const app = express()
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.json({
        author:'elias',
        description:'backdend developer',
        version:'1.0'
    })
})

export default app