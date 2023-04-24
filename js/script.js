var horaAtual = new Date().getHours();

if (horaAtual >= 6 && horaAtual < 18) {
  document.getElementById("body").classList.add("body_dia");
} else {
  document.getElementById("body").classList.add("body_noite");
}

const pokemonName = document.querySelector('.pokemon__name');
const pokemonId = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonId.innerHTML = '';
    pokemonName.innerHTML = 'loading... :3';

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display = 'block';
        pokemonId.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        if(data.id > 649){
            pokemonImage.style.display = 'none';
            pokemonName.innerHTML = 'Pokedex desatualizada'
            pokemonId.innerHTML = '';
        }
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];

        input.value = '';
        searchPokemon = data.id;
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Nao encontrado ;-;'
        pokemonId.innerHTML = '';
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    } else{
        pokemonId.innerHTML = '';
        pokemonName.innerHTML = 'Nao posso... -_-'
    }
    
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);
