//globals
let backgroundColorStyleArray = [
    {
        'type': 'fire',
        'style': 'background-color: #f08639;'
    },
    {
        'type': 'water',
        'style': 'background-color: #769af1;'
    },
    {
        'type': 'bug',
        'style': 'background-color: #adbc21;'
    },
    {
        'type': 'normal',
        'style': 'background-color: #adac7e;'
    },
    {
        'type': 'poison',
        'style': 'background-color: #a842a6;'
    },
    {
        'type': 'grass',
        'style': 'background-color: #7dca57;'
    },
    {
        'type': 'flying',
        'style': 'background-color: #ab94f0;'
    },
    {
        'type': 'ground',
        'style': 'background-color: #e2c370;'
    },
    {
        'type': 'electric',
        'style': 'background-color: #f8d135;'
    },
    {
        'type': 'fairy',
        'style': 'background-color: #fe86e9;'
    },
    {
        'type': 'fighting',
        'style': 'background-color: #cc352c;'
    },
    {
        'type': 'psychic',
        'style': 'background-color: #f96491;'
    },
    {
        'type': 'rock',
        'style': 'background-color: #bfa73d;'
    },

    {
        'type': 'ghost',
        'style': 'background-color: #755b9c;'
    },
    {
        'type': 'steel',
        'style': 'background-color: #bebfd4;'
    },
    {
        'type': 'ice',
        'style': 'background-color: #a1dbdc;'
    },
];
let statsStyleData = [
    'height: 20px; background-color: green; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: red; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: lightblue; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: red; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: lightblue; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: orange; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
];

let cardNoStart = 0;
let cardNoStop = 99;
let addidingPokemonStatus = false;
let currentContentPokemon;
let statsArray;
let currentPokemon;
let pokemonNameUrlList;
let pokemonAbilitiesNameList;
let pokemonAbilitiesNamesText = '';
// global ends


// start function
async function initOverview(){
    await loadPokemonNamesAndUrl();
    pokemonOverwiev(cardNoStart, cardNoStop);
};

async function loadPokemonNamesAndUrl(){
    let amount = 10000;
    let listUrl = `https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=0`;
    let response = await fetch(listUrl);
    pokemonNameUrlList = await response.json();
};
// start functions end


// Overview functions
async function pokemonOverwiev(startValue, endValue){
    // document.getElementById('PokemonContent').innerHTML = '';
    for (let i = +startValue; i < +endValue+1; i++) {
        let pokemonName = pokemonNameUrlList['results'][i]['name'];

        let pokemonUrl = pokemonNameUrlList['results'][i]['url'];
        let response = await fetch(pokemonUrl);
        currentContentPokemon = await response.json();
        let imgScr = await loadPokemonContentImg();
        let pokemonContentTypesArray = await loadContentTypesArray();
        
        
        document.getElementById('PokemonContent').innerHTML += /*html*/`
            <div class='pokemonNameCard' id='pokemonNameCard${i}' onclick='showDetails(${i})'>
                <h2 class='upperCase'>${pokemonName}</h2>
                <div class="pokemonShortData">
                    <div class="imgContent" id='imgContent${i}'></div>

                    <div id='contentTypes${i}'>
                        
                    </div>
                </div>
            </div>`;
        document.getElementById(`imgContent${i}`).style = `background-image: url('${imgScr}');`;
        for (let index = 0; index < pokemonContentTypesArray.length; index++) {
            if (pokemonContentTypesArray[index]){
                document.getElementById(`contentTypes${i}`).innerHTML += /*html*/`
                    <p>${pokemonContentTypesArray[index]}</p>`;
                    backroundColorChange(i, pokemonContentTypesArray);
            };
        };
    };
    cardNoStart += 100;
    cardNoStop += 100;
};


// pokemon img selection overview functions
async function loadPokemonContentImg(){
    let imgSrc = await imageContentSelection();
    return imgSrc;
};


