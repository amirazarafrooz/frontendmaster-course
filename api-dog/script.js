const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const doggos = document.getElementById("dog-target");

function addNewDoggo() {
    const promise = fetch(DOG_URL);
    promise
    .then(function(response) {
        const processPromise = response.text();
        return processPromise
    })
    .then(function(processedResponse) {
        const dogObject = JSON.parse(processedResponse);
        const img = document.createElement("img");
        img.src = dogObject.message;
        img.alt = "Cute doggo";
        doggos.appendChild(img);
    });
}


document.getElementById("dog-btn").addEventListener("click", addNewDoggo);