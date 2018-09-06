document.addEventListener('DOMContentLoaded', () => {
  const API = "http://localhost:3000/pups"
  const dogBar = document.querySelector('#dog-bar');
  const dogInfo = document.querySelector('#dog-info')


  fetch(API)
  .then( res => res.json())
  .then( data => {
    data.forEach(dog => dogBar.appendChild(renderDogName(dog)))
  })
  let dogId;
  document.addEventListener("click", (e) => {
    // console.log(e.target.tagName);
    dogId = e.target.getAttribute('data-id')
    if (e.target.tagName === "SPAN"){
      fetch(`${API}/${dogId}`)
        .then(res => res.json())
        .then(data => showDog(data))
    } else if(e.target.className === "changeDog"){
        if (e.target.innerText === "Good Dog!"){
          e.target.innerText = "Bad Dog!"
          patchRequest(`${API}/${dogId}`, { isGoodDog: false})
            .then(res => res.json())
            .then(data => showDog(data))
        } else if (e.target.innerText === "Bad Dog!"){
          e.target.innerText = "Good Dog!"
          patchRequest(`${API}/${dogId}`, { isGoodDog: true})
            .then(res => res.json())
            .then(data => showDog(data))
        }

    }else if(e.target.id === "good-dog-filter"){

          dogBar.innerHTML = ''

          if(e.target.innerText === "Filter good dogs: OFF"){

            e.target.innerText = "Filter good dogs: ON"
            fetch(API)
              .then( res => res.json())
              .then( data => {
                data
                  .filter(dog => dog.isGoodDog === true)
                  .forEach(goodDog => dogBar.append(renderDogName(goodDog)))
              })
          }else if(e.target.innerText === "Filter good dogs: ON"){

            e.target.innerText = "Filter good dogs: OFF"
            fetch(API)
              .then( res => res.json())
              .then( data => {
                data.forEach(dog => dogBar.appendChild(renderDogName(dog)))
              })

          }

    }
  })

  function showDog(data){
    let dogStatus = "";
    if(data.isGoodDog){
      dogStatus = "Good Dog!";
    }else {
      dogStatus = "Bad Dog!";
    }
    //console.log(data.id);
    dogInfo.innerHTML = `
      <img src=${data.image}>
      <h2>${data.name}</h2>
      <button class="changeDog" data-id=${data.id}>${dogStatus}</button>
    `

  }

  let nameSpan;
  function renderDogName(dogData){
    nameSpan = document.createElement('span');
    nameSpan.innerText = dogData.name;
    nameSpan.setAttribute('data-id', dogData.id) // dataset.tonypony = dogData.id;
    return nameSpan;
  }

})

// function appendItemFromArrayToDiv(array, div, fn) {
//   array.forEach(item => div.append(fn(item)))
// }

function patchRequest(url, payload) {
  return fetch(url, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
}
