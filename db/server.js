import express from 'express'
import db_con from '../db/db.js'

const app = express()

app.listen(5000, () => {
    console.log(`El servidor esta corriendo en el puerto 5000 ...`)
})

app.get('/createDatabase', (_, res) => {
    let useQuery = `USE geoapu`
    db_con.query(useQuery, (error) => {
        if (error) throw error

        console.log('Usando la base de datos GeoAPU')

        return res.send(`Usando APU`)
    })
})

app.get('/selectData', (_, res) => {
    let selectQuery = `SELECT * FROM usuarios`
    db_con.query(selectQuery, (error, results) => {
        if (error) throw error

        console.log('Datos seleccionados:', results)

        return res.send(results)
    })
})
