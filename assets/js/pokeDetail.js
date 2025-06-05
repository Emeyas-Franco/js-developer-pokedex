function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const name = getQueryParam('pokemon');
const detailContainer = document.getElementById('pokemon-detail');

if (!name) {
  document.getElementById('pokemon-name').textContent = 'Pokémon não especificado';
} else {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(res => {
      if (!res.ok) throw new Error('Pokémon não encontrado');
      return res.json();
    })
    .then(data => {
      // Atualizar título da página
      document.title = `Pokémon ${data.name}`;

      // Elementos
      const nameElement = document.getElementById('pokemon-name');
      const numberElement = document.getElementById('pokemon-number');
      const imageElement = document.getElementById('pokemon-img');
      const typesElement = document.getElementById('pokemon-types');
      const heightElement = document.getElementById('pokemon-height');
      const weightElement = document.getElementById('pokemon-weight');
      const abilitiesElement = document.getElementById('pokemon-abilities');

      // Dados
      nameElement.textContent = data.name;
      numberElement.textContent = `#${data.id}`;
      imageElement.src = data.sprites.other.dream_world.front_default || data.sprites.front_default;
      imageElement.alt = data.name;
      heightElement.textContent = `${data.height / 10} m`;
      weightElement.textContent = `${data.weight / 10} kg`;

      // Tipos
      typesElement.innerHTML = '';
      data.types.forEach(t => {
        const li = document.createElement('li');
        li.className = `type ${t.type.name}`;
        li.textContent = t.type.name;
        typesElement.appendChild(li);
      });

      // Habilidades
      abilitiesElement.innerHTML = '';
      data.abilities.forEach(ab => {
        const li = document.createElement('li');
        li.textContent = ab.ability.name;
        abilitiesElement.appendChild(li);
      });

      // Aplicar cor de fundo pela classe do primeiro tipo
      const typeClass = data.types[0].type.name;
      detailContainer.classList.add(typeClass);
    })
    .catch(() => {
      document.getElementById('pokemon-name').textContent = 'Erro ao carregar Pokémon';
    });
}
