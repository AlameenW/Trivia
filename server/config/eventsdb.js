import pool from "../config/database.js";
import eventData from "../data/eventData.js";
import dotenv from "./dotenv.js";
dotenv.config();
const createEventsTable = async () => {
  const createTablequery = `
     CREATE TABLE IF NOT EXISTS Events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        time INTEGER NOT NULL,
        location INTEGER NOT NULL,
        image VARCHAR(255) NOT NULL
    )
    `;
  try {
    const response = await pool.query(createTablequery);
    console.log("🎉 Events table created successfully");
  } catch (err) {
    console.log("⚠️ Error creating Events table", err);
  }
};

const seedEventsTable = async () => {
  await createEventsTable();
  eventData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO Events (title, date, time, location, image) VALUES ($1, $2, $3, $4, $5)",
    };

    const values = [
      event.title,
      event.date,
      event.time,
      event.location,
      event.image,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.log(`Error inserting event data, ${err}`);
        return;
      } else {
        console.log(`✅ ${event.id} added successfully`);
      }
    });
  });
};
seedEventsTable();
