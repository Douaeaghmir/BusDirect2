let alltraject = [];
import { fetchData , savereserve} from "./store.js";

let traject ;
let counter = 0;
let recette = 0;
let TrajetsComplets = 0;
let currentPage = 1;
let size = 6;
traject = document.getElementById("trajets");
let LaRecettes = document.getElementById("LaRecettes");
let NomberPassengers = document.getElementById("NombrePassagers");
let trajectComplete = document.getElementById("TrajetsComplet");
let ListeTraject = document.getElementById("tripcontainer");
let matchCity = document.getElementById("searchCity");
let filterTraject = document.getElementById("traject-status");
let pagination = document.getElementById("pagination");


fetchData('./data/trips.json')
.then(data => {
    alltraject = data;
    savereserve(alltraject);
    traject.textContent = data.length;
    matchCity.addEventListener("input", function(){
        let getvalue = matchCity.value.toLowerCase().trim();
        let filteredTraject = alltraject.filter(trip => {
            let placesLibre = trip.capacity - trip.reservations.length;
            
            return (
                (trip.departure.toLowerCase().includes(getvalue) ||
                trip.destination.toLowerCase().includes(getvalue))
                &&
                (
                    filterTraject.value === "touTraject" ||
                    (filterTraject.value === "Occupée" && placesLibre === 0) ||
                    (filterTraject.value === "libre" && placesLibre > 0)
                )
            );
        });
        let start = (currentPage - 1) * size;
        let end = start + size;
        
        let cartsToDisplay = filteredTraject.slice(start , end);
        let totalPages = Math.ceil(filteredTraject.length / size);
        if(filteredTraject.length === 0)
        {
            ListeTraject.innerHTML = `<div class="text-center col-span-full p-5 border-2 rounded border-pink-600 bg-pink-200 ml-[250px] mr-[250px]">
            <p class="text-center">aucun trajet trouvé</p>
            </div>`
            pagination.innerHTML ="";
            return
        }
        pagination.innerHTML = "";
        for(let i = 1; i <= totalPages ; i++)
        {
            pagination.innerHTML += `<button data-page="${i}" class="bg-[#03045E] text-white font-bold text-2xl px-4 py-2 rounded-lg">${i}</button>`;
        }
        pagination.querySelectorAll("button").forEach(button =>{
            button.addEventListener("click", function(){
                currentPage = Number(button.dataset.page);

                matchCity.dispatchEvent(new Event("input"));
            })
        })
    ListeTraject.innerHTML = "";
    cartsToDisplay.forEach(trip => {
        {
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
         <p class="text-black mb-4">
         👥 ${trip.waitingList.length} en attente
         </p>
         <a href = "./cabine.html?id=${trip.id}" class="block text-center bg-[#03045E] text-white p-2 rounded-lg hover:bg-blue-700">
         Gérer la cabine → 
         </a>
         </div>
        `;
    }
    });
    })
        filterTraject.addEventListener("change" ,function(){
        matchCity.dispatchEvent(new Event("input"));
})
    matchCity.dispatchEvent(new Event ("input"));
     for(let i = 0 ; i < data.length ; i++)
    {
        counter += data[i].reservations.length;
        recette += data[i].price * data[i].reservations.length;
        if(data[i].reservations.length === data[i].capacity)
        {
            TrajetsComplets++;
        }
    }
    NomberPassengers.textContent = counter;
    LaRecettes.textContent = recette + " DH";
    trajectComplete.textContent = TrajetsComplets;
})