import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../site.css'

function Character(){
    const [Char, setChar] = useState({});
    const [Homeworld, setHomeworld] = useState({});
    const [FilmsList, setFilmsList] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `/characters/${id}`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setChar(json_response[0]);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `/characters/${id}/planet`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setHomeworld(json_response[0]);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `/characters/${id}/films`);
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
            <h1 id="name">{Char.name}</h1>
            <section id="generalInfo">
                <p>Height: {Char.height} cm</p>
                <p>Mass: {Char.mass} kg</p>
                <p>Born: {Char.birth_year}</p>
            </section>
            <section id="planets">
                <h2>Homeworld</h2>
                <p><a href={`/planets/${Homeworld.id}`}>{Homeworld.name}</a></p>
            </section>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul>
                    {FilmsList.map((film) =>(
                        <li key={film.id}><a href={`/film/${film.id}`}>{film.title}</a></li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Character;