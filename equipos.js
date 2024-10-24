const equipoList = document.getElementById('equipo-list');
const miEquipo = JSON.parse(localStorage.getItem('equipo')) || [];

miEquipo.forEach(pokemon => {
    const pokemonItem = document.createElement('div');
    pokemonItem.innerHTML = `
        <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
        <h3>${pokemon.nombre.toUpperCase()}</h3>
        <p>Tipo: ${pokemon.tipo}</p>
    `;
    equipoList.appendChild(pokemonItem);
});

const backToList = document.getElementById('back-to-list');
backToList.addEventListener('click', () => {
    window.location.href = 'index.html';
});

const deleteTeamBtn = document.getElementById('delete-team');
deleteTeamBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres eliminar tu equipo Pokémon?')) {
        localStorage.removeItem('equipo');
        window.location.reload();
    }
});