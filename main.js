
//Function to get specific pokemon Information
function getPokemonInfo(input) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${input}`)
        .then(response => {
            if(response.status === 200) {
            //pokeIntro code
                let main = document.getElementById("main");
                let reset = 
                    `<section id="pokeIntro">
                    </section>
                    <div id="infoSection">
                        <section id="pokeMain">
                        </section>
                        <section id="pokeMisc">
                        </section>
                    </div>`
                main.innerHTML = reset;
                let pokeName = response.data.name;
                let pokeIntro = document.getElementById("pokeIntro");
                let imgUrl = response.data.sprites.front_default;
                let pokeImage = document.createElement("img");
                pokeImage.id = response.data.id;
                pokeImage.src = imgUrl;
                pokeIntro.appendChild(pokeImage);
                let pokeTitle = document.createElement("h2");
                firstChr = pokeName.charAt(0).toUpperCase();
                lastLetters = pokeName.slice(1);
                pokeTitle.textContent = "#" + response.data.id + " " + firstChr + lastLetters;
                pokeIntro.appendChild(pokeTitle);
            //pokeMain code
                let pokeMain = document.getElementById("pokeMain");
                //weight
                let wTitle = document.createElement("h3");
                wTitle.textContent = "Weight";
                let pokeW = document.createElement("p");
                pokeW.textContent = response.data.weight + " Lb.";
                pokeMain.appendChild(wTitle);
                pokeMain.appendChild(pokeW);
                //height
                let hTitle = document.createElement("h3");
                hTitle.textContent = "Height";
                let pokeH = document.createElement("p");
                pokeH.textContent =  response.data.height + " ft.";
                pokeMain.appendChild(hTitle);
                pokeMain.appendChild(pokeH);
                //type
                let typeTitle = document.createElement("h3");
                typeTitle.textContent = "Pokemon Type";
                pokeMain.appendChild(typeTitle);
                response.data.types.map(item => {
                    let pokeType = document.createElement("p");
                    pokeType.textContent = item.type.name.toUpperCase();
                    pokeMain.appendChild(pokeType);
                });
            //pokeMisc code
                let pokeMisc = document.getElementById("pokeMisc");
                //ability
                let abilityTitle = document.createElement("h3");
                abilityTitle.textContent = "Abilities"
                pokeMisc.appendChild(abilityTitle);
                response.data.abilities.map(item => {
                    let ability = document.createElement("p");
                    ability.textContent = item.ability.name;
                    pokeMisc.appendChild(ability);
                });
                //moves
                let moveTitle = document.createElement("h3");
                moveTitle.textContent = "Main moves:";
                pokeMisc.appendChild(moveTitle);
                for(let i = 0; i < 5; i++) {
                    let move = document.createElement("p");
                    move.textContent = response.data.moves[i].move.name;
                    pokeMisc.appendChild(move);
                };
            } else {
                let main = document.getElementById("main");
                let errorMessage = document.createElement("h1");
                errorMessage.textContent = "We haven't find that pokemon yet!"
                main.appendChild(errorMessage);
            };
        })
        .catch(e => console.log(e));
};

//Search button function
const allPoke = document.getElementById("allPoke");
const search = document.getElementById("search");
let main = document.getElementById("main");
search.addEventListener("click", function() {
    allPoke.hidden = true;
    main.hidden = false;
    let input = document.getElementById("input").value.toLowerCase();
    getPokemonInfo(input);
});

//Random pokemon function
const random = document.getElementById("random");
random.addEventListener("click", function() {
    allPoke.hidden = true;
    main.hidden = false;
    let randomNumber = Math.floor(Math.random() * 890);
    getPokemonInfo(randomNumber);
});

//Show all pokemon function 
function showAllpokemon() {
    let allPoke = document.getElementById("allPoke");
    let i = 1;
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
        .then(response => {
            if(response.status === 200) {
                response.data.results.map(item =>{
                    let pokeName = item.name;
                    let link = document.createElement("a");
                    link.href = "detalle.html?id=" + i;
                    link.id = i;
                    let card = document.createElement("div");
                    card.className = "pokeCard";
                    let cardTitle = document.createElement("h3");
                    cardTitle.textContent = "#" + i + " " + item.name;
                    let img = document.createElement("img");
                    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
                    link.appendChild(card);
                    card.appendChild(img);
                    card.appendChild(cardTitle);
                    allPoke.appendChild(link);
                    i++
                });
            };
        })
        .catch(e => console.log(e))
}

let logo = document.getElementById("logo");
logo.addEventListener("click", function() {
    main.hidden = true;
    allPoke.hidden = false;
    showAllpokemon();
});
