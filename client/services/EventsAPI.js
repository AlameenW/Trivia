const getEvents = async() => {
    try{
        const response = await fetch('http://localhost:3000/events');
        const events = await response.json();
        return events.rows;
    }
    catch(error){
        console.log(`Error fetching events data @ EventsAPI ${error}`);
    }
}

const getEventById = async(id) => {
    try{
        const response = await fetch(`http://localhost:3000/events/${id}`)
        const event = await response.json();
        return event;
    }
    catch(error){
        console.log(`Error fetching event data`)
    }
}
export default {getEvents, getEventById}