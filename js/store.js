        
        fetch('./data/trips.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const traject = document.getElementById("traject");
            const length = Object.keys(data).length;
            
            const Numberoftrajet = document.createElement("div");
            traject.append(Numberoftrajet);

            Numberoftrajet.textContent = length;
        })