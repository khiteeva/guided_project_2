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


app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(characters);
        const chars = await collection.find({}).toArray();
        res.json(chars);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(films);
        const films_array = await collection.find({}).toArray();
        res.json(films_array);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planets);
        const planet_array = await collection.find({}).toArray();
        res.json(planet_array);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/api/characters/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(characters);
        const char = await collection.find({id : id}).toArray();
        res.json(char);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.get('/api/films/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(films);
        const film = await collection.find({'id' : id}).toArray();
        console.log(film)
        res.json(film);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});