const movie = document.getElementById('movies')
const allSeats = document.querySelectorAll('.seat-container .row .seat')
const totalSeats = document.getElementById('amount-selected')
const totalCost = document.getElementById('cost')
const selectedSeat = document.querySelector('.seat-container')
let seatsNotOccupied = document.querySelectorAll('.seat-container .row .seat:not(.occupied)')
let movieCost = movie.value
let amountOfSeatsSelected = 0;
let selectedSeatsList
let seatsIndex

const movie1 = [2, 4, 8, 9, 11, 12, 15, 18, 19, 20, 22, 23, 24, 27, 28, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]
const movie2 = [9, 15, 16, 20, 21, 22, 23, 27, 28, 33, 34, 35, 36, 38, 39]
const movie3 = [10, 11, 12, 16, 22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 38, 39, 43, 44, 45]
const movie4 = [10, 11, 16, 22, 24, 26, 28, 29, 38, 39, 40, 42, 44, 45]
const movie5 = [9, 12, 17, 27, 28, 30, 31, 40, 43, 47]
const movie6 = [14, 16, 17, 26, 27, 28, 29, 31, 33, 42, 43, 46, 47]
const movie7 = [2, 3, 4, 5, 16, 30, 31, 32, 33, 35, 37]
allMovies = [movie1, movie2, movie3, movie4, movie5, movie6, movie7]


function displayCost(cost) {
    console.log('HERE', cost)
    totalCost.innerHTML = cost
}

//Saves existing data to local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

//Get data from local storage and populate UI
function localStorageTest() {

    //Gets the stored seats array from local storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seatsNotOccupied.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    //Gets the current movie selected, and cost of movie from local storage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if (selectedMovieIndex !== null) {
        movie.selectedIndex = selectedMovieIndex;
    }

    //Updates the interface to show existing selected seats and movie cost
    movieCost = movie.value
    amountOfSeatsSelected = selectedSeats.length;
    totalSeats.innerHTML = amountOfSeatsSelected;
    displayCost(`$${movieCost*amountOfSeatsSelected}`)

}

function updateOccupiedSeats(movieIndex) {
    allMovies[movieIndex].forEach(index => {
        allSeats[index].classList.add('occupied')
    })
}


function reset() {
    allSeats.forEach(seat => {
        seat.classList.remove('occupied')
        seat.classList.remove('selected')
    });
    amountOfSeatsSelected = 0;
    totalSeats.innerHTML = 0;
}

selectedSeat.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        if (e.target.classList.contains('selected')) {
            movieCost = movie.value
            e.target.classList.remove('selected')
            amountOfSeatsSelected--
        } else {
            movieCost = movie.value
            e.target.classList.add('selected')
            amountOfSeatsSelected++;
        }

        totalSeats.innerHTML = amountOfSeatsSelected;
        displayCost(`$${movieCost*amountOfSeatsSelected}`)
        selectedSeatsList = document.querySelectorAll('.seat-container .seat.selected')
        seatsIndex = [...selectedSeatsList].map(seat => {
            return [...seatsNotOccupied].indexOf(seat)
        })

        console.log(seatsIndex)


        //Put in local storage
        localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    } else if (e.target.classList.contains('occupied')) {
        alert("This seat is not available. Please choose a different seat.")
    }

})

movie.addEventListener('change', (e) => {
    reset()
    updateOccupiedSeats(movie.selectedIndex)
    movieCost = movie.value;
    //Saves current selected movie and price
    setMovieData(e.target.selectedIndex, e.target.value);
    displayCost(`$${movieCost*amountOfSeatsSelected}`)

})

//localStorageTest()
updateOccupiedSeats(movie.selectedIndex)