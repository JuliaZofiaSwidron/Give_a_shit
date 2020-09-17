let params = new URLSearchParams(document.location.search.substring(1));
let cityFromUrl = params.get("city");


const link = "https://spreadsheets.google.com/feeds/list/12fl10SBjNqDoDrhy2nTErFCWefzyTrKXfi3rvYMO3QY/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);


function getData(){
    fetch(link)
    .then(res => res.json())
    .then(handleData);
}
function handleData(data){
    const myData = data.feed.entry;
    console.log(myData);
    myData.forEach(showData);
}
function showData(city){
    // link and clone template
    const template = document.querySelector(`#London`).content;
    const clone = template.cloneNode(true);

    //populate the copy
    if (city.gsx$city.$t === cityFromUrl){
        clone.querySelector('.main_review').dataset.id=city.gsx$id.$t;
        clone.querySelector(".main_review > h1").textContent = city.gsx$city.$t;
        clone.querySelector('.main_review > .pic > img').setAttribute('src',`images/city_images/${city.gsx$city.$t}.jpg`);
        clone.querySelector('.main_review .pic > img').setAttribute('alt',`Photography of the city ${city.gsx$city.$t}`);
        clone.querySelector('.main_review > p').textContent = city.gsx$description.$t;
        let bigRating = (( Number(city.gsx$pricerating.$t) + Number(city.gsx$smellrating.$t) + Number(city.gsx$weatherrating.$t) + Number(city.gsx$availabilityrating.$t)) / 4)
    bigRating = Math.floor(bigRating);
    console.log(bigRating);
    clone.querySelector(".total_rating").textContent = bigRating + "/5";
    clone.querySelectorAll(`.main_review > .main_rating > .poop:nth-child(-n+${bigRating})`).forEach(e=>{
        e.classList.add("empty_poop")
      })
    //poop ratings for categories
    clone.querySelectorAll(`.weather > div > .category_rating> .poop:nth-child(-n+${city.gsx$weatherrating.$t})`).forEach(e=>{
        e.classList.add("empty_poop")
    })
    clone.querySelector('.weather > p').textContent = city.gsx$weather.$t;

console.log(city.gsx$smellrating.$t)
    clone.querySelectorAll(`.smell > div > .category_rating> .poop:nth-child(-n+${city.gsx$smellrating.$t})`).forEach(e=>{
        e.classList.add("empty_poop")
    })
    clone.querySelector('.smell > p').textContent = city.gsx$smell.$t;

    clone.querySelectorAll(`.availability > div > .category_rating> .poop:nth-child(-n+${city.gsx$availabilityrating.$t})`).forEach(e=>{
        e.classList.add("empty_poop")
    })
    clone.querySelector('.availability > p').textContent = city.gsx$availability.$t;

    clone.querySelectorAll(`.prices > div > .category_rating> .poop:nth-child(-n+${city.gsx$pricerating.$t})`).forEach(e=>{
        e.classList.add("empty_poop")
    })
    clone.querySelector('.prices > p').textContent = city.gsx$price.$t;

    document.querySelector("main").prepend(clone);
    }

    
    //counting the totall rating used on a website
    

    //Jonas helped me to figure out how to select the right elements to show the rating 
    
   
}