const currDate = new Date();
let dt = new Date();

function loadByWeeks(){
    dates[1].innerHTML ="";
    if(dt.getDay()!=0){
        dt.setDate(dt.getDate()-dt.getDay());
    }
    let day = dt.getDate();
    const month = dt.getMonth();
    const yr = dt.getFullYear();
    let tempDate = new Date(yr, month, day);
    for(let i=0; i<7; i++){
        let date = document.createElement('div');
        date.classList.add("day7");
        
        let adate;
        let d = tempDate.getDate();
        if(d<10){
            d = `0${d}`;
        }
        let m = tempDate.getMonth()+1;
            if(m<10){
                m = `0${m}`;
        }
        adate = `${yr}-${m}-${d}`;
        
        date.addEventListener('click', ()=>{
            openInput(adate);
        })
        let newDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())
        date.addEventListener('contextmenu', e =>{
            e.preventDefault();
            console.log(newDate)
            openDayView(newDate);
        })
        
        let thisDayEvents = [];
        events.forEach(e => {
            if(e.date == adate)
                thisDayEvents.push(e);
        });

        date.innerHTML = `<div class="date-t">${tempDate.getDate()}</div>`
        if(thisDayEvents.length){
            thisDayEvents.forEach(e =>{
                date.innerHTML = date.innerHTML + `<div class="event-month-view"><span class="time-stamp">${e.stime}</span><sapn class="event-title">${e.title}</sapn></div>`
            })
            let childs = date.children;
            for(let i=1; i<childs.length; i++){
                childs[i].addEventListener('click', (e)=>{
                    e.stopPropagation();
                    deleteEvent(thisDayEvents[i-1]);
                })
            }
        }

        if(tempDate.getDate()==currDate.getDate() && tempDate.getMonth()==currDate.getMonth() && tempDate.getFullYear()==currDate.getFullYear()){
            date.style.backgroundColor = "inherit";
        }
        dates[1].appendChild(date);
        tempDate.setDate(tempDate.getDate()+1);
    }

    let date = document.querySelectorAll(".date");

    if(dt.getMonth()==tempDate.getMonth()){
        document.getElementById('month-display').innerText = `${dt.toLocaleDateString('en-us', {month:"short"})}, ${yr}`;
    }else{
        document.getElementById('month-display').innerText = `${dt.toLocaleDateString('en-us', {month:"short"})}-${tempDate.toLocaleDateString('en-us', {month:"short"})}, ${yr}`;
    }
}

function nextWeek(){
    dt.setDate(dt.getDate()+7);
    nav = dt.getMonth()-currDate.getMonth()+(12*(dt.getFullYear()-currDate.getFullYear()));
    dt3 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    loadByWeeks();
}
function backWeek(){
    dt.setDate(dt.getDate()-7);
    nav = dt.getMonth()-currDate.getMonth()+(12*(dt.getFullYear()-currDate.getFullYear()));
    dt3 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    loadByWeeks();
}
function backNextWeek(){
    back.addEventListener('click', backWeek);
    next.addEventListener('click', nextWeek);
}