
// External Module
import express from 'express';
import storeRouter from './routes/storeRoute.js'
import favRouter from './routes/favRoutes.js'
import { fileURLToPath } from 'node:url';
import { dirname } from 'path'; 
import path from 'node:path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// EJS TEMPLATE ENGINE 
app.set('view engine', 'ejs');
app.set('views', 'views');
// app.set('views', path.join(__dirname, 'views'));


//SERVING STATIC FILES;



app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded()); // BODY-PARSER

app.use(storeRouter);
app.use(favRouter);



const PORT = 2003;
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT} for REVISE RECAP.`);
})
