let statsStyleData = [
    'height: 20px; background-color: green; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: red; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: lightblue; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: red; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: lightblue; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: orange; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
];

let statsArray;
let currentPokemon;
let PokemonNameUrlList;
let pokemonAbilitiesNameList;
let pokemonAbilitiesNamesText = '';

// Example, delete later
async function getApiInfo(){
    // let query = document.getElementById('searchQuery').value;
    let url = `https://www.openthesaurus.de/synonyme/search?q=${query}&format=application/json`;
    // mit fetch wird die url in den klammern heruntergeladen !
    let response = await fetch(url);
    // mit .json() wird die heruntergaladene Datei in ein Json Format umgewandelt.
    let responseJson = await response.json();
    // let synsets =  await responseJson['synsets'];
};
// Example, delete later end


// get data from api
async function loadPokemons(){
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);
    renderPokemonInfo();
};


// not used jet Pokemon name and url list
async function loadPokemonNamesAndUrl(){
    let amount = 100;
    let listUrl = `https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=0`;
    let response = await fetch(listUrl);
    PokemonNameUrlList = await response.json();
};
// get data from api end


// render detail view
async function renderPokemonInfo(){
    fillStatsArray();
    let pokemonName = currentPokemon['name'];
    let pokemonId = currentPokemon['id'];
    loadPokemonImg();
    
    let weight = currentPokemon['weight']/10;
    let height = currentPokemon['height']/10;
    // noch hinzufügen zur Karte
    let movesArray = currentPokemon['moves'];//muss noch weiter unterteilt werden !
     // noch hinzufügen zur Karte ende
    getAbilitiesNames();
    let pokemonTypeArray = await loadTypesArray();
   
    document.getElementById('pokemon').innerHTML = /*html*/` 
        <h1 class='upperCase'>${pokemonName}</h1>
        <div id="pokemonType">
            <div id="top">
                
            </div>
            <div id="bottom">
                <p><b>Size:</b><br>${height} m</p>
                <p><b>Weight:</b><br>${weight} kg</p>
            </div>
        </div>`;

    document.getElementById('pokemonId').innerHTML += /*html*/`
        <span class='idInfo'>ID: ${pokemonId}</span>
        <span class='abilities'><b>Abilities:</b> ${pokemonAbilitiesNamesText}</span>
        <nav>
            <button onclick='showStats()'>Stats</button>
            <button>Moves</button>
        </nav>`;
    
    document.getElementById('top').innerHTML = '';
    for (let i = 0; i < pokemonTypeArray.length; i++) {
        document.getElementById('top').innerHTML += /*html*/`
        <p class='type'>${pokemonTypeArray[i]}</p>`
    };

    await statsHtml();
    setStatsStyle();
};


// pokemon img selection functions
async function loadPokemonImg(){
    let pokemonImgSrc = await imageSelection();
    document.getElementById('pokemonImg').src = '';
    document.getElementById('pokemonImg').src = pokemonImgSrc;
};


function imageSelection(){
    let imageBoolStatus = pushImgSourcesToArray();
    let bestChoice;
    for (let i = 0; i < imageBoolStatus.length; i++) {
        if (imageBoolStatus[i]){
            bestChoice = imageBoolStatus[i];   
        };
    };
    return bestChoice;
};


function pushImgSourcesToArray(){
    let imageBoolStatus= [];
    let imgchoise0 = currentPokemon['sprites']['other']['dream_world']['front_default'];
    let imgchoise1 = currentPokemon['sprites']['other']['home']['front_default'];
    let imgchoise2 = currentPokemon['sprites']['other']['home']['front_female'];
    let imgchoise3 = currentPokemon['sprites']['other']['home']['front_shiny'];
    let imgchoise4 = currentPokemon['sprites']['other']['home']['front_shiny_female'];
    let imgchoise5 = currentPokemon['sprites']['front_shiny'];
    imageBoolStatus.push(imgchoise5, imgchoise4, imgchoise3, imgchoise2, imgchoise1, imgchoise0);
    return imageBoolStatus;
};
// pokemon img selection functions end


// pokemon types functions
function loadTypesArray(){
    let pokemonTypesArray =[];
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        let pokemonType = currentPokemon['types'][i]['type']['name'];
        pokemonTypesArray.push(pokemonType);
    };
    return pokemonTypesArray;
};
// pokemon types functions


// pokemon abilities functions
function getAbilitiesNames(){
    pokemonAbilitiesNameList = [];
    pokemonAbilitiesNamesText = '';
    let abilitiesList = currentPokemon['abilities']; //muss noch weiter unterteilt werden !
    for (let i = 0; i < abilitiesList.length; i++) {
        pokemonAbilitiesNameList.push(abilitiesList[i]['ability']['name']);
        pokemonAbilitiesNamesText += `${abilitiesList[i]['ability']['name']}; `; 
    };
    console.log(pokemonAbilitiesNamesText)
};

// pokemon abilities functions end

async function showStats(){
    await statsHtml();
    setStatsStyle();
};


function fillStatsArray(){
    statsArray = [];
    let pokemonStats = currentPokemon['stats'];
    for (let i = 0; i < pokemonStats.length; i++) {
        let pokemonStatsName = pokemonStats[i]['stat']['name'];
        let pokemonStatValue = pokemonStats[i]['base_stat'];
        let jsonData = {'statsName': pokemonStatsName, 'statValue': pokemonStatValue}
        statsArray.push(jsonData);
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


function setStatsStyle(){
    for (let styleIndex = 0; styleIndex < statsStyleData.length; styleIndex++) {
        let statValue = statsArray[styleIndex]['statValue'];
        let styleData =   statsStyleData[styleIndex] + `width: ${statValue}px;`;
        document.getElementById(`percentBar${styleIndex}`).style = styleData;
    };   
};
// render detail view end


// popup functions
function showPokemonDetails(){
    document.getElementById('cardPokemonDetails').classList.remove('d-none');
};


function hiddenPokemonDetails(){
    document.getElementById('cardPokemonDetails').classList.add('d-none');
};


function notClose(event){
    event.stopPropagation();
};
// popup functions end


