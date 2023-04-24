const pokemonName = document.querySelector('.pokemon__name');
const pokemonId = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIResponse.json();
    return data;
}

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    pokemonId.innerHTML = data.id;
    pokemonName.innerHTML = data.name;
    pokemonImage.srq = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

}

renderPokemon('2')
