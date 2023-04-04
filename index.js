
const form = document.getElementById('form')  
const searchInput = document.getElementById('input-field')
const moviesContainer = document.getElementById('movies-container')
const reelIcon = document.querySelector('.reel-icon')
let movieArray = []
let watchlistArray = []
let moviesFromLocalStorage = JSON.parse(localStorage.getItem('watchlist'))


if(moviesFromLocalStorage){
    watchlistArray = moviesFromLocalStorage
}

form.addEventListener('submit', function(e){
    e.preventDefault()
    reelIcon.style.display ='none'
    moviesContainer.classList.add('formating')
    const searchValue = searchInput.value
    
    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=30266978&page=3&type=movie`)
        .then(res => res.json())
        .then(data => {
            const results = data.Search
            const movieId = results.map(function(movie){
                return movie.imdbID
            })
            
        for(let id of movieId){
            fetch(`http://www.omdbapi.com/?i=${id}&apikey=30266978&page=3`)
                .then(res => res.json())
                .then(data => {
                    movieArray.push(data)
                    moviesContainer.innerHTML += 
                    `
                    <div class="movie-container">
                    <div class="movie">
                        <img class="poster-img" src="${data.Poster}" width="99" height="147" alt="${data.Title} Movie Poster">
                        <div class="info">
                            <div class="heading-rating">
                                <h3>${data.Title}</h3>
                                <i class="fa-solid fa-star" style="color: #fec654;"></i>
                                <p>${data.imdbRating}</p>
                            </div>
                            <div class="time-genre-watchlist">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <button class="watchlist-btn" id="${data.imdbID}"><i class="fa-solid fa-circle-plus plus" ></i> Watchlist</button>
                            </div>
                            <p>${data.Plot}</p>
                        </div>
                    </div>
                    <hr>
                    </div>
                    `
                })
            
        }
    })
    searchInput.value =''
})


// Add to watchlistArray
document.addEventListener('click', function(e){
   const addToWatchlist = movieArray.filter(function(movie){
    if (e.target.id == movie.imdbID){
        return movie
    }
   })[0]

   const id = addToWatchlist.imdbID

   if(addToWatchlist){
       if(!watchlistArray.includes(addToWatchlist)){
        watchlistArray.push(addToWatchlist)
        localStorage.setItem('watchlist', JSON.stringify(watchlistArray))
        document.getElementById(id).innerHTML = `<i class="fa-solid fa-circle-plus plus" ></i> Added`
       }
   }
   
})
