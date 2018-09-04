document.addEventListener('DOMContentLoad', init)


function init() {
  fetch('http://localhost:3000/pups').then(r => r.json()).then(dogNamesInBar).then(dogFilterButton)
}

function dogNamesInBar(dogObjects) {
  let dogDiv = document.querySelector('#dog-bar')
  dogDiv.innerHTML = ''

  dogObjects.forEach( dog => {
    let dogDiv = document.querySelector('#dog-bar')
    let dogSpan = document.createElement('span')

    dogSpan.innerHTML = dog.name
    dogSpan.id = dog.id

    dogDiv.append(dogSpan)

    dogSpan.addEventListener('click', event => showDog(dog))
  })
}

function showDog(dog) {
  let container = document.querySelector('#dog-info')

  let dogPic = document.createElement('img')
  container.innerHTML = ''
  dogPic.src = dog.image

  let dogName = document.createElement('h2')
  dogName.innerText = dog.name

  let goodBad = document.createElement('button')
  goodBad.innerHTML = goodOrBad(dog)
  goodBad.id = dog.id

  container.append(dogPic)
  container.append(dogName)
  container.append(goodBad)

  goodBad.addEventListener('click', event =>  clickGoodOrBad(dog))
}

function goodOrBad(dog) {
  if (dog.isGoodDog) {
    return "Good Dog!"
  } else {
    return "Bad Dog!"
  }
}

function clickGoodOrBad(dog) {
  if (dog.isGoodDog) {
    dog.isGoodDog = false
    updateGoodOrBad(dog)
  } else {
    dog.isGoodDog = true
    updateGoodOrBad(dog)
  }
}

function updateGoodOrBad(dog) {
  let data = {
    "isGoodDog": dog.isGoodDog
  }
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    "method": 'PATCH',
    "headers": {
    "Content-Type": "application/json",
    },
    "body": JSON.stringify(data)
  }).then(r => showDog(dog))
}

function dogFilterButton() {
  let filterButton = document.querySelector('#good-dog-filter')

  filterButton.addEventListener('click', function (){
    if (filterButton.innerHTML === 'Filter good dogs: OFF') {
      filterButton.innerHTML = 'Filter good dogs: ON'
      filterDogs(1)
    } else {
      filterButton.innerHTML = 'Filter good dogs: OFF'
      filterDogs(0)
    }
  })
}

function filterDogs(status) {
  fetch('http://localhost:3000/pups').then(r => r.json()).then(dogs => {
    if (status === 0) {
      dogNamesInBar(dogs)
    } else {
    let goodDogs = dogs.filter(dog => dog.isGoodDog === true)
    dogNamesInBar(goodDogs)
  }
  })
}
