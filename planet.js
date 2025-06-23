let nameH1;
let climate;
let surface_water;
let diameter;
let rotation_period;
let terrain;
let gravity;
let orbital_period;
let population;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    climate = document.querySelector('span#climate');
    surface_water = document.querySelector('span#surface_water');
    diameter = document.querySelector('span#diameter');
    rotation_period = document.querySelector('span#rotation_period');
    terrain = document.querySelector('span#terrain');
    gravity = document.querySelector('span#gravity');
    orbital_period = document.querySelector('span#orbital_period');
    population = document.querySelector('span#population');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id)
});

async function getPlanet(id) {
    let planet;
    try {
        planet = await fetchPlanet(id);
        console.log(planet);
    }
    catch (ex) {
        console.error(`Error reading planet ${id} data.`, ex.message);
    }
    renderPlanet(planet);
}

async function fetchPlanet(id) {
    const storageItem = localStorage.getItem(id.toString());

    if(storageItem) {
        return JSON.parse(storageItem);
    } else {
        let planetURL = `${baseUrl}/planets/${id}`;
        
        try {
            const planetResp = await fetch(planetURL);
            const planet = await planetResp.json();
            localStorage.setItem(id.toString(), JSON.stringify(planet))
            return planet;
        } catch(e) {
            throw new Error(e)
        }
    }
}

const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    climate.textContent = planet?.climate;
    surface_water.textContent = planet?.surface_water;
    diameter.textContent = planet?.diameter;
    rotation_period.textContent = planet?.rotation_period;
    terrain.textContent = planet?.terrain;
    gravity.textContent = planet?.gravity;
    orbital_period.textContent = planet?.orbital_period;
    population.textContent = planet?.population;
}
