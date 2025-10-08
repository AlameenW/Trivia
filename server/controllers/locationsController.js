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

export default getLocations;
