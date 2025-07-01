import React, { useState, useEffect } from "react";
import "../site.css";
import { Link } from "react-router-dom";

function CharacterList() {
    const [CharList, setCharList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + '/characters');
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setCharList(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <body>
                <div>
                    <h1>Star Wars Universe Lookup</h1>
                    {/* <label for="searchString">Who you looking for? <span class="small">(Regular expressions are cool
                        here)</span></label>
                    <input id="searchString" oninput="filterCharacters()" autocomplete="off" /> */}
                </div>
                {
                    CharList.map((char) => (

                        <button key={char.id}><Link to={`/Character/${char.id}`}>{char.name}</Link></button>
                    )

                    )
                }
            </body>

        </>
    )
}

export default CharacterList;