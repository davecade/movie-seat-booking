const movie = document.getElementById('movies')
const totalSeats = document.getElementById('amount-selected')
const totalCost = document.getElementById('cost')
const selectedSeat = document.querySelector('.seat-container')
let movieCost = movie.value
let amountOfSeatsSelected = 0;

function displayCost(cost) {
    totalCost.innerHTML = cost
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
    }
    
})

movie.addEventListener('change', ()=> {
    movieCost = movie.value;
    displayCost(`$${movieCost*amountOfSeatsSelected}`)
})


//copy the selected seats into arr
//Map through Array
//return a new array if indexes