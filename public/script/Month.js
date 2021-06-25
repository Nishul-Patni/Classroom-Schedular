var nav = 0;
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let dt2;

function loadByMonths() {
    dates[0].innerHTML = "";
    dt2 = new Date();
    if (nav != 0) {
        dt2.setMonth(new Date().getMonth() + nav);
        dt2.setDate(1);
    }

    const day = dt2.getDate();
    const month = dt2.getMonth();
    const yr = dt2.getFullYear();

    const lastDayOfMonth = new Date(yr, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(yr, month, 1);
    firstDayOfMonth = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    firstDayOfMonth = weekdays.indexOf(firstDayOfMonth.split(',')[0]);
    document.getElementById('month-display').innerText = `${dt2.toLocaleDateString('en-us', { month: "short" })}, ${yr}`
    var days = 0;

    for (let i = 0; i < 35; i++) {
        let date = document.createElement('div');
        date.classList.add("date");

        if (i >= firstDayOfMonth && i <= lastDayOfMonth + firstDayOfMonth - 1) {
            if (i == day + 1 && nav == 0) {
                date.classList.add("current");
            }
            else {
                date.classList.add("not-padding");
            }
            
            let adate;  
            let d = i-firstDayOfMonth+1;
            if(d<10){
                d = `0${d}`;
            }
            let m = month+1;
            if(m<10){
                m = `0${m}`;
            }
            adate = `${yr}-${m}-${d}`;
            date.addEventListener('click', ()=>{
                openInput(adate);
            })
            date.addEventListener('contextmenu', e =>{
                e.preventDefault();
                openDayView(new Date(yr, month, i-firstDayOfMonth+1));
            })
            if (i>=firstDayOfMonth) {
                days++;
            }
            
            // finding and adding event if exist
            let eventOnDate = events.find(e=> e.date==adate)
            
            if(eventOnDate){
                date.innerHTML = `<div class="date-t">${i - firstDayOfMonth + 1}</div>
                <div class="event-month-view"><span class="time-stamp">${eventOnDate.stime}</span><sapn class="event-title">${eventOnDate.title}</sapn></div>`;
                date.lastChild.addEventListener('click', (e)=>{
                    e.stopPropagation()
                    deleteEvent(eventOnDate)
                });
            }else{
                date.innerHTML = `<div class="date-t">${i - firstDayOfMonth + 1}</div>`
            }
        }
        let eventContainer = document.createElement('div');
        dates[0].appendChild(date);
    }
    let date = document.querySelectorAll(".date");
    if (days < lastDayOfMonth) {
        var i = 0;
        while (days < lastDayOfMonth) {
            date[i].classList.add("not-padding");
            let adate;
            let d = days+1;
            if(d<10){
                d = `0${days}`;
            }
            let m = month+1;
            if(m<10){
                m = `0${m}`;
            }
            adate = `${yr}-${m}-${d}`;
            let tempDate = new Date(yr, month, days+1);
            date[i].addEventListener('click', ()=>{
                openInput(adate);
            })
            date[i].addEventListener('contextmenu', e =>{
                e.preventDefault();
                openDayView(tempDate);
            })
            // finding or adding event if exist
            let eventOnDate = events.find(e=> e.date==adate)
            if(eventOnDate){
                date[i].innerHTML =`<div class="date-t">${++days}</div>
                <div class="event-month-view"><span class="time-stamp">12:00</span><sapn class="event-title">t1</sapn></div>`;
                date[i].lastChild.addEventListener('click', (e)=>{
                    e.stopPropagation()
                    deleteEvent(eventOnDate)
                });
            }else{
                date[i].innerHTML =`<div class="date-t">${++days}</div>`
            }
            
            i++
        }
    }
}

function nextMonth(){
    nav++;
    loadByMonths();
    dt = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
    dt3 = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
}
function backMonth(){
    nav--;
    loadByMonths();
    dt = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
    dt3 = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
}

function backNextMonth() {
    back.addEventListener('click', backMonth)
    next.addEventListener('click', nextMonth);
}