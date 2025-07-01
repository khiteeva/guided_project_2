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
app.use(express.static('./public'))
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
        res.status(500).send("There was an issue looking up the characters.");
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
        res.status(500).send("There was an issue looking up the planets.");
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
        res.status(500).send(`Could not find character ${id}.`);
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
        res.status(500).send(`Could not find film ${id}.`);
    }
});

app.get('/api/planets/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planets);
        const planet_res = await collection.find({'id' : id}).toArray();
        res.json(planet_res);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send(`Could not find homeworld ${id}.`);
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const films_char_collection = db.collection(films_characters);
        const character_collection = db.collection(characters);
        const character_ids = await films_char_collection.find({'film_id' : id}).toArray();

        let character_array = [];
        for(let element in character_ids){
            let character_info = await character_collection.find({id : parseInt(character_ids[element].character_id)}).toArray();
            character_array = [...character_array, character_info[0]];
        }
        res.json(character_array);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send(`Could not find any characters from the film ${id}.`);
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const films_plan_collection = db.collection(films_planets);
        const planets_collection = db.collection(planets);
        const planet_ids = await films_plan_collection.find({'film_id' : id}).toArray();

        let planet_array = [];
        for(let element in planet_ids){
            let planet_info = await planets_collection.find({id : parseInt(planet_ids[element].planet_id)}).toArray();
            planet_array = [...planet_array, planet_info[0]];
        }
        res.json(planet_array);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send(`Could not find any planets that are part of film ${id}.`);
    }
});

app.get('/api/characters/:id/planet', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const character_collection = db.collection(characters);
        const planet_id = await character_collection.find({id: id}).toArray();
        const collection = db.collection(planets);
        const planet = await collection.find({id : planet_id[0].homeworld}).toArray();
        res.json(planet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send(`Could not find any characters in film ${id}.`);
    }
});

app.get('/api/characters/:id/films', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const films_char_collection = db.collection(films_characters);
        const film_collection = db.collection(films);
        const film_ids = await films_char_collection.find({'character_id' : id}).toArray();

        let films_array = [];
        for(let element in film_ids){
            let film_info = await film_collection.find({id : parseInt(film_ids[element].film_id)}).toArray();
            films_array = [...films_array, film_info[0]];
        }
        res.json(films_array);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send(`Could not find any characters in film ${id}.`);
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const films_planets_collection = db.collection(films_planets);
        const film_collection = db.collection(films);
        const film_ids = await films_planets_collection.find({'planet_id' : id}).toArray();

        let films_array = [];
        for(let element in film_ids){
            let film_info = await film_collection.find({id : parseInt(film_ids[element].film_id)}).toArray();
            films_array = [...films_array, film_info[0]];
        }
        res.json(films_array);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send(`Could not find any films that are set on homeworld ${id}.`);
    }
});

app.get('/api/planets/:id/characters', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(characters);
        const char = await collection.find({homeworld : id}).toArray();
        res.json(char);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send(`Could not find any characters from homeworld ${id}.`);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});