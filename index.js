const regionSelect = document.getElementById('region-select');
const pokemonList = document.getElementById('pokemon-list');

window.addEventListener('DOMContentLoaded', () => {
    fetch('https://pokeapi.co/api/v2/pokedex/')
        .then(response => response.json())
        .then(data => {
            const regions = data.results;
            regions.forEach((region, index) => {
                const option = document.createElement('option');
                option.value = index + 1;
                option.textContent = region.name.toUpperCase();
                regionSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar regiones:', error));
});

regionSelect.addEventListener('change', () => {
    const regionId = regionSelect.value;
    if (regionId) {
        fetch(`https://pokeapi.co/api/v2/pokedex/${regionId}/`)
            .then(response => response.json())
            .then(data => {
                const pokemonEntries = data.pokemon_entries.slice(0, 50);
                pokemonList.innerHTML = '';
                pokemonEntries.forEach(entry => {
                    fetch(entry.pokemon_species.url.replace('-species', ''))
                        .then(response => response.json())
                        .then(pokemonData => {
                            const pokemonItem = document.createElement('div');
                            pokemonItem.innerHTML = `
                                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                                <h3>${pokemonData.name.toUpperCase()}</h3>
                                <p>Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                                <button onclick="agregarAlEquipo('${pokemonData.name}', '${pokemonData.sprites.front_default}', '${pokemonData.types.map(type => type.type.name).join(', ')}')">Agregar a mi equipo</button>
                            `;
                            pokemonList.appendChild(pokemonItem);
                        });
                });
            })
            .catch(error => console.error('Error al cargar Pokémon:', error));
    }
});

let equipo = JSON.parse(localStorage.getItem('equipo')) || [];

function agregarAlEquipo(nombre, imagen, tipo) {
    equipo.push({ nombre, imagen, tipo });
    localStorage.setItem('equipo', JSON.stringify(equipo));
    alert(`${nombre} agregado a tu equipo!`);
}

const myTeamBtn = document.getElementById('my-team');
myTeamBtn.addEventListener('click', () => {
    window.location.href = 'equipos.html';
});