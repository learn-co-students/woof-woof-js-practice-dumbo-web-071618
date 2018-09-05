document.addEventListener('DOMContentLoaded', () => {
    let navBar = document.querySelector('#dog-bar')
    let showDogDiv = document.querySelector("#dog-info")
    let filter = document.querySelector('#good-dog-filter')
    filter.dataset.on = false 
    
    renderNavBar(filter.dataset.on)

    navBar.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            renderDog(e.target.dataset.id)
        }
    })
    showDogDiv.addEventListener("click", (e) => {
        if (e.target.tagName === 'BUTTON') {
            let button = e.target
            if (button.dataset.goodDog === true || button.dataset.goodDog === "true") {
                button.dataset.goodDog = false 
                button.innerText = "Good Dog!"
            } else {
                button.dataset.goodDog = true
                button.innerText = "Bad Dog!"
            }
            updateDog(button.dataset.id,button.dataset.goodDog)
        }  
    })
    filter.addEventListener('click', () => {
        if (filter.dataset.on === false || filter.dataset.on === "false"){
            filter.dataset.on = true 
            filter.innerText = "Filter good dogs: ON"
        } else {
            filter.dataset.on = false
            filter.innerText = "Filter good dogs: OFF"
        }
        renderNavBar(filter.dataset.on)
    })

})

renderNavBar = filter => {
    let navBar = document.querySelector('#dog-bar')
    let dogList = []
    while (navBar.firstChild) {navBar.removeChild(navBar.firstChild)}
    fetch('http://localhost:3000/pups', {
        method: 'get'
    })
        .then(res => res.json())
        .then(dogs => {
            if (filter === true || filter === "true") {
                dogs.forEach(dog => {
                    if (dog.isGoodDog === true || dog.isGoodDog === "true") { dogList.push(dog) }
                })
            } else {
                dogList = [...dogs]
            }
            console.log(filter)
            console.log(dogList)
            dogList.forEach(dog => navBar.append(createSpanEl(dog)))
        })
}

updateDog = (id,goodDog) => {
    let navBar = document.querySelector('#dog-bar')
    let filter = document.querySelector('#good-dog-filter')
    fetch(`http://localhost:3000/pups/${id}`, {
        method:"PATCH",
        body: JSON.stringify({"isGoodDog": goodDog}),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    .then(res => res.json())
    .then(dog =>{
        renderDog(dog.id)
        renderNavBar(filter.dataset.on)
    })
}

renderDog = dogId => {
    let dogImg = document.createElement('img')
    let dogName = document.createElement('h2')
    let goodOrBad = document.createElement('button')
    let showDogDiv = document.querySelector("#dog-info")
    let doge

    while (showDogDiv.firstChild) { showDogDiv.removeChild(showDogDiv.firstChild) }

    fetch("http://localhost:3000/pups", {
        method: 'get'
    })
        .then(res => res.json())
        .then(dogList => {

            doge = dogList.find(dog => dogId == dog.id)
            console.log(dogId)
            dogImg.src = doge.image
            dogName.innerText = doge.name
            goodOrBad.dataset.id = dogId
            if (doge.isGoodDog === true || doge.isGoodDog === "true" ) {
                goodOrBad.innerText = "Bad Dog!"
                goodOrBad.dataset.goodDog = true
            } else {
                goodOrBad.innerText = "Good Dog!"
                goodOrBad.dataset.goodDog = false
            }
            showDogDiv.append(dogImg,dogName,goodOrBad)
        })
}

createSpanEl = dog => {
    let spanElementForDog = document.createElement('span')
    spanElementForDog.classList.add('dog-choice')
    spanElementForDog.innerText = dog.name
    spanElementForDog.dataset.id = dog.id
    return spanElementForDog
}


// showDogesOnNavBar = (doges,filter) => {
//     let dogeBar = document.querySelector('#dog-bar')
//     let showDogeDiv = document.querySelector('#dog-info')
    
//     // debugger

//     while (dogeBar.firstChild) {
//         dogeBar.removeChild(dogeBar.firstChild)
//     }

//     doges.forEach(doge => {
//         let elementForDoge = document.createElement('span')
//         elementForDoge.innerText = doge.name
//         dogeBar.append(elementForDoge)

//         elementForDoge.addEventListener('click', () => {
//             while (showDogeDiv.firstChild) {
//                 showDogeDiv.removeChild(showDogeDiv.firstChild)
//             }

//             // console.log(doge)
//             let dogeImg = document.createElement('img')
//             dogeImg.src = doge.image
//             let dogeName = document.createElement('h2')
//             dogeName.innerText = doge.name
//             let goodOrBadDoge = document.createElement('button')

//             if (doge.isGoodDog) {
//                 goodOrBadDoge.innerText = "Bad Dog!"
//             } else {
//                 goodOrBadDoge.innerText = "Good Dog!"
//             }

//             goodOrBadDoge.addEventListener('click', (e) => {
//                 if (goodOrBadDoge.innerText === 'Good Dog!') {
//                     goodOrBadDoge.innerText = 'Bad Dog!'
//                     doge.isGoodDog = true
//                 } else {
//                     goodOrBadDoge.innerText = 'Good Dog!'
//                     doge.isGoodDog = false

//                 }
//                 updateDoge(doge)
//             })

//             showDogeDiv.append(dogeName, dogeImg, goodOrBadDoge)
//         })
//     })
// }

// updateDoge = (doge) => {
//     let putData = doge
//     fetch(`http://localhost:3000/pups/${doge.id}`, {
//         method: 'put',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(putData)
//     })
//         .then(res => res.json())
//         .then(res => console.log(res))
    
//     fetch('http://localhost:3000/pups', {
//         method: 'get'
//     })
//         .then(res => res.json())
//         .then(doges => {
//             let button = document.querySelector('#good-dog-filter')

//             let dogeList = []

//             if (button.filterOn) {
//                 doges.forEach(doge => {
//                     if (doge.isGoodDog) { dogeList.push(doge) }
//                 })
//                 console.log(dogeList)
//             } else {
//                 dogeList = [...doges]
//             }
//             showDogesOnNavBar(dogeList, button.filterOn)

//         })


// }

// toggleDogeFilter = (e) => {
//     let button = e.target
//     let dogeBar = document.querySelector('#dog-bar')
//     let showDogeDiv = document.querySelector('#dog-info')

//     fetch('http://localhost:3000/pups', {
//         method: 'get'
//     })
//         .then(res => res.json())
//         .then(doges => {
//             let dogeList = []

//             if (button.filterOn) {
//                 button.filterOn = false
//                 button.innerText = 'Filter good dogs: OFF'
//                 dogeList = [...doges]
//             } else {
//                 button.filterOn = true
//                 button.innerText = 'Filter good dogs: ON'
//                 doges.forEach(doge => {
//                     if (doge.isGoodDog) { dogeList.push(doge) }
//                 })
                
//             }
//             showDogesOnNavBar(dogeList, button.filterOn)

//         })

// }

// fetchDogeList = () => {
//     fetch('http://localhost:3000/pups', {
//         method: 'get'
//     })
//         .then(res => res.json())
//         .then(doges => {
//             console.log(doges)
//             return doges
//         })
// }

// updateDogeName = (doge,name) => {
//   let patchData = {...doge}
//   putData.name = name
//   console.log(putData)
//   fetch(`http://localhost:3000/pups/${doge.id}`, {
//     method:"put",
//     headers: {
//       'Content-Type':'application/json'
//     },
//     body: JSON.stringify(patchData)
//   })
//     .then(res => res.json())
//     .then(res => console.log(res))
// }
