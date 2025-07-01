import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function Character(){
    const [Char, setChar] = useState([]);
    const [Homeworld, setHomeworld] = useState('');
    const [FilmsList, setFilmsList] = useState([]);
    const { id } = useParams();

    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            return json_response;
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    useEffect(() => {
        const data = fetchData(import.meta.env.VITE_SWAPI_API_URL + `/characters/${id}`);
        setChar(data);
    }, []);

    useEffect(() => {
        const data = fetchData(import.meta.env.VITE_SWAPI_API_URL + `/characters/${id}/planet`);
        setHomeworld(data);
    }, '');

    useEffect(() => {
        const data = fetchData(import.meta.env.VITE_SWAPI_API_URL + `/characters/${id}/films`);
        setFilmsList(data);
    }, []);

    return (
        <>
            <h1 id="name">{Char.name}</h1>
            <section id="generalInfo">
                <p>Height: {Char.height} cm</p>
                <p>Mass: {Char.mass} kg</p>
                <p>Born: {Char.birth_year}</p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <p>{Homeworld}</p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {FilmsList.map((film) =>
                        <li key={film.id}>{film.name}</li>
                    )}
                </ul>
            </section>
        </>
    )
}

export default Character;