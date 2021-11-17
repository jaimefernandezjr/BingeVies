const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;

// getData(API_KEY);
// function getData(url){
//     const res = fetch(API_KEY);
//     const data = res.json();
//     displayMovies(data);
// }

getData(API_URL);

function getData(url){
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data);
    })
}
function showMovies(data){
    console.log(data);


}

