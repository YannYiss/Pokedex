const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
getPokemonInfo(params.id);

setTimeout(() => {
    let shiny = false;
    let img = document.getElementById(params.id);
    img.addEventListener("click", function() {
        if(shiny === false){
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${params.id}.png`;
            shiny = true;
        } else {
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`;
            shiny = false;
        }
    })
}, 500);
