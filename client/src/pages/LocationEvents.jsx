import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
import EventsAPI from '../../services/EventsAPI'
import { getLocationById} from '../../services/LocationsAPI'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try{
                // Fetch event data
                const events = await EventsAPI.getEvents();
                const filteredEvents = events.filter(event => event.location === index);
                console.log(filteredEvents);
                setEvents(filteredEvents);

                // Fetch location data
                const locationData = await getLocationById(index);
                setLocation(locationData[0]);               

            }
            catch(error){
                console.log('Error fecthing events @ LocationEvents.jsx'+error);
            }
        }
        fetchData();
    },[index]);
    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents