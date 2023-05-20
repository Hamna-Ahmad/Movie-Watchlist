
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
    moviesContainer.innerHTML = ''
    e.preventDefault()
    moviesContainer.classList.add('formating')
    const searchValue = searchInput.value
    
    // Fetch from API using searched value
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=30266978&page=3&type=movie`)
        .then(res => res.json())
        .then(data => {
            if (data.Error){
                moviesContainer.innerHTML += 
                    `
                        <p id="error" class="center">Unable to find what you're looking for. Please try another search.</p>
                    `
                setTimeout(() => {
                    document.getElementById('error').style.display = 'none'
                },5000)
                reelIcon.style.display= 'flex'

            }else {
                const results = data.Search
                const movieId = results.map(function(movie){
                    return movie.imdbID
                })
                // Run another fetch request on the specific movie IDs
                for(let id of movieId){
                    fetch(`https://www.omdbapi.com/?i=${id}&apikey=30266978`)
                        .then(res => res.json())
                        .then(data => { 
                            movieArray.push(data)
                            let plot = ''
                            if(data.Plot.length > 110) {
                                plot = `<p>${data.Plot.substring(0,110) + "..."}<a>Read more</a></p>`
                            } else (
                                plot =`<p>${data.Plot}</p>`
                            )
        
                            moviesContainer.innerHTML += 
                            `
                            <div class="movie-container">
                            <div class="movie">
                                <img class="poster-img" src="${data.Poster}" alt="${data.Title} Movie Poster">
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
                                    ${plot}
                                </div>
                            </div>
                            <hr>
                            </div>
                            `
                        }
                    )
                    
                }
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
