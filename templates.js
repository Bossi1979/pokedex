

function pokemonDetailsTopContainerHtml(){
    let pokemonName = currentPokemon['name'];
    let weight = currentPokemon['weight']/10;
    let height = currentPokemon['height']/10;
    return /*html*/` 
        <h1 class='upperCase'>${pokemonName}</h1>
        <div id="pokemonType">
            <div id="top">
                
            </div>
            <div id="bottom">
                <p><b>Size:</b><br>${height} m</p>
                <p><b>Weight:</b><br>${weight} kg</p>
            </div>
        </div>`;
};


function pokemonDetailsBottomContainerHtml(){
    let pokemonId = currentPokemon['id'];
    return /*html*/`
        <span class='idInfo'>ID: ${pokemonId}</span>
        <span class='abilities'><b>Abilities:</b> ${pokemonAbilitiesNamesText}</span>
        <nav>
            <button onclick='showStats()'>Stats</button>
            <button>Moves</button>
        </nav>`;
};


function PokemonDetailsTopContainerTypesHtml(pokemonTypeArray){
    document.getElementById('top').innerHTML = '';
    for (let i = 0; i < pokemonTypeArray.length; i++) {
        document.getElementById('top').innerHTML += /*html*/`
        <p class='type'>${pokemonTypeArray[i]}</p>`
    };
};


function statsHtml(){
    document.getElementById('stats').innerHTML = '';
    for (let index = 0; index < statsArray.length; index++) {
        let statName = statsArray[index]['statsName'];
        let statValue = statsArray[index]['statValue'];
        document.getElementById('stats').innerHTML += `
        <tr>
            <td class='upperCase'>${statName}</td>
            <td><div id='percentBar${index}'>${statValue}</div><td>
        </tr>`;
    };
};
