const ul_breeds = document.getElementById("ul_breeds");
const imgDog = document.getElementById("imgDog");
const getDogBreeds = () => {
    const allBreedsApiUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(allBreedsApiUrl)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            jsonResponse(json);
        })
        .catch((error) => {
            console.log(error);
        });
}

const jsonResponse = (json) => {
    //get the object containing all the breeds data
    var allBreedsData = json.message;
    var breedsList = Object.keys(allBreedsData);
    //reset all the current items in the list if any
    ul_breeds.innerHTML = "";
    breedsList.forEach((breed) => {
        var listItemHtml = `<li>${breed}</li>`;
        ul_breeds.innerHTML += listItemHtml;
    })
}
getDogBreeds();

// a function which is responsible to fetch images of a breed. It takes breedname as an argument
const getDogImages = (breedName) => {

    const dogImagesUrl = `https://dog.ceo/api/breed/${breedName}/images`;
    fetch(dogImagesUrl)
        .then((res) => {
            return res.json();
        })
        .then(function (json) {
            console.log(json);
            showImagesInHtml(json);
        })
        .catch((error) => {
            console.log(error);
        });
}
const showImagesInHtml = (json) => {
    var imageList = json.message;
    imgDog.innerHTML = "";
    imageList.forEach((image) => {
        imgDog.innerHTML += `<img class="gridItem" src="${image}"></img>`
    })
}
ul_breeds.addEventListener("click", function (e) {
    // check if we clicked the list items in ul 
    if (e.target && e.target.nodeName == "LI") {
        getDogImages(e.target.innerHTML.trim());
    }
})