let deletableEvent = null
const deleteEventView = document.getElementById("delete-event-view");
const deleteBox = document.getElementById('delete-container-background');
const deletCancel = document.getElementById('cancel-delete'); 
const del = document.getElementById('delete');

deletCancel.addEventListener('click', closeDeleteBox)
del.addEventListener('click', deleteDeletableEvent);
function deleteEvent(e){
    openDeleteBox(e);
    deletableEvent = e;
    console.log(e)
}



function openDeleteBox(e){
    deleteBox.style.display = "";
    deleteEventView.innerHTML = `Title = ${e.title}, Eate = ${e.date}, Start time = ${e.stime}, End time = ${e.etime}`
}
function closeDeleteBox(){
    deleteBox.style.display = "none";
    deletableEvent = null;
}
function deleteDeletableEvent(){
    events = events.filter(e=> !(e.date==deletableEvent.date && e.stime==deletableEvent.stime && e.etime==deletableEvent.etime && e.title == deletableEvent.title))
    localStorage.setItem('events', JSON.stringify(events));
    setView();
    closeDeleteBox();
}