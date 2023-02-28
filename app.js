const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const detailsContainer = document.getElementById('details-container');

searchBtn.addEventListener('click', async () => {
  const searchQuery = searchInput.value.trim();
  if (searchQuery) {
    searchResults.innerHTML = 'Loading...';
    detailsContainer.innerHTML = '';
    const response = await fetch(`https://swapi.dev/api/people/?search=${searchQuery}`);
    const data = await response.json();
    const results = data.results;
    if (results.length === 0) {
      searchResults.innerHTML = 'No results found.';
    } else {
      let html = '<ul>';
      for (let i = 0; i < results.length; i++) {
        const character = results[i];
        html += `<li class="search-result" data-url="${character.url}">${character.name}</li>`;
      }
      html += '</ul>';
      searchResults.innerHTML = html;
      const searchResultItems = document.getElementsByClassName('search-result');
      for (let i = 0; i < searchResultItems.length; i++) {
        searchResultItems[i].addEventListener('click', async () => {
          const characterUrl = searchResultItems[i].getAttribute('data-url');
          const response = await fetch(characterUrl);
          const character = await response.json();
          let detailsHtml = `
            <h2>${character.name}</h2>
            <p>Birth year: ${character.birth_year}</p>
            <p>Gender: ${character.gender}</p>
            <p>Height: ${character.height} cm</p>
            <p>Mass: ${character.mass} kg</p>
            <div id="films-container" style="display:none;"></div>
            <button id="show-films-btn">Show Films</button>
            <div id="starships-container" style="display:none;"></div>
            <button id="show-starships-btn">Show Starships</button>
            <div id="species-container" style="display:none;"></div>
            <button id="show-species-btn">Show Species</button>
            <div id="vehicles-container" style="display:none;"></div>
            <button id="show-vehicles-btn">Show Vehicles</button>`;
          detailsContainer.innerHTML = detailsHtml;
          const showFilmsBtn = document.getElementById('show-films-btn');
          const showSpeciesBtn = document.getElementById('show-species-btn');
          const showStarshipsBtn = document.getElementById('show-starships-btn');
          const showVehiclesBtn = document.getElementById('show-vehicles-btn');
          const filmsContainer = document.getElementById('films-container');
          const speciesContainer = document.getElementById('species-container');
          const starshipsContainer = document.getElementById('starships-container');
          const vehiclesContainer = document.getElementById('vehicles-container');
          showFilmsBtn.addEventListener('click', async () => {
            if (filmsContainer.innerHTML === '') {
              const filmUrls = character.films;
              for (let i = 0; i < filmUrls.length; i++) {
                const response = await fetch(filmUrls[i]);
                const film = await response.json();
                filmsContainer.innerHTML += `<p>${film.title}</p>`;      
                }
                filmsContainer.style.display = 'block';
              }
            });
              showSpeciesBtn.addEventListener('click', async () => {
                if (speciesContainer.innerHTML === '') {
                  const speciesUrls = character.species;
                  for (let i = 0; i < speciesUrls.length; i++) {
                    const response = await fetch(speciesUrls[i]);
                    const species = await response.json();
                    speciesContainer.innerHTML += `<p>${species.name}</p>`;
                  }
                }
                speciesContainer.style.display = 'block';
              });
              showStarshipsBtn.addEventListener('click', async () => {
                if (starshipsContainer.innerHTML === '') {
                  const starshipUrls = character.starships;
                  for (let i = 0; i < starshipUrls.length; i++) {
                    const response = await fetch(starshipUrls[i]);
                    const starship = await response.json();
                    starshipsContainer.innerHTML += `<p>${starship.name}</p>`;
                  }
                }
                starshipsContainer.style.display = 'block';
              });
              showVehiclesBtn.addEventListener('click', async () => {
                if (vehiclesContainer.innerHTML === '') {
                  const vehicleUrls = character.vehicles;
                  for (let i = 0; i < vehicleUrls.length; i++) {
                    const response = await fetch(vehicleUrls[i]);
                    const vehicle = await response.json();
                    vehiclesContainer.innerHTML += `<p>${vehicle.name}</p>`;
                  }
                }
                vehiclesContainer.style.display = 'block';
              });
            });
          }
        }
    }
});