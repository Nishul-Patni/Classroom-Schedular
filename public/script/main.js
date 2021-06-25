
let dates = document.querySelectorAll(".dates");
const next = document.getElementById('next');
const back = document.getElementById('back');
const month = document.getElementById('month');
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];


// const d = document.getElementById('days')

const filters = document.getElementById("filters");
filters.addEventListener('input', ()=>{
    setView();
})

function setView(){
    
    if (filters.value=='month' || filters.value=='week') {
        month.style.display ="";
        d.style.display = "none";
        eventView.display = "none";
        document.getElementById("change").style.display ="";
        next.removeEventListener('click', nextDay);
        back.removeEventListener('click', backDay);
    }
    
    if(filters.value=="month"){
        next.removeEventListener('click', nextWeek);
        back.removeEventListener('click', backWeek);
        console.log(filters.value);
        dates[0].style.display = ""
        dates[1].style.display = "none";
        // if(currDate.getDate()!=dt.getDate() || currDate.getMonth()!=dt.getMonth() || currDate.getFullYear()!=dt.getFullYear()){
        //     nav = dt.getMonth()-currDate.getMonth()+(12*(dt.getFullYear()-currDate.getFullYear()));
        // }

        backNextMonth();
        
        loadByMonths();
    }
    else if(filters.value=="week"){
        next.removeEventListener('click', nextMonth);
        back.removeEventListener('click', backMonth);
        

        console.log(filters.value);
        dates[0].style.display = "none"
        dates[1].style.display = "";
        // if(currDate.getDate()!=dt2.getDate() || currDate.getMonth()!=dt2.getMonth() || currDate.getFullYear()!=dt2.getFullYear())
        //     dt = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
                
        backNextWeek();
        loadByWeeks();
    }else if(filters.value=="day"){-
        
        next.removeEventListener('click', nextWeek);
        back.removeEventListener('click', backWeek);
        
        next.removeEventListener('click', nextMonth);
        back.removeEventListener('click', backMonth);
        


        month.style.display ="none";
        eventView.display = "none";
        document.getElementById("change").style.display ="";
        d.style.display = "";
        backNextDay()
        loadByDay();
    }else if(filters.value=="events"){
        document.getElementById("change").style.display ="none";
        month.style.display ="none";
        d.style.display = "none";
        eventView.display = "";

        loadEventView();

    }
}

function loadTodayEventes(){
    let tempDate = new Date();

    let d = tempDate.getDate();
    if(d<10){
        d = `0${d}`;
    }
    let m = tempDate.getMonth()+1;
    if(m<10){
        m = `0${m}`;
    }

    let todayDate = `${tempDate.getFullYear()}-${m}-${d}`
    let container = document.getElementById("today-event");
    container.innerHTML = "";
    container.innerHTML = `<h3 class="h">Today's Event</h3>`;

    todayEvents = events.filter(e=> e.date==todayDate)
    if(todayEvents.length){
        todayEvents.forEach(e => {
            let div = document.createElement("div");
            div.classList.add("today");
            div.classList.add("st");
            div.innerText = `title-> ${e.title}, Start-> ${e.stime}, End-> ${e.etime}`;
            container.appendChild(div);
        });
        
    }else{
        let div = document.createElement("div");
        div.classList.add("today");
        div.classList.add("st");
        div.innerText = "No Events Today"
        container.appendChild(div);
    }
}

loadByMonths();
loadTodayEventes();
backNextMonth();

