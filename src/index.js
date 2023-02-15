// code here
const ul = document.querySelector("#character-list");
const characterName = document.querySelector("#name");
const characterImage = document.querySelector("#characterimage");
const description = document.querySelector(".character-description");
const addButton = document.querySelector(".like-character")
const favoriteList = document.querySelector(".favorite-list")
const favoriteNames = document.querySelectorAll(".favorite-list li")
const form = document.querySelector("#form")
let currentCharacter
let characters
const dropDown = document.querySelector("#character-dropdown")
const forward = document.querySelector("#forward")
const back = document.querySelector("#back")
let page = 1;


dropDown.addEventListener("change", (e) => {
    ul.innerHTML = ''
    fetch('http://localhost:3000/characters')
    .then(Response => Response.json())
    .then(dataCharacters => {
        const results = dataCharacters.filter(character => character.name[0] === e.target.value.toUpperCase())
        results.forEach(renderCharacterList)
    }
    )
})

fetch(`http://localhost:3000/characters?_limit=20`)
.then(Response => Response.json())
.then(dataCharacters => {
    ul.innerHTML = ""
    characters = dataCharacters
    dataCharacters.forEach(renderCharacterList)}
)

forward.addEventListener("click", () => {
    if (page < 3) {
        page += 1;
        ul.innerHTML = ""
        fetch(`http://localhost:3000/characters?_limit=20&_page=${page}`)
        .then(Response => Response.json())
        .then(dataCharacters => {
            dataCharacters.forEach(renderCharacterList)
        })
    }
    
})

back.addEventListener("click", () => {
    if (page >= 2) {
        ul.innerHTML = ""
        page -= 1;

        fetch(`http://localhost:3000/characters?_limit=20&_page=${page}`)
        .then(Response => Response.json())
        .then(dataCharacters => {
            dataCharacters.forEach(renderCharacterList)
        })
    }
})

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

    faveLi.addEventListener("click", (e) => {
        e.target.remove()
    })
}


// form
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const newCharacter = {
        name: e.target.name.value,
        image: e.target.image.value,
        description: e.target.description.value
    }
    renderCharacterList(newCharacter)
    fetch("http://localhost:3000/characters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body : JSON.stringify(newCharacter)
    })
})

//  helper function for the form
function fillIn(form, data) {
    for (field in data) {
      // use [] notation for accessing data stored 
      // in an object at variable keys, i.e. when
      // we don't know the key name up front.
      // In this case, it comes from an argument.
      form[field].value = data[field]
    }
  }
fillIn(form, {
    // name: "Thanos",
    // image: "https://w0.peakpx.com/wallpaper/55/926/HD-wallpaper-thanos-crown-infinity-war-marvel-movie.jpg",
    // description: "Thanos is a supervillain appearing in American comic books published by Marvel Comics. Created by writer-artist Jim Starlin, the character first appeared in The Invincible Iron Man #55. "
  })
