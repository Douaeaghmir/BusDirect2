 function fetchData(url)
 {
     fetch(url)
     .then(res => res.json())
     .then(data => {
         console.log(data);
         const traject = document.getElementById("traject");
         const length = Object.keys(data).length;
         
         const Numberoftrajet = document.createElement("div");
         traject.append(Numberoftrajet);

         Numberoftrajet.textContent = length;
     })
 }       
function savereserve(traject) {
    localStorage.setItem("trips", JSON.stringify(traject));
}
