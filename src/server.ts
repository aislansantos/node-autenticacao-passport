import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport'; // temos de inicalizar a lib no nosso server
import apiRoutes from './routes/routes';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

server.use(passport.initialize()) // temos de inicalizar a lib no nosso server


server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Ocorreu algum erro.' });
}
server.use(errorHandler);

server.listen(process.env.PORT);