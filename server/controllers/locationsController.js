import pool from "../config/database.js";

const getLocations = async (req, res) => {
  try {
    const locations = await pool.query(
      "SELECT * FROM Locations ORDER BY id ASC"
    );
    res.status(200).json(locations);
  } catch (error) {
    console.log("Error getting locations @ locations controller");
    res.status(409).json({ error: error.message });
  }
};

const getLocationById = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from URL parameters

    const location = await pool.query("SELECT * FROM Locations WHERE id = $1", [
      id,
    ]);

    // Check if location exists
    if (location.rows.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.status(200).json(location.rows); // Return single location object
  } catch (error) {
    console.log("Error getting location by ID @ locations controller", error);
    res.status(409).json({ error: error.message });
  }
};

export { getLocations, getLocationById };
