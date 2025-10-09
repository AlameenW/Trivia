import React, { useState, useEffect } from "react"; // ✅ Add missing imports
import EventsAPI from "../../services/EventsAPI";
import Event from "../components/Event";

const EventsListing = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsData = await EventsAPI.getEvents(); // ✅ getEvents() already returns parsed data
        console.log("Events data:", eventsData);
        setEvents(eventsData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching events data:", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div>
      <h2>All Events</h2>
      {events && events.length > 0 ? (
        <div className="events-grid">
          {events.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              image={event.image}
            />
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventsListing;
