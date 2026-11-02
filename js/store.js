export function fetchData(url) {
     return fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        })
}
export function savereserve(traject) {
    localStorage.setItem("trips", JSON.stringify(traject));
}

