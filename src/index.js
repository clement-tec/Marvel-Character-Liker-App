// code here
const ul = document.querySelector("#character-list");
const characterName = document.querySelector("#name");
const characterImage = document.querySelector("#characterimage");
const description = document.querySelector(".character-description");
const addButton = document.querySelector(".like-character")
const favoriteList = document.querySelector(".favorite-list")
const favoriteNames = document.querySelectorAll(".favorite-list li")
let currentCharacter



fetch('http://localhost:3000/characters')
.then(Response => Response.json())
.then(dataCharacters => dataCharacters.forEach(renderCharacterList))

const renderCharacterList = (character) => {
  
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
    if (document.querySelectorAll(".favorite-list li").length === 0) {
        createFaveList(currentCharacter)
    } else if (document.querySelectorAll(".favorite-list li").length >= 1) {
        const favoriteNamesArr = Array.from(document.querySelectorAll(".favorite-list li"))
        const results = favoriteNamesArr.filter(item => item.textContent === currentCharacter.name.toUpperCase())
        if (results.length === 0) {
            createFaveList(currentCharacter)
        }
    }
})

function createFaveList(currentCharacter) {
    const faveLi = document.createElement("li")
    faveLi.textContent = currentCharacter.name.toUpperCase()
    favoriteList.append(faveLi)
}

// document.querySelector(".favorite-list li").textContent
// 'CAPTAIN AMERICA'
// document.querySelectorAll(".favorite-list li")[1].textContent
// 'PUNISHER'