let dt3 = new Date();
let num = document.getElementById("num");
let text = document.getElementById("text");
const d = document.getElementById('days')
const dayView = document.getElementById("day");
const todayDetail = document.getElementById("today-detail");

d.addEventListener('click', ()=>{
    let d = dt3.getDate();
    if(d<10){
        d = `0${d}`;
    }
    let m = dt3.getMonth()+1;
    if(m<10){
        m = `0${m}`;
    }
    openInput(`${dt.getFullYear()}-${m}-${d}`);
})
function loadByDay(){
    dayView.innerHTML = "";
    num.innerHTML = "";
    text.innerHTML = "";
    let adate;
    let d = dt3.getDate();
    if(d<10){
        d = `0${d}`;
    }
    let m = dt3.getMonth()+1;
    if(m<10){
        m = `0${m}`;
    }
    adate = `${dt.getFullYear()}-${m}-${d}`;

    num.innerHTML = dt3.getDate();
    text.innerHTML = dt3.toLocaleDateString('en-us', {weekday: 'short'});
    dayView.appendChild(todayDetail)    

    let thisDayEvents = [];
        events.forEach(e => {
            if(e.date == adate)
                thisDayEvents.push(e);
    });
    if(thisDayEvents.length){
        thisDayEvents.forEach(e=>{
            dayView.innerHTML = dayView.innerHTML + `<div class="event-month-view"><span class="time-stamp">${e.stime}</span><sapn class="event-title">${e.title}</sapn></div>`
        })
        let childs = dayView.children;
        for(let i=1; i<childs.length; i++){
            childs[i].addEventListener('click', (e)=>{
                e.stopPropagation();
                deleteEvent(thisDayEvents[i-1]);
            })
        }
    }

    document.getElementById('month-display').innerText = `${dt3.toLocaleDateString('en-us', { month: "short" })}, ${dt3.getFullYear()}`
}

function nextDay(){
    dt3 = new Date(dt3.getFullYear(), dt3.getMonth(), dt3.getDate()+1);
    loadByDay();
    nav = dt3.getMonth()-currDate.getMonth()+(12*(dt3.getFullYear()-currDate.getFullYear()));
    dt = new Date(dt3.getFullYear(), dt3.getMonth(), dt3.getDate());
}
function backDay(){
    dt3 = new Date(dt3.getFullYear(), dt3.getMonth(), dt3.getDate()-1);
    loadByDay();
    nav = dt3.getMonth()-currDate.getMonth()+(12*(dt3.getFullYear()-currDate.getFullYear()));
    dt = new Date(dt3.getFullYear(), dt3.getMonth(), dt3.getDate());
}
function backNextDay(){
    back.addEventListener('click', backDay);
    next.addEventListener('click', nextDay);
}

function sync(){
    nav = dt3.getMonth()-currDate.getMonth()+(12*(dt3.getFullYear()-currDate.getFullYear()));
    dt = new Date(dt3.getFullYear(), dt3.getMonth(), dt3.getDate());
}

function openDayView(date){
    dt3 = date;
    sync();
    filters.value = "day"
    setView()
}