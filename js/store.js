export function fetchData(url) {

    let savetrajet = localStorage.getItem("trips");

    if(savetrajet !== null)
    {
        return Promise.resolve(JSON.parse(savetrajet))
    }
     return fetch(url)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("trips", JSON.stringify(data))
            return data;
        })
}
export function savereserve(traject) {
    localStorage.setItem("trips", JSON.stringify(traject));
}
