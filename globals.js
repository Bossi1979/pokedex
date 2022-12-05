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
    {
        'type': 'dark',
        'style': 'background-color: #755b4c;'
    },
    
];

let statsStyleData = [
    'height: 20px; background-color: green; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: red; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: blue; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: red; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: blue; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
    'height: 20px; background-color: orange; border-radius: 5px; color: white; font-size: 16px; text-align: center;',
];

let cardNoStart = 0;
let cardNoStop = 99;
let imageBoolStatus = [];
let loadingPercent = 1;
let loadingWindow = false;
let addidingPokemonStatus = false;
let currentContentPokemon;
let pokemonContentTypesArray = [];
let pokemonTypesArray = [];
let statsArray;
let movesArray = [];
let moves = '';
let currentPokemon;
let pokemonNameUrlList;
let pokemonAbilitiesNameList;
let pokemonAbilitiesNamesText = '';
let searchAktiv = false;
let findingsArray = [];
// global ends