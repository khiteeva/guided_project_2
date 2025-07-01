import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function Character(){
    const [Char, setChar] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + `/characters/${id}`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                console.log(json_response);
                setChar(json_response); // assign JSON response to the data variable.
                console.log(`printing after fetch ${Char}`);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchData();
        //console.log(`printing after fetch ${CharList}`);
    }, []);

    return (
        <>
            <h1 id="name">{Char.name}</h1>
            <section id="generalInfo">
                <p>Height: {Char.height} cm</p>
                <p>Mass: {Char.mass} kg</p>
                <p>Born: {Char.birth_year}</p>
            </section>
        </>
    )
}

export default Character;