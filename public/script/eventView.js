const eventView = document.getElementById('event-view');

function loadEventView(){
    let titles = [];
    let types = []
    events.forEach(event => {
        let types = events.filter(e=> e.title==event.title && !titles.includes(event.title))
        if(types.length==0)
            return;
        titles.push(event.title);
        let div = document.createElement('div');
        div.id = "event-card";
        div.innerHTML = `<div id="event-view-title">${titles[titles.length-1]}</div>`
        types.forEach(type=>{
            div.innerHTML = div.innerHTML + `<div id="event-details">Date-> ${type.date}, Start-> ${type.stime}, End ${type.etime}</div>`
        })

        eventView.appendChild(div);
    });
}