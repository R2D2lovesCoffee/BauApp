import express from 'express';
import connect from './db';
import router from './router';
import { config } from 'dotenv';

config();

declare global {
    namespace Express {
        interface Request {
            today: Date
        }
    }
}

connect().then(async () => {
    const app = express();

    app.get('/', (_, res) => {
        res.send('Check out my api on /api!')
    })
    app.use('/api', router);

    app.listen(process.env.PORT, () => {
        console.log(`server started on port ${process.env.PORT}`)
    });
})