import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../site.css'

function Planet(){
    const [CharList, setCharList] = useState([]);
    const [Planet, setPlanet] = useState({});
    const [FilmsList, setFilmsList] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `/planets/${id}/characters`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setCharList(json_response);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `/planets/${id}`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setPlanet(json_response[0]);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `/planets/${id}/films`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setFilmsList(json_response);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        getData();
    }, []);

    return (
        <>
            <h1 id="name">{Planet.name}</h1>
            <section id="generalInfo">
                <p>Climate: {Planet.climate}</p>
                <p>Diameter: {Planet.diameter} km</p>
                <p>Terrain: {Planet.terrain}</p>
            </section>
            <section id="chars">
                <h2>Characters</h2>
                <ul>
                    {CharList.map((char) =>(
                        <li key={char.id}><a href={`/characters/${char.id}`}>{char.name}</a></li>
                    ))}
                </ul>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {FilmsList.map((film) =>(
                        <li key={film.id}><a href={`/films/${film.id}`}>{film.title}</a></li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Planet;