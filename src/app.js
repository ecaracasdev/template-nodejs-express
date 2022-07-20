import express  from 'express'
import morgan from 'morgan'
import path from 'path'

import xl from 'excel4node'
import mime from 'mime'

const app = express()
app.use(morgan('dev'))

const router = express.Router()

const HEADER_COLUMNS = ['name','email','phone']
const DATA = [
    { name:'elias',email:'elias@gmail.com',phone: '2213521895'},
    { name:'simon',email:'simon@gmail.com',phone: '6711996'},
    { name:'michelle',email:'michelle@gmail.com',phone: '3737328'},
    { name:'janetsi',email:'mireina@gmail.com',phone: '2215928766'}
]

const createExcelFile = () => {
    const wb = new xl.Workbook()
    const ws = wb.addWorksheet('elias')
    let colIndex = 1
    HEADER_COLUMNS.forEach(item => {
        ws.cell(1, colIndex++).string(item)
    }) 
    let rowIndex = 2

    DATA.forEach( item => {
        let columnIndex = 1
        Object.keys(item).forEach(colName => {
            ws.cell(rowIndex, columnIndex++).string(item[colName])
        })
        rowIndex++
    })
    wb.write('./src/elias.xlsx')
}


app.get('/', (req, res) => {
    res.json({
        author:'elias',
        description:'backdend developer',
        version:'1.0'
    })
})

router.get('/download', (req, res) => {
    createExcelFile()
    const file = `${__dirname}/elias.xlsx`
    const fileName = path.basename(file)
    const mimeType = mime.getType(file)
    res.setHeader('Content-Disposition',`attatchment;filename=${fileName}`)
    res.setHeader('Content-Type', mimeType)
    setTimeout(() => {
        res.download(file)
    }, 2000);
})


app.use('/',router)

export default app