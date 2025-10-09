import pool from "../config/database.js";

const getEvents = async (req, res) => {
  try {
    const events = await pool.query("SELECT * FROM events ORDER BY id ASC");
    res.status(200).json(events);
  } catch (error) {
    console.log(`Error fetching data @ eventsController ${error}`);
    res.status(409).json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const event = await pool.query("SELECT * FROM Events WHERE id = $1", [id]);
    if (event.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event.rows); 
  } catch (error) {
    console.log("Error getting event by ID @ events controller", error);
    res.status(409).json({ error: error.message });
  }
};
export  {getEvents, getEventById};
