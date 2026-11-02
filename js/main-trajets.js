import { fetchData } from "./store.js";

let traject ;
let counter = 0;
let recette = 0;
let TrajetsComplets = 0;
traject = document.getElementById("trajets");
let LaRecettes = document.getElementById("LaRecettes");
let NomberPassengers = document.getElementById("NombrePassagers");
let trajectComplete = document.getElementById("TrajetsComplet");
fetchData('./data/trips.json')
.then(data => {
    traject.textContent = data.length;
    data.forEach(trip => {
        console.log(trip)
    });
    for(let i = 0 ; i < data.length ; i++)
    {
        counter += data[i].reservations.length;
        recette += data[i].price * data[i].reservations.length;
        if(data[i].capacity === 20)
        {
            TrajetsComplets++;
        }
    }
    console.log(counter);
    NomberPassengers.textContent = counter;
    LaRecettes.textContent = recette + "DH";
    trajectComplete.textContent = TrajetsComplets;
})

