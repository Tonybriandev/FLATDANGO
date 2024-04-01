// getting elemnts by their Ids
const myRequest = new Request('http://localhost:3000/films');
const title = document.getElementById('title');
const runtime = document.getElementById('runtime');
const filmInfo = document.getElementById('film-info');
const showtime = document.getElementById('showtime');
const ticketNum = document.getElementById('ticket-num');
const buyTicket = document.getElementById('buy-ticket');
const poster = document.getElementById('poster');
const films = document.getElementById('films');
const subtitle = document.getElementById('subtitle');
const showing = document.getElementById('showing');

let remainingTickets;
// Fetching data from the database
fetch(myRequest)
	.then((response) => response.json())
	.then((data) => {
		console.log(typeof data);
		for (let i = 0; i < data.length; i++) {
			let obj = data[i];
			const li = document.createElement('li');
			li.textContent = `${obj.title}`;
			films.appendChild(li);
			li.addEventListener('click', () => {
                remainingTickets = obj.capacity - obj.tickets_sold;
                updateTicketCount();
				title.textContent = `${obj.title}`;
				runtime.textContent = `${obj.runtime}`;
				filmInfo.textContent = `${obj.description}`;
				showtime.textContent = `${obj.showtime}`;
				ticketNum.textContent = `${remainingTickets}`;
				poster.src = `${obj.poster}`;
			});
			// To display the first movie with its description
            if (i === 0){
                li.click();
            }
		}
	}
    );
	// Doing the calculation for tickets
    function updateTicketCount(){
    buyTicket.removeEventListener('click', buyTicketHandler);
    buyTicket.addEventListener('click', buyTicketHandler);
}
function buyTicketHandler(){
    if (remainingTickets > 0) {
        remainingTickets--;
        ticketNum.textContent = remainingTickets;
    }
}