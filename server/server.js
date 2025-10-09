import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import {
  getLocations,
  getLocationById,
} from "./controllers/locationsController.js";
import {getEvents, getEventById} from './controllers/eventsController.js'
// import the router from your routes file
import cors from "cors";
import { get } from 'https'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'))
})

app.get('/locations',getLocations);
app.get("/locations/:id", getLocationById); 
app.get("/events/:id", getEventById);
app.get('/events',getEvents);
if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})