const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');
const movieInfo = document.getElementById('movie-info');
const form = document.getElementById('form');
const searchbox = document.getElementById('searchbox');
const genre = document.getElementById('genre');
const genreList = document.getElementById('genre-list');

//fetch data
let getData = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            resolve(data.results);
            reject(new Error("can't fetch data"));
        });
    });
}

//display movies
async function displayMovies(url) {
    try {
        let fetchedData = await getData(url);
        console.log(fetchedData);
        fetchedData.forEach(movie => {
            const { title, poster_path, vote_average } = movie;
            const movieElement = document.createElement('div');
            movieElement.classList.add("movie-container");
            movieElement.innerHTML = `
                <img id="movie-poster" src="${IMG_URL + poster_path}" alt="${title}">
                <div id="movie-info">
                    <div class="movie-title">${titleShortener(title)}</div>
                    <span class="rating" style="color:${ratingColors(vote_average)}">${vote_average}</span>
                </div>
            `;
            
            main.appendChild(movieElement);
        });

        if(!main.hasChildNodes()){
            main.innerHTML = `
            <h2 style="color:white; padding-top: 150px" id="cant-find-error-msg"> It seems like we can't find your movie :( </h2>
            `
        }

        displayFooter();
    } catch(error){
        console.log(error);
    }
}

function displayFooter(){
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <p>©Jaime Fernandez - 2021</p>
    `;
}

// utility functions
function titleShortener (title){
    let trimmedTitle =  "";
    if(title.length > 20){
        trimmedTitle += title.substring(0, 21);
        trimmedTitle += '...';
        return trimmedTitle;
    }

    return title;
}

function ratingColors(vote_average) {
    let rating = parseFloat(vote_average);
    if(rating >= 7){
        return "rgb(91, 219, 91)";
    } else if(rating <= 4){
        return "red"
    } else {
        return "orange";
    }
}

displayMovies(API_URL);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let searchTerm = searchbox.value;

    if(searchTerm){
        main.innerHTML = '';
        displayMovies(searchURL+'&query='+ searchTerm);
    } else {
        displayMovies(API_URL);
    }
});










