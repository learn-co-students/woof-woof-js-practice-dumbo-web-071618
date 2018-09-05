document.addEventListener("DOMContentLoaded", () => {

  const dogBar = document.querySelector("#dog-bar");
  const allDogs = dogBar.getElementsByTagName("span");
  const dogInfo = document.querySelector("#dog-info");
  const dogFilter = document.querySelector("#good-dog-filter");

  const dogImg = document.createElement("img");
  const dogButton = document.createElement("button");
  const dogTitle = document.createElement("h2");

  dogInfo.append(dogImg, dogTitle);

  DogAdapter.getDogs().then(data => {
    data.forEach((dog) => {
    let dogSpan = document.createElement("span");
    dogSpan.innerText = dog.name;
    dogSpan.dataset.bool = dog.isGoodDog;
    dogBar.appendChild(dogSpan);

    dogSpan.addEventListener("click", (event) => {
      dogImg.src = dog.image;
      dogTitle.innerText = dog.name;
      if (dog.isGoodDog) {
        dogButton.innerText = "Good Dog";

      } else {
        dogButton.innerText = "Bad Dog";
      }
      dogButton.dataset.id = dog.id;
      dogInfo.appendChild(dogButton);
    })
  })
})

function hideDogs(dogs) {
  for (let element of allDogs) {
    if (element.dataset.bool === "false") {
      element.style.display = "none";
    }
  }
}

function showDogs(dogs) {
  for (let element of allDogs) {
    element.style.display = null;
  }
}

dogFilter.addEventListener("click", (event) => {
  if (dogFilter.innerText.match(/off/i)) {
    dogFilter.innerText = "Filter good dogs: ON";
    hideDogs(allDogs);

  } else {
    dogFilter.innerText = "Filter good dogs: OFF";
    showDogs(allDogs);
  }
})

  dogButton.addEventListener("click", (event) => {
    if (event.target.innerText === "Good Dog") {
      event.target.innerText = "Bad Dog";
      DogAdapter.updateDog(event.target.dataset.id, false);

    } else {
      event.target.innerText = "Good Dog";
      DogAdapter.updateDog(event.target.dataset.id, true);
    }
  })
})
