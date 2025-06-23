async function getFilmInfo() {
    const sp  = new URLSearchParams(window.location.search);
    const filmID = sp.get('id');

    // Get request for film info
    const film = await fetch(`http://localhost:9001/api/films/${filmID}`)
    .then(response => response.json())
    .catch((error) => console.error(`Error: `, error));

    // Get request for characters
    const characters = await fetch(`http://localhost:9001/api/films/${filmID}/characters`)
    .then(response => response.json())
    .catch((error) => console.error(`Error: `, error));

    // Get Request for the planets 
    const planets = await fetch(`http://localhost:9001/api/films/${filmID}/planets`)
    .then(response => response.json())
    .catch((error) => console.error(`Error: `, error));

    charUl = document.querySelector('#characterslist>ul');
    planetUl = document.querySelector(`#planets`)

    // Add all the characters to the html page
    for (const character in characters) {
        charBox = document.createElement('button');
        charBox.textContent = characters[character][`name`];
        charBox.addEventListener(`click`, () => goToCharacterPage(characters[character][`id`]))
        charUl.appendChild(charBox);
    }
    // Add all planets to the page
    for (const planet in planets) 
    {
        planetButton = document.createElement('button');
        planetButton.textContent = planets[planet]['name'];
        planetButton.addEventListener(`click`, () => goToPlanetPage(planets[planet]['id']))
        planetUl.append(planetButton);
    }

    // Add film info to the html page
    console.log(film);
    document.getElementById('name').innerHTML = film['title'];
    document.getElementById('Director').innerHTML = film['director'];
    document.getElementById('Episode ID').innerHTML = film['episode_id'];
    document.getElementById('Opening Crawl').innerHTML = film['opening_crawl']
    document.getElementById('Producer').innerHTML = film['producer'];
    document.getElementById('Release Date').innerHTML = film["release_date"];


    // Director, episode_id, id, opening crawl, producer, release_date, Title
    
}
const goToCharacterPage = id => window.location = `/character.html?id=${id}`
const goToPlanetPage = id => window.location = `/planet.html?id=${id}`

getFilmInfo();


