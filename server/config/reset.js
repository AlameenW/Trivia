import pool from "../config/database.js";
import locationData from "../data/locationData.js";
import dotenv from './dotenv.js'
dotenv.config();
const createLocationsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        zip TEXT NOT NULL,
        image VARCHAR(255) NOT NULL
    )
    `;
  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 Locations table created successfully");
  } catch (err) {
    console.log("⚠️ Error creating Locations table", err);
  }
};

const seedLocationsTable = async () => {
  await createLocationsTable();
  locationData.forEach((location) => {
    const insertQuery = {
      text: "INSERT INTO Locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)",
    };

    const values = [
        location.name,
        location.address,
        location.city,
        location.state,
        location.zip,
        location.image,
    ]

    pool.query(insertQuery, values, (err, res) => {
        if(err){
            console.log(`Error inserting location data, ${err}`);
            return;
        }
        else{
            console.log(`✅ ${location.name} added successfully`);
        }
    })
  });
};
seedLocationsTable();