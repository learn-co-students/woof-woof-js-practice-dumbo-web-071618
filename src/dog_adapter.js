class DogAdapter {

  static getDogs() {
    return fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
  }

  static updateDog(id, bool) {
    return fetch(`http://localhost:3000/pups/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({isGoodDog: bool})
    })
  }
}
