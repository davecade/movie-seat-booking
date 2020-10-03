const movie = document.getElementById('movies')
const totalSeats = document.getElementById('amount-selected')
const totalCost = document.getElementById('cost')
const selectedSeat = document.querySelector('.seat-container')
let seatsNotOccupied = document.querySelectorAll('.seat-container .row .seat:not(.occupied)')
let movieCost = movie.value
let amountOfSeatsSelected = 0;
let selectedSeatsList
let seatsIndex


function displayCost(cost) {
    totalCost.innerHTML = cost
}

//Saves existing data to local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

//Get data from local storage and populate UI
function populateUI() {

    //Gets the stored seats array from local storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if(selectedSeats!== null && selectedSeats.length > 0) {
        seatsNotOccupied.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    //Gets the current movie selected, and cost of movie from local storage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex!== null) {
        movie.selectedIndex = selectedMovieIndex;
    }

    //Updates the interface to show existing selected seats and movie cost
    movieCost = movie.value
    amountOfSeatsSelected = selectedSeats.length;
    totalSeats.innerHTML = amountOfSeatsSelected;
    displayCost(`$${movieCost*amountOfSeatsSelected}`)


    //Randomly
    
}

selectedSeat.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        if(e.target.classList.contains('selected')) {
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
        seatsIndex = [...selectedSeatsList].map( seat => {
            return [...seatsNotOccupied].indexOf(seat)
        })

        //Put in local storage
        localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    } else if(e.target.classList.contains('occupied')) {
        alert("This seat is not available. Please choose a different seat.")
    }
    
})

movie.addEventListener('change', (e)=> {
    movieCost = movie.value;
    //Saves current selected movie and price
    setMovieData(e.target.selectedIndex, e.target.value);
    displayCost(`$${movieCost*amountOfSeatsSelected}`)
    
})

//console.log(movie[2].innerHTML)
populatePreviousSelections();