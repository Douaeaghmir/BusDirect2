import { fetchData } from "../js/store.js";

const nameInput = document.getElementById("nom");
const seatSelect = document.getElementById("place")
const reservationForm = document.getElementById("reservationForm");
const seats = document.getElementsByClassName("seat");
const recettelement = document.getElementById("recette");
const dispoelement = document.getElementById("dispo");
const phoneInput = document.getElementById("telephone");

const param = new URLSearchParams(window.location.search);
const getId = param.get("id");
let allreserves = [];
let reserves = [];
let trip;
let dispo = 0;
let recette = 0;

fetchData("../data/trips.json").then(data => {

    allreserves = data;
    trip = data.find(function (Element) {
        return Element.id == getId;
    })
    if (trip) {
        reserves = trip.reservations;
        if (!trip.waitingList) {
            trip.waitingList = [];
        }
        dispo = trip.capacity - reserves.length

        for (let i = 0; i < reserves.length; i++) {
            recette += reserves[i].price || trip.price;
        }

        dispoelement.textContent = dispo;
        recettelement.textContent = recette + " DH";
        for (let i = 0; i < trip.reservations.length; i++) {
            let reservseat = Number(trip.reservations[i].seat);
            for (let j = 0; j < seats.length; j++) {
                if (Number(seats[j].textContent.trim()) === reservseat) {
                    seats[j].disabled = true;
                    seats[j].classList.remove(
                        "bg-white",
                        "hover:bg-gray-100",
                        "border-gray-300"
                    );
                    seats[j].classList.add(
                        "bg-red-100",
                        "border-red-200",
                        "text-red-600"
                    );
                }
            }
        }
        Listedattend();
    }
})
function ajoutereserves() {
    reservationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const passengerName = nameInput.value.trim();
        const selectedSeat = seatSelect.value;
        const phone = phoneInput.value.trim();
        const phoneregex = /^0[67][0-9]{8}$/;
        if (!phoneregex.test(phone)) {
            alert("Numéro de téléphone invalide !");
            return;
        }
        if (passengerName === "") {
            alert("Veuillez saisir votre nom.");
            return;
        }

        if (dispo === 0) {
            trip.waitingList.push({
                name: passengerName
            });

            savereserve();

            alert("Le bus est complet. Vous êtes ajouté à la liste d'attente.");

            reservationForm.reset();
            return;
        }

        if (selectedSeat === "") {
            alert("Veuillez choisir une place.");
            return;
        }
        for (let i = 0; i < reserves.length; i++) {
            if (reserves[i].name.toLowerCase() === passengerName.toLowerCase()) {
                alert("Ce nom possède déjà une réservation !");
                return;
            }
        }
        for (let i = 0; i < seats.length; i++) {
            if (seats[i].textContent.trim() === selectedSeat) {
                if (seats[i].disabled) {
                    alert("Cette place est déjà réservée !")
                    return;
                }
                else
                    seats[i].classList.remove(
                        "bg-white",
                        "hover:bg-gray-100",
                        "border-gray-300"
                    );
                seats[i].classList.add(
                    "bg-red-100",
                    "border-red-200",
                    "text-red-600"
                );
                let finalPrice = trip.price;
                if (seats[i].classList.contains("VIP")) {
                    finalPrice = trip.price * 1.1;
                }
                dispo--;
                dispoelement.textContent = dispo;
                recette += finalPrice;
                recettelement.textContent = recette + " DH";
                seats[i].disabled = true;
                reserves.push({
                    name: passengerName,
                    seat: selectedSeat,
                    price: finalPrice
                });
                savereserve(allreserves);
                alert("Réservation effectuée pour " + passengerName);
                reservationForm.reset();
                return;
            }
        }
        console.log(seatSelect.value);
    });
}
ajoutereserves()

function Listedattend() {
    if (trip.waitingList.length === 0) {
        return;
    }
    let placeLibre = null;
    for (let i = 0; i < seats.length; i++) {

        if (
            seats[i].disabled === false &&
            !seats[i].classList.contains("VIP")
        ) {
            placeLibre = seats[i];
            break;
        }
    }

    if (placeLibre === null) {
        return;
    }
    let passenger = trip.waitingList.shift();

    placeLibre.disabled = true;
    placeLibre.classList.remove(
        "bg-white",
        "hover:bg-gray-100",
        "border-gray-300"
    );

    placeLibre.classList.add(
        "bg-red-100",
        "border-red-200",
        "text-red-600"
    );
    reserves.push({
        name: passenger.name,
        seat: Number(placeLibre.textContent.trim()),
        price: trip.price
    })
    dispo--;
    recette += trip.price;
    dispoelement.textContent = dispo;
    recettelement.textContent = recette + " DH";
    savereserve();
}
function savereserve() {
    localStorage.setItem("trips", JSON.stringify(allreserves));
}
const currentplace = document.getElementById("ancienne-place");
const modiform = document.getElementById("Modifierform");
const newplace = document.getElementById("nouvelle-place");

function changer() {
    modiform.addEventListener("submit", function (event) {
        event.preventDefault();
        const chosingseat = currentplace.value.trim();
        const modiplace = newplace.value;
        let change = null;
        let oldplace = null;
        if (chosingseat === "") {
            alert("Numéro de siège actuel incorrect");
            return;
        }
        if (modiplace === "") {
            alert("Veuillez choisir une nouvelle place");
            return;
        }
        if (modiplace === chosingseat) {
            alert("vous l'avez choisi au même endroit");
            return;
        }
        for (let i = 0; i < seats.length; i++) {
            if (seats[i].textContent.trim() === modiplace) {
                change = seats[i];
            }
            if (seats[i].textContent.trim() === chosingseat) {
                oldplace = seats[i];
            }
        }
        if (change.disabled) {
            alert("Cette place est déjà réservée !");
            return;
        }
        oldplace.disabled = false;
        oldplace.classList.remove(
            "bg-red-100",
            "border-red-200",
            "text-red-600"
        );
        oldplace.classList.add(
            "bg-white",
            "hover:bg-gray-100",
            "border-gray-300"
        );
        change.classList.remove(
            "bg-white",
            "hover:bg-gray-100",
            "border-gray-300"
        );
        change.classList.add(
            "bg-red-100",
            "border-red-200",
            "text-red-600"
        );
        change.disabled = true;
        dispoelement.textContent = dispo;
        for (let i = 0; i < reserves.length; i++) {
            if (reserves[i].seat == chosingseat) {
                let newprice = trip.price;
                if (change.classList.contains("VIP")) {
                    newprice = trip.price * 1.1;
                }
                recette -= reserves[i].price;
                recette += newprice;
                reserves[i].seat = Number(modiplace);
                reserves[i].price = newprice;
                recettelement.textContent = recette + " DH"
                break
            }
        }
        savereserve();
        alert("Réservation effectuée");
        modiform.reset();
    });
}
changer()
const deleteseatform = document.getElementById("deleteseat");
const inputplace = document.getElementById("place-suppression");

function suppression() {
    deleteseatform.addEventListener("submit", function (event) {
        event.preventDefault();

        let place = inputplace.value.trim();
        let holder = null;
        if (place === "") {
            alert("Numéro de siège actuel incorrect")
            return;
        }
        for (let i = 0; i < seats.length; i++) {
            if (seats[i].textContent.trim() === place) {
                holder = seats[i];
                break;
            }
        }
        if (holder === null || holder.disabled === false) {
            alert("Cette place n'est pas réservée !");
            return;
        }
        holder.disabled = false;
        holder.classList.remove(
            "bg-red-100",
            "border-red-200",
            "text-red-600"
        );
        holder.classList.add(
            "bg-white",
            "hover:bg-gray-100",
            "border-gray-300"
        );
        for (let i = 0; i < reserves.length; i++) {
            if (reserves[i].seat == place) {
                recette -= reserves[i].price || trip.price;
                reserves.splice(i, 1);
                dispo++;
                recettelement.textContent = recette + " DH";
                dispoelement.textContent = dispo;
                break;
            }
        }
        savereserve();
        Listedattend();
        alert("Votre place a été supprimée avec succès");
    });
}
suppression()
