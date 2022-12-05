function pokemonContentHtml(pokemonName, index){
    return /*html*/`
        <div class='pokemonNameCard' id='pokemonNameCard${index}' onclick='showDetails(${index})'>
            <h2 class='upperCase'>${pokemonName}</h2>
            <div class="pokemonShortData">
                <div class="imgContent" id='imgContent${index}'></div>

                <div id='contentTypes${index}'>
                    
                </div>
            </div>
        </div>`;
};


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


function pokemonTypesHtml(i, index){
    return /*html*/`
        <p id='subType${i}${index}'>${pokemonContentTypesArray[index]}</p>`;
};


function pokemonDetailsBottomContainerHtml(){
    let pokemonId = currentPokemon['id'];
    return /*html*/`
        <span class='idInfo'>ID: ${pokemonId}</span>
        <span class='abilities'><b>Abilities:</b> ${pokemonAbilitiesNamesText}</span>
        <nav>
            <button onclick='showStats()'>Stats</button>
            <button onclick='showMoves()'>Moves</button>
        </nav>`;
};


function PokemonDetailsTopContainerTypesHtml(pokemonTypeArray){
    document.getElementById('top').innerHTML = '';
    for (let i = 0; i < pokemonTypeArray.length; i++) {
        document.getElementById('top').innerHTML += /*html*/`
        <p class='type' id='type${i}'>${pokemonTypeArray[i]}</p>`
    };
};


async function statsHtml(){
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


function movesHtml(){
    return /*html*/`
        <p>${moves}</p>`;
};


function notFoundHtml(){
    return /*html*/`
        <div>
            <h3>Pokemon not Found!</h3>
        </div>`;
};
