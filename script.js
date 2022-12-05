// start functions
async function initOverview() {
    await loadPokemonNamesAndUrl();
    renderPokemonOverwiev(cardNoStart, cardNoStop);
};


async function loadPokemonNamesAndUrl() {
    let amount = 10000;
    let listUrl = `https://pokeapi.co/api/v2/pokemon?limit=${amount}&offset=0`;
    let response = await fetch(listUrl);
    pokemonNameUrlList = await response.json();
};
// start functions end


// Overview functions
async function renderPokemonOverwiev(startValue, endValue) {
    for (let i = +startValue; i < +endValue + 1; i++) {
        let pokemonName = pokemonNameUrlList['results'][i]['name'];
        let pokemonUrl = pokemonNameUrlList['results'][i]['url'];
        let response = await fetch(pokemonUrl);
        currentContentPokemon = await response.json();
        let imgScr = await loadPokemonContentImg();
        pokemonContentTypesArray = await loadContentTypesArray();
        document.getElementById('pokemonContent').innerHTML += pokemonContentHtml(pokemonName, i);
        document.getElementById(`imgContent${i}`).style = `background-image: url('${imgScr}');`;
        setTypeOverviewBackground(i);
        loadingCounter();
    };
    changeCardNoStartAndStop();
};


function setTypeOverviewBackground(i){
    for (let index = 0; index < pokemonContentTypesArray.length; index++) {
        if (pokemonTypesAvailable(index)) {
            document.getElementById(`contentTypes${i}`).innerHTML += pokemonTypesHtml(i, index);
            cardBackroundColorChange(i);
            typeBackgroundChange(i, index);
        };
    };
};


function pokemonTypesAvailable(index){
    return pokemonContentTypesArray[index];
};


function changeCardNoStartAndStop(){
    cardNoStart += 100;
    cardNoStop += 100;
    loadingPercent = 1;
};


// pokemon img selection overview functions
async function loadPokemonContentImg() {
    let imgSrc = await imageContentSelection();
    return imgSrc;
};


async function imageContentSelection() {
    imageBoolStatus = pushContentImgSourcesToArray();
    let bestChoice;
    for (let i = 0; i < imageBoolStatus.length; i++) {
        if (imageUrlExist(i)) {
            bestChoice = imageBoolStatus[i];
        };
    };
    return bestChoice;
};


function pushContentImgSourcesToArray() {
    let imageBoolStatus = [];
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
function loadContentTypesArray() {
    pokemonContentTypesArray = [];
    for (let i = 0; i < currentContentPokemon['types'].length; i++) {
        let pokemonType = currentContentPokemon['types'][i]['type']['name'];
        pokemonContentTypesArray.push(pokemonType);
    };
    return pokemonContentTypesArray;
};


function cardBackroundColorChange(cardIndex) {
    for (let i = 0; i < backgroundColorStyleArray.length; i++) {
        let styleType = backgroundColorStyleArray[i]['type'];
        if (styleTypeIsEqualToPokemonMainType(styleType)) {
            let backgroundStyle = backgroundColorStyleArray[i]['style'];
            document.getElementById(`pokemonNameCard${cardIndex}`).style = backgroundStyle;
        };
    };
};


function styleTypeIsEqualToPokemonMainType(styleType){
    return styleType == pokemonContentTypesArray[0];
};


function typeBackgroundChange(cardIndex, typeIndex) {
    for (let y = 0; y < backgroundColorStyleArray.length; y++) {
        let styleType = backgroundColorStyleArray[y]['type'];
        if (pokemonStyleAvailable(styleType, typeIndex)) {
            let backgroundStyle = backgroundColorStyleArray[y]['style'];
            document.getElementById(`subType${cardIndex}${typeIndex}`).style = backgroundStyle;
        };
    };
};


function pokemonStyleAvailable(styleType, typeIndex){
    return styleType == pokemonContentTypesArray[typeIndex];
};
// pokemon Overview types functions end


// scroll detection add Pokemoncards at 90% scroll down
async function scrollDetected() {
    let maxHeight = document.body.scrollHeight - window.innerHeight;
    let scrollDownValue = (window.pageYOffset * 100) / maxHeight;
    if (ScrollDownToMoreThan90Percent(scrollDownValue, addidingPokemonStatus )) {
        addidingPokemonStatus = true;
        await renderPokemonOverwiev(cardNoStart, cardNoStop);
        addidingPokemonStatus = false;
    };
};


function ScrollDownToMoreThan90Percent(scrollDownValue, addidingPokemonStatus ){
    return scrollDownValue > 90 && !addidingPokemonStatus;
};
// scroll Detection add Pokemoncards at 90% scroll down end
// Overview functions end


// details view functions
// details view start functions
function showDetails(pokemonIndex) {
    let pokemonUrl = pokemonNameUrlList['results'][pokemonIndex]['url'];
    loadPokemons(pokemonUrl);
};


async function loadPokemons(url) {
    let response = await fetch(url);
    currentPokemon = await response.json();
    renderPokemonInfo();
};
// details view start functions end


// render detail view
async function renderPokemonInfo() {
    fillStatsArray();
    loadPokemonImg();
    getMovesArray();
    getAbilitiesNames();
    await loadTypesArray();
    document.getElementById('pokemon').innerHTML = pokemonDetailsTopContainerHtml();
    document.getElementById('pokemonId').innerHTML = pokemonDetailsBottomContainerHtml();
    PokemonDetailsTopContainerTypesHtml(pokemonTypesArray);
    setTypeBackground();
    setCardBackground();
    await statsHtml();
    setStatsStyle();
    showPokemonDetails();
};


// pokemon img selection functions
async function loadPokemonImg() {
    let pokemonImgSrc = await imageSelection();
    document.getElementById('pokemonImg').src = '';
    document.getElementById('pokemonImg').src = pokemonImgSrc;
};


function imageSelection() {
    imageBoolStatus = pushImgSourcesToArray();
    let bestChoice;
    for (let i = 0; i < imageBoolStatus.length; i++) {
        if (imageUrlExist(i)) {
            bestChoice = imageBoolStatus[i];
        };
    };
    return bestChoice;
};


function imageUrlExist(index){
    return imageBoolStatus[index];
};


function pushImgSourcesToArray() {
    imageBoolStatus = [];
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
async function loadTypesArray() {
    pokemonTypesArray = [];
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        let pokemonType = currentPokemon['types'][i]['type']['name'];
        pokemonTypesArray.push(pokemonType);
    };
};


function setTypeBackground() {
    for (let i = 0; i < pokemonTypesArray.length; i++) {
        let type = pokemonTypesArray[i];
        for (let index = 0; index < backgroundColorStyleArray.length; index++) {
            let backgroundtype = backgroundColorStyleArray[index]['type'];
            if (backgroundTypeColorFound(backgroundtype, type)) {
                document.getElementById(`type${i}`).style = backgroundColorStyleArray[index]['style'];
            };
        };
    };
};


function backgroundTypeColorFound(backgroundtype, type){
    return backgroundtype == type;
};


function setCardBackground() {
    let type = pokemonTypesArray[0];
    for (let index = 0; index < backgroundColorStyleArray.length; index++) {
        let backgroundtype = backgroundColorStyleArray[index]['type'];
        if (backgroundTypeColorFound(backgroundtype, type)) {
            document.getElementById(`pokemon`).style = backgroundColorStyleArray[index]['style'];
        };
    };
};
// pokemon types functions


// pokemon moves functions
function getMovesArray() {
    movesArray = [];
    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        let move = currentPokemon['moves'][i]['move']['name'];
        movesArray.push(move);
    };
    renderMoves();
};


