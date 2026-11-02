import { fetchData } from "./store.js";

let traject ;
let counter = 0;
let recette = 0;
let TrajetsComplets = 0;
traject = document.getElementById("trajets");
let LaRecettes = document.getElementById("LaRecettes");
let NomberPassengers = document.getElementById("NombrePassagers");
let trajectComplete = document.getElementById("TrajetsComplet");
let ListeTraject = document.getElementById("tripcontainer");
fetchData('./data/trips.json')
.then(data => {
    traject.textContent = data.length;
    data.forEach(trip => {
        let placesLibre = trip.capacity - trip.reservations.length;
        let status = "Disponible";

        if(placesLibre === 0)
        {
            status = "Occupée";
        }
        ListeTraject.innerHTML += `
        <div class="bg-white p-5 rounded-xl shadow-md">
        <div class="flex justify-between items-center mb-3">
        <h3 class="font-bold text-blue-900">
        📍 ${trip.departure}→${trip.destination}
        </h3>
        <div class="${status === "Occupée" ? "bg-red-500" : "bg-pink-600"} text-white px-3 py-1 rounded-lg text-sm">
        ${status}
        </div>
        </div>
        <p class="text-gray-600 mb-2">
        🕒 ${trip.departureTime}→${trip.arrivalTime}
        </p>
        <p class="text-black mb-2">
        💰 ${trip.price} DH
        </p>
        <p class="text-black mb-2">
         💺 ${placesLibre}places libres
         </p>
         <p class="text-black mb-4>
         👥 ${trip.waitingList.length} en attente
         </p>
         <a href = "./cabine.html?id=${trip.id}" class="block text-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
         Gérer la cabine → 
         </a>
         </div>
        `;
        
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

