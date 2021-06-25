let input = document.getElementById("input-container");
let title = document.getElementById("title");
let indate = document.getElementById("date");
let etime = document.getElementById("end-time");
let stime = document.getElementById("start-time");

function saveEvent(){
    indate.classList.remove("error");
    title.classList.remove("error");
    stime.classList.remove("error");
    etime.classList.remove("error");
    if(title.value && stime.value && etime.value && indate){
        let event = {
            date: indate.value,
            stime: stime.value,
            etime: etime.value,
            title: title.value
        }
        
        if(!checkTime(event.stime, event.etime)){
            alert("Invalid start time or end time");
            stime.classList.add("error");
            etime.classList.add("error");
            return;
        }

        if(isExist(event)){
            alert("already exist or event overlapping occur");
        }else{
            events.push(event);
            localStorage.setItem('events', JSON.stringify(events));
        }
        setView()
        loadTodayEventes()
        closeInput();
        return;
    }if(!indate){
        indate.classList.add("error");
    }if(!title.value){
        title.classList.add("error");
    }if(!stime.value){
        stime.classList.add("error");
    }if(!etime.value){
        etime.classList.add("error");
    }
}

function openInput(date){
    input.style.display = "";
    if(date!=null)
        indate.value = date;
    clicked = date;
}
function closeInput(){
    input.style.display = "none";
    title.value = "";
    etime.value = "";
    stime.value = "";
    clicked = null;
    indate.classList.remove("error");
    title.classList.remove("error");
    stime.classList.remove("error");
    etime.classList.remove("error");
}

function isExist(e){
    return events.find(event => e.date==event.date && e.title==event.title && isOverLap(e, event) );
}
function checkTime(t1, t2){
    let hr1 = parseInt(t1.substring(0, 2));
    let hr2 = parseInt(t2.substring(0, 2));
    let m1 = parseInt(t1.substring(3, 5));
    let m2 = parseInt(t2.substring(3, 5));

    if(hr1>hr2)
        return 0;
    if(hr1==hr2 && m1==m2)
        return 0;
    if(hr1==hr2 && m1>m2){
        return 0;
    }
    else{
        return 1;
    }
}

function isOverLap(e1, e2){
    // start time of event 1
    let hrs1 = parseInt(e1.stime.substring(0, 2));
    let ms1 = parseInt(e1.stime.substring(3, 5));

    // end time for event 1
    let hre1 = parseInt(e1.etime.substring(0, 2));
    let me1 = parseInt(e1.etime.substring(3, 5));

    // start time of event 2
    let hrs2 = parseInt(e2.stime.substring(0, 2));
    let ms2 = parseInt(e2.stime.substring(3, 5));

    // end time of event 2
    let hre2 = parseInt(e2.etime.substring(0, 2));
    let me2 = parseInt(e2.etime.substring(3, 5));

    if(hrs1==hrs2 && hre1==hre2 && ms1==ms2 && me1==me2)
        return 1;

    // checking overlapping of stime
    if((hrs1<hrs2 &&  hrs2<hre1) || (hrs2<hrs1 &&  hrs1<hre2)){
        return 1;
    }
    if(hrs1==hrs2){
        if(hrs2<hre1 || hrs1<hre2)
            return 1;
    }
    if(hrs1==hrs2){
        if(me1>ms2 || me2>ms1)
            return 1;
    }    
    
    return 0;
}

document.getElementById("cancel").addEventListener('click', closeInput);
document.getElementById("save").addEventListener('click', saveEvent);

