const getAllLocations = async () => {
    try{
        const response = await fetch('http://localhost:3000/locations');
        const locations = await response.json();
        return locations.rows;
    }
    catch(error){
        console.log(`Error fetching location data ${error}`);
    }
}

const getLocationById = async (id) => {
    try{
        const response = await fetch(`http://localhost:3000/locations/${id}`)
        const location = await response.json();
        return location;
    }
    catch(error){
        console.log(`Error fetching event data ${error}`)
    }
}


export {getAllLocations, getLocationById};