const input = document.getElementById("pokemon-input");
const btn = document.querySelector("button");


btn.addEventListener("click", () => {
    fetchPokemon(input.value.trim().toLowerCase());
})

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
        fetchPokemon(input.value.trim().toLowerCase());
    }
})


function fetchPokemon(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  .then(response => {
    console.log("Statuskod:", response.status);
    console.log("OK?:", response.ok);

    if (!response.ok) {
      // Om statuskoden inte är 200-299 kastar vi ett fel
      throw new Error(`Pokémon ${name} not found`);
    }

    return response.json();
  })
  .then(data => {
    // Här hanterar vi den faktiska datan
    renderPokemon(data);
    console.log("Data:", data);
  })
  .catch(error => {
    // Här hamnar vi om nätverket dör ELLER om vi kastade felet ovan
    // console.error("Error:", error.message);
    document.querySelector(".result").innerHTML = `<p>No Pokémon found with the name '${name}'. Check your spelling.</p>`
  });
}

function renderPokemon(data) {
    const name = data.name;
    const sprite = data.sprites.front_default;
    const height = data.height; 
    const weight = data.weight; 
    const type = data.types; 
    const baseExperience = data.base_experience; 
    const stats = data.stats; 
    const id = data.id;
    const abilities = data.abilities;

    document.querySelector(".result").innerHTML = `
    <p>ID: ${id}</p>
    <h2>${name}</h2>
    ${sprite ? `<img src="${sprite}" />` : `<p>No image found</p>`}
    <p>Types: ${type.map(t =>t.type.name).join(", ")}</p>
    <p>Stats: ${stats.map(s =>s.stat.name).join(", ")}</p>
    <p>Height: ${height}</p>
    <p>Weight: ${weight}</p>  
    <p>Abilities: ${abilities.map(a =>a.ability.name).join(", ")}</p>
    <p>Base Experience: ${baseExperience}</p>
    
    `
    
}