async function showMoves() {
    document.getElementById('stats').innerHTML = '';
    document.getElementById('stats').innerHTML = movesHtml();
};


function renderMoves() {
    moves = '';
    for (let i = 0; i < movesArray.length; i++) {
        let move = movesArray[i];
        moves += move + '; ';
    };
};
//pokemon moves functions end


// pokemon abilities functions
function getAbilitiesNames() {
    pokemonAbilitiesNameList = [];
    pokemonAbilitiesNamesText = '';
    let abilitiesList = currentPokemon['abilities'];
    for (let i = 0; i < abilitiesList.length; i++) {
        pokemonAbilitiesNameList.push(abilitiesList[i]['ability']['name']);
        pokemonAbilitiesNamesText += `${abilitiesList[i]['ability']['name']}; `;
    };
};
// pokemon abilities functions end


// fill details tables
function fillStatsArray() {
    statsArray = [];
    let pokemonStats = currentPokemon['stats'];
    for (let i = 0; i < pokemonStats.length; i++) {
        let pokemonStatsName = pokemonStats[i]['stat']['name'];
        let pokemonStatValue = pokemonStats[i]['base_stat'];
        let jsonData = { 'statsName': pokemonStatsName, 'statValue': pokemonStatValue };
        statsArray.push(jsonData);
    };
};


function setStatsStyle() {
    for (let styleIndex = 0; styleIndex < statsStyleData.length; styleIndex++) {
        let statValue = statsArray[styleIndex]['statValue'];
        let styleData = statsStyleData[styleIndex] + `width: ${statValue}px;`;
        document.getElementById(`percentBar${styleIndex}`).style = styleData;
    };
};


function showStats() {
    statsHtml();
    setStatsStyle();
};
// fill details tabels end
// render detail view end


// search functions
async function searchInputReadIn() {
    let input = document.getElementById('searchInput').value;
    let searchValue = input.toLowerCase();
    await getSearchArray(searchValue);
    searchAktiv = true;
    showSearchResults();
    clearSearch();
};


function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchInput').blur();
};


async function getSearchArray(searchValue) {
    findingsArray = [];
    if (searchValueValid(searchValue)) {
        for (let i = 0; i < pokemonNameUrlList['results'].length; i++) {
            let element = pokemonNameUrlList['results'][i]['name'];
            if (foundSearchMatch(element, searchValue)) {
                findingsArray.push(i);
            };
        };
    };
    searchAktiv = false;
};


function searchValueValid(searchValue){
    return searchValue.length > 2
};


function foundSearchMatch(element, searchValue){
    return element.includes(searchValue);
};


function showSearchResults() {
    document.getElementById('pokemonContent').innerHTML = '';
    for (let i = 0; i < findingsArray.length; i++) {
        renderPokemonOverwiev(findingsArray[i], findingsArray[i])
    };
    if (noSearchMatch()){
        showNotFound();
    };
};


function noSearchMatch(){
    return findingsArray.length == 0;
};


function showNotFound(){
    document.getElementById('pokemonContent').innerHTML = notFoundHtml();
};








