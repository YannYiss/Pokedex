
//Function to get specific pokemon Information
function getPokemonInfo(input) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${input}`)
        .then(response => {
            if(response.status === 200) {
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
            //Seciton background
                let mainType = response.data.types[0].type.name;
                if(mainType == "fighting") {
                    main.style.backgroundColor = "rgba(219, 130, 130, 0.836)";
                } else if(mainType == "flying") {
                    main.style.backgroundColor = "rgba(183, 189, 204, 0.836)"; 
                }else if(mainType == "poison"){
                    main.style.backgroundColor = "rgba(209, 130, 219, 0.836)";
                } else if (mainType == "ground") {
                    main.style.backgroundColor = "rgba(226, 171, 99, 0.836)";
                }else if (mainType == "bug"){
                    main.style.backgroundColor = "rgba(117, 175, 105, 0.836)";
                }else if(mainType == "ghost") {
                    main.style.backgroundColor = "rgba(228, 228, 228, 0.536)";
                } else if(mainType == "steel") {
                    main.style.backgroundColor = "rgba(172, 172, 172, 0.836)";
                }else if(mainType == "fire") {
                    main.style.backgroundColor = "rgba(245, 81, 81, 0.836)";
                }else if(mainType == "water") {
                    main.style.backgroundColor = "rgba(115, 140, 255, 0.836)";
                }else if(mainType == "grass") {
                    main.style.backgroundColor = "rgba(177, 255, 146, 0.836)";
                }else if(mainType == "electric") {
                    main.style.backgroundColor = "rgba(238, 255, 2, 0.836)";
                }else if(mainType == "psychic") {
                    main.style.backgroundColor = "rgba(220, 183, 228, 0.836)";
                }else if(mainType == "ice") {
                    main.style.backgroundColor = "rgba(164, 234, 255, 0.836)";
                }else if(mainType == "dragon") {
                    main.style.backgroundColor = "rgba(127, 139, 245, 0.836)";
                }else if(mainType == "dark") {
                    main.style.backgroundColor = "rgba(128, 128, 128, 0.836)";
                }else if(mainType == "fairy") {
                    main.style.backgroundColor = "rgba(247, 160, 239, 0.836)";
                }else if(mainType == "shadow") {
                    main.style.backgroundColor = "rgba(128, 128, 128, 0.836)";
                } else {
                    main.style.backgroundColor = "rgba(245, 245, 245, 0.836)";
                }
                let pokeId = response.data.id;
            //pokeIntro code
                let pokeName = response.data.name;
                let pokeIntro = document.getElementById("pokeIntro");
                let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.data.id}.png`;
                let pokeImage = document.createElement("img");
                pokeImage.id = pokeId;
                pokeImage.src = imgUrl;
                let pokeTitle = document.createElement("h2");
                firstChr = pokeName.charAt(0).toUpperCase();
                lastLetters = pokeName.slice(1);
                pokeTitle.textContent = "#" + pokeId + " " + firstChr + lastLetters;
                pokeIntro.appendChild(pokeImage);
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
            //Shiny Function
                setTimeout(() => {
                    let shiny = false;
                    pokeImage.addEventListener("click", function() {
                        if(shiny === false){
                            pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokeId}.png`;
                            shiny = true;
                        } else {
                            pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`;
                            shiny = false;
                        }
                    })
                }, 500);
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
const main = document.getElementById("main");
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
