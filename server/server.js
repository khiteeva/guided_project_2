import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const films = process.env.MONGO_DB_FILMS;
const films_characters = process.env.MONGO_DB_FILMS_CHARACTERS;
const films_planets = process.env.MONGO_DB_FILMS_PLANETS;
const planets = process.env.MONGO_DB_PLANETS;
const characters = process.env.MONGO_DB_CHARACTERS;

const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
const PORT = 3000;


app.get('/api/planets', async (req, res) => {
    res.status(200).send("Hmmm, something smells... No socks for you! ☹");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});