const nameInput = document.getElementById("nom");
const seatSelect = document.getElementById("place")
const reservationForm = document.getElementById("reservationForm");
const seats = document.getElementsByClassName("seat");
const recettelement = document.getElementById("recette");
const dispoelement = document.getElementById("dispo");

let dispo = 17;
let recette = 240;


let prix = 80;
const all = {};
let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
function reserves() {
    reservationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const passengerName = nameInput.value.trim();
        const selectedSeat = seatSelect.value;
        if (passengerName === "" || selectedSeat === "") {
            alert("Veuillez saisir votre nom et choisir une place.");
            return;
        }
            for (let i = 0; i < reservations.length; i++) 
            {
                if (reservations[i].name.toLowerCase() === passengerName.toLowerCase()) 
                {
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
                dispo -= 1;
                dispoelement.textContent = dispo;
                recette = recette + prix;
                recettelement.textContent = recette;
                seats[i].disabled = true;
                reservations.push({
                    name: passengerName,
                    seat: selectedSeat
                });
                savereserve();
                alert("Réservation effectuée pour " + passengerName);
                reservationForm.reset();
                return;
            }
        }
        console.log(seatSelect.value);
    });
}
reserves()
function savereserve() {
    localStorage.setItem("reservations", JSON.stringify(reservations));
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
        for (let i = 0; i < reservations.length; i++) {
            if (reservations[i].seat == chosingseat) {
                reservations[i].seat = modiplace;
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
        dispo += 1;
        dispoelement.textContent = dispo;
        recette = recette - prix;
        recettelement.textContent = recette;
        for (let i = 0; i < reservations.length; i++) {
            if (reservations[i].seat == place) {
                reservations.splice(i, 1);
                break;
            }
        }
        savereserve();
        alert("Votre place a été supprimée avec succès");
    });
}
suppression()
console.log(seats);