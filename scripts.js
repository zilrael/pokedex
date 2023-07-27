const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector(".pokemon-image");

const form = document.querySelector(".form");
const input = document.querySelector('.buscar');
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let pokemonAtual = 1;

//Função responsável por resgatar os dados da API
async function fetchPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    // só converte e retorna os dados se a requisição for true
    if(response.status === 200){
    const data = await response.json();
    return data;
    }
}

// funcao responsavel por exibir o pokemon na pokedex

async function renderPokemon (pokemon) {
    pokemonName.innerText = "Carregando..."
    pokemonNumber.innerText = "";

    // buscando os pokemons na funcao fetchpokemon()
    const data = await fetchPokemon(pokemon);
    if(data){
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        pokemonImage.style.display = "block";
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        
        pokemonAtual = data.id;
        input.value ="";
        input.focus();
    }
    else{
        pokemonName.innerText = "Couldn't find :("
        pokemonNumber.innerText = "";
        pokemonImage.style.display = "none"
    }
}

//evento de envio do formulario

form.addEventListener("submit", (e) => {
    e.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

//evento de click no botao anterior
btnPrev.addEventListener('click', () => {
    if(pokemonAtual >1){
        pokemonAtual--;
        renderPokemon(pokemonAtual);

    }
});

btnNext.addEventListener('click', () => {
        pokemonAtual++;
        renderPokemon(pokemonAtual);

});


renderPokemon(pokemonAtual);