function imageContentSelection(){
    let imageBoolStatus = pushContentImgSourcesToArray();
    let bestChoice;
    for (let i = 0; i < imageBoolStatus.length; i++) {
        if (imageBoolStatus[i]){
            bestChoice = imageBoolStatus[i];   
        };
    };
    return bestChoice;
};


function pushContentImgSourcesToArray(){
    let imageBoolStatus= [];
    let imgchoise0 = currentContentPokemon['sprites']['other']['dream_world']['front_default'];
    let imgchoise1 = currentContentPokemon['sprites']['other']['home']['front_default'];
    let imgchoise2 = currentContentPokemon['sprites']['other']['home']['front_female'];
    let imgchoise3 = currentContentPokemon['sprites']['other']['home']['front_shiny'];
    let imgchoise4 = currentContentPokemon['sprites']['other']['home']['front_shiny_female'];
    let imgchoise5 = currentContentPokemon['sprites']['front_shiny'];
    imageBoolStatus.push(imgchoise5, imgchoise4, imgchoise3, imgchoise2, imgchoise1, imgchoise0);
    return imageBoolStatus;
};
// pokemon img selection overview functions end


// pokemon Overview types functions
function loadContentTypesArray(){
    let pokemonContentTypesArray =[];
    for (let i = 0; i < currentContentPokemon['types'].length; i++) {
        let pokemonType = currentContentPokemon['types'][i]['type']['name'];
        pokemonContentTypesArray.push(pokemonType);
        return pokemonContentTypesArray;
    };
};


function backroundColorChange(cardIndex, pokemonContentTypesArray){
    for (let i = 0; i < backgroundColorStyleArray.length; i++) {
        let styleType = backgroundColorStyleArray[i]['type'];
        if (styleType == pokemonContentTypesArray[0]){
            let backgroundStyle = backgroundColorStyleArray[i]['style']
            document.getElementById(`pokemonNameCard${cardIndex}`).style = backgroundStyle;
        };
    };
}; 
// pokemon Overview types functions end


// scroll Detection add Pokemoncards at 95% scroll down
async function scrollDetected(){
    let maxHeight = document.body.scrollHeight - window.innerHeight;
    let scrollDownValue = (window.pageYOffset * 100) / maxHeight;
    if (scrollDownValue > 95 && !addidingPokemonStatus){
        addidingPokemonStatus = true;
        await pokemonOverwiev(cardNoStart, cardNoStop);
        addidingPokemonStatus = false;
    };
};
// scroll Detection add Pokemoncards at 95% scroll down end
// Overview functions end


// details view functions
// details view start functions
function showDetails(pokemonIndex){
    let pokemonUrl = pokemonNameUrlList['results'][pokemonIndex]['url'];
    loadPokemons(pokemonUrl);
};


async function loadPokemons(url){
    // let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    renderPokemonInfo();
};
// details view start functions end


// render detail view
async function renderPokemonInfo(){
    fillStatsArray();
    loadPokemonImg();
    // noch hinzufügen zur Karte
    let movesArray = currentPokemon['moves'];//muss noch weiter unterteilt werden !
     // noch hinzufügen zur Karte ende
    getAbilitiesNames();
    let pokemonTypeArray = await loadTypesArray();

    document.getElementById('pokemon').innerHTML = pokemonDetailsTopContainerHtml(); 
    document.getElementById('pokemonId').innerHTML = pokemonDetailsBottomContainerHtml();
    PokemonDetailsTopContainerTypesHtml(pokemonTypeArray);
    await statsHtml();
    setStatsStyle();
    showPokemonDetails();
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
};

// pokemon abilities functions end


// fill details tables
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


function setStatsStyle(){
    for (let styleIndex = 0; styleIndex < statsStyleData.length; styleIndex++) {
        let statValue = statsArray[styleIndex]['statValue'];
        let styleData =   statsStyleData[styleIndex] + `width: ${statValue}px;`;
        document.getElementById(`percentBar${styleIndex}`).style = styleData;
    };   
};
// fill details tabels end
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