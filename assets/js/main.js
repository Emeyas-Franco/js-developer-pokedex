const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 12
let offset = 0
const maxRecords = 151

function loadPokemonItens(offset, limit){
  pokeApi.getpokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) =>`
      <li class="pokemon ${pokemon.type}" data-name="${pokemon.name}" id="${pokemon.name}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
      </li>
    `).join('')
    pokemonList.innerHTML += newHtml
  })
}

document.addEventListener('click', function (event) {
  const card = event.target.closest('.pokemon')
  if (card) {
    const pokemonName = card.getAttribute('data-name')
    if (pokemonName) {
      window.location.href = `pokemonDetail.html?pokemon=${pokemonName}`
    }
  }
})

pokeApi.getpokemons().then((pokemons = []) => {
  pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
})

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtdRecordsWithNextPage = offset + limit

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(offset, limit)
  }
})
