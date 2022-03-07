import { connect } from 'mongoose'
import App from './App'
import { url_mongo } from './env';
import {routes} from './routes/AuthRoutes'

console.log(url_mongo)
connect(url_mongo)
    .then(() => {
        console.log('Conectado ao Mongo DB!')
        const app = new App(routes, 3000)
        app.listen();
    })
    .catch((err) => console.log(err))
