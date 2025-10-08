const getAllLocations = async () => {
    try{
        const response = await fetch('http://localhost:3000/locations');
        const locations = await response.json();
        console.log('Locations loaded successfully');
        return locations.rows;
    }
    catch(error){
        console.log(`Error fetching location data ${error}`);
    }
}


export default {getAllLocations};