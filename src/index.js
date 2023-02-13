// code here
const ul = document.querySelector("#character-list");
const characterName = document.querySelector("#name");
const characterImage = document.querySelector("#characterimage");
const description = document.querySelector(".character-description");
const addButton = document.querySelector(".like-character")
const favoriteList = document.querySelector(".favorite-list")
let currentCharacter



fetch('http://localhost:3000/characters')
.then(Response => Response.json())
.then(dataCharacters => dataCharacters.forEach(renderCharacterList))

const renderCharacterList = (character) => {
    console.log(character);
    
    const li = document.createElement('li');
    li.style.cursor = 'pointer';
    li.textContent = character.name.toUpperCase();
    ul.appendChild(li);

    li.addEventListener("click", () => {
        currentCharacter = character;
        characterName.textContent = character.name
        characterImage.src = character.image
        description.textContent = character.description
    })

    
    
}

addButton.addEventListener("click", () => {
    const faveLi = document.createElement("li")
    faveLi.textContent = currentCharacter.name
    favoriteList.append(faveLi)


})
