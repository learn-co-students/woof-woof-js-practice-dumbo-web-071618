document.addEventListener("DOMContentLoaded", () => {
  const dog_bar = document.getElementById('dog-bar')
  const dog_info = document.getElementById('dog-info')
  const filter_button = document.getElementById('good-dog-filter')

  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(data => data.filter(dog => dog.isGoodDog).forEach( dog => {
    let new_span = createDogSpan(dog)

    new_span.addEventListener('click', (event) =>
     fetch(`http://localhost:3000/pups/${dog.id}`)
     .then(res => res.json())
     .then(data =>{
       display = `
       <h2>${data.name}</h2>
       <img src=${data.image}>
       `
       dog_info.innerHTML = display

       dog_info.append(createDoggoButton(data))
     })) //end of new_span addEventListener
    dog_bar.append(new_span)
  })) //end of fetch

    filter_button.addEventListener('click', ()=> {
      // console.log(filter_button.innerText)
      if (filter_button.innerText.includes("ON") ){
        filter_button.innerText = "Filter good dogs: OFF"
        document.querySelectorAll('span').forEach( dog => dog.remove())

        fetch(`http://localhost:3000/pups`)
       .then(res => res.json())
       .then(data => data.filter(dog => dog.isGoodDog === true).forEach( dog => {
         let new_span = createDogSpan(dog)
         new_span.addEventListener('click', (event) =>
          fetch(`http://localhost:3000/pups/${dog.id}`)
          .then(res => res.json())
          .then(data =>{
            display = `
            <h2>${data.name}</h2>
            <img src=${data.image}>
            `
            dog_info.innerHTML = display

            dog_info.append(createDoggoButton(data))
          })) //end of new_span addEventListener
         dog_bar.append(new_span)
       }))

      }else{
        document.querySelectorAll('span').forEach( dog => dog.remove())

        filter_button.innerText = "Filter good dogs: ON"
        fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(data => data.forEach( dog => {
          let new_span = createDogSpan(dog)

          new_span.addEventListener('click', (event) =>
           fetch(`http://localhost:3000/pups/${dog.id}`)
           .then(res => res.json())
           .then(data =>{
             display = `
             <h2>${data.name}</h2>
             <img src=${data.image}>
             `
             dog_info.innerHTML = display

             dog_info.append(createDoggoButton(data))
           })) //end of new_span addEventListener
          dog_bar.append(new_span)
        }))

      }

    }) //end of filter_button event listener

  })//end doc loaded

function createDogSpan(dog){
  let new_span = document.createElement("span")
  new_span.dataset.id = dog.id
  new_span.innerText = dog.name

  return new_span
}//end createDogSpan

function createDoggoButton(dog){
  good_doggo_button = document.createElement('button')
    good_doggo_button.innerText = good_dog(dog.isGoodDog)

  good_doggo_button.addEventListener('click', () =>{
    good_doggo_button.innerText = good_dog((!dog.isGoodDog))
    fetch(`http://localhost:3000/pups/${dog.id}`,{
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       method: 'PATCH',
       body: JSON.stringify( { isGoodDog: !dog.isGoodDog } )

    }).then(res => res.json())
    .then(console.log)

  })//end good_doggo_button event listener
  return good_doggo_button
}

function good_dog(arg){
  if (arg){
    return "Good Dog!"
  }else {
    return "Bad Dog!"
  }
}
