import React, { useState, useEffect } from "react";

function Character(){
    const [Char, setChar] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(import.meta.env.VITE_SWAPI_API_URL + '/characters/');
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                console.log(json_response);
                setChar(json_response); // assign JSON response to the data variable.
                console.log(`printing after fetch ${CharList}`);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchData();
        //console.log(`printing after fetch ${CharList}`);
    }, []);

    return (
        <>
            {
                CharList.map((char) => {
                    <div>{char.name}</div>
                })
            }
        </>
    )
}

export default Character;