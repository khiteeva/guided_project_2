import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../site.css'

function Film(){
    const [CharList, setCharList] = useState([]);
    const [Planets, setPlanets] = useState([]);
    const [Film, setFilm] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `/films/${id}/characters`);
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
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `/films/${id}/planets`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setPlanets(json_response);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `/films/${id}`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setFilm(json_response[0]);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        getData();
    }, []);

    return (
        <>
            <h1 id="name">{Film.title}</h1>
            <section id="generalInfo">
                <p>Director: {Film.director}</p>
                <p>Episode ID: {Film.episode_id}</p>
                <p>Release Date: {Film.release_date}</p>
            </section>
            <section id="planets">
                <h2>Planets in this Film</h2>
                <ul>
                    {Planets.map((planet) =>(
                        <li key={planet.id}><a href={`/planets/${planet.id}`}>{planet.name}</a></li>
                    ))}
                </ul>
            </section>
            <section id="chars">
                <h2>Characters in this Film</h2>
                <ul>
                    {CharList.map((char) =>(
                        <li key={char.id}><a href={`/characters/${char.id}`}>{char.name}</a></li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Film;