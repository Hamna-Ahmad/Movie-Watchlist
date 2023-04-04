const watchlistContainer = document.getElementById('watchlist-movie-container')
let moviesFromLocalStorage = JSON.parse(localStorage.getItem('watchlist')) 
let watchlistArray = []

function render(){
    if(moviesFromLocalStorage.length > 0){
        console.log("theres movies")
        watchlistArray = moviesFromLocalStorage
        watchlistContainer.classList.add('formating')
        renderWatchlistHTML(watchlistArray)
    } else {
        console.log("empty list")
        renderEmptyWatchlistHtml()
        watchlistContainer.classList.add('center')
    }
}

render()

function renderWatchlistHTML(array){
    let html = ``

    for (let movie of array){
        html += `
        <div class="movie-container">
        <div class="movie">
            <img class="poster-img" src="${movie.Poster}" width="99" height="147" alt="${movie.Title} Movie Poster">
            <div class="info">
                <div class="heading-rating">
                    <h3>${movie.Title}</h3>
                    <i class="fa-solid fa-star" style="color: #fec654;"></i>
                    <p>${movie.imdbRating}</p>
                </div>
                <div class="time-genre-watchlist">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                    <button class="watchlist-btn" id="${movie.imdbID}"><i class="fa-solid fa-circle-minus plus"></i> Remove</button>
                </div>
                <p>${movie.Plot}</p>
            </div>
        </div>
        <hr>
    </div>            
        `
    }
    watchlistContainer.innerHTML = html;
}

function renderEmptyWatchlistHtml(){
    watchlistContainer.innerHTML = `
    <div class="empty-watchlist">
        <p>Your watchlist is looking a little empty...</p>
        <a href="index.html" class="watchlist-btn"><i class="fa-solid fa-circle-plus plus "></i> Let's add some movies!</a>
    </div>
    
    `
}

// remove from watchlistArray
document.addEventListener('click', function(e){
    const removeFromWatchlist = watchlistArray.filter(function(movie){
        if (e.target.id == movie.imdbID){
            return movie
        }
       })[0]

    if(removeFromWatchlist){
        const index = watchlistArray.indexOf(removeFromWatchlist)  
        watchlistArray.splice(index, 1)
        localStorage.setItem('watchlist',JSON.stringify(watchlistArray))
        renderWatchlistHTML(watchlistArray)
        render()
    }   
})

