import express from 'express';
import connect from './db';
import router from './router';
import { config } from 'dotenv';

config();

connect().then(() => {
    const app = express()
    app.use('/api', router)
    app.listen(process.env.PORT, () => {
        console.log(`server started on port ${process.env.PORT}`)
    });
})