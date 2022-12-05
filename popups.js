function showPokemonDetails() {
    document.getElementById('cardPokemonDetails').classList.remove('d-none');
    disableYScrollbar();
}


function hiddenPokemonDetails() {
    document.getElementById('cardPokemonDetails').classList.add('d-none');
    enableYScrollbar();
}


function notClose(event) {
    event.stopPropagation();
}


function disableYScrollbar(){
    document.getElementById('body').classList.add('overflowHidden');
}


function enableYScrollbar(){
    document.getElementById('body').classList.remove('overflowHidden');
}


function enableLoadingWindow(){
    document.getElementById('loadingIndication').classList.remove('d-none');
    disableYScrollbar();
}


function disableLoadingWindow(){
    document.getElementById('loadingIndication').classList.add('d-none');
    enableYScrollbar();
}


function loadingCounter(){
    if (noLoadingOrSearchActiv()){
        loadingWindow = true;
        enableLoadingWindow();
    };
    if (loadingComplete()){
        loadingWindow = false;
        disableLoadingWindow();
    };
    loadingPercent += 1;
    setPercentValue(loadingPercent);
}


function noLoadingOrSearchActiv(){
    return !loadingWindow && !searchAktiv;
}


function loadingComplete(){
    return loadingWindow && loadingPercent >= 100;
}


function setPercentValue(loadedPercent){
    document.getElementById('percentValue').innerHTML = '';
    document.getElementById('percentValue').innerHTML = `${loadedPercent}%`;
    setLoadBar(loadedPercent);
}


function setLoadBar(loadedPercent){
    document.getElementById('percentBar').style = `width: ${loadedPercent}%;`;
}

