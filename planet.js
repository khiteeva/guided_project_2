let name;
let climate;
let surface_water;
let diameter;
let rotation_period;
let terrain;
let gravity;
let standard;
let orbital_period;
let population;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  name = document.querySelector('h1#name');
  climate = document.querySelector('span#climate');
  surface_water = document.querySelector('span#surface_water');
  diameter = document.querySelector('span#diameter');
  rotation_period = document.querySelector('span#rotation_period');
  terrain = document.querySelector('span#terrain');
  gravity = document.querySelector('span#gravity');
  standard = document.querySelector('span#standard');
  orbital_period = document.querySelector('span#orbital_period');
  population = document.querySelector('span#population');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  fetchPlanet(id)
});

async function fetchPlanet(id) {
  let characterUrl = `${baseUrl}/planets/${id}`;
  return await fetch(characterUrl)
    .then(res => res.json())
}

const renderCharacter = character => {
  document.title = `SWAPI - ${character?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = character?.name;
  heightSpan.textContent = character?.height;
  massSpan.textContent = character?.mass;
  birthYearSpan.textContent = character?.birth_year;
  homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
  const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
}
