import axios from 'axios';
import fs from 'fs';
import path from 'path';

// --- Configuration ---
const apiUrl = 'http://localhost:5000/cell/get'; // Your local API endpoint
const outputFilename = 'all_cells_backup.json'; // Name for the output JSON file
// ---------------------

async function backupAllCells() {
  console.log(`Attempting to fetch all cells from: ${apiUrl}`);

  try {
    // 1. Make the GET request to your local API
    const response = await axios.get(apiUrl, {
        // Optional: Increase timeout if the response is very large and takes time
        timeout: 60000 // e.g., 60 seconds 
    });

    const allCells = response.data;

    // Check if data was received and is an array (basic validation)
    if (!Array.isArray(allCells)) {
        console.error('Error: The response from the API was not an array as expected.');
        console.error('Received data:', allCells);
        process.exit(1);
    }

    const cellCount = allCells.length;
    console.log(`Successfully fetched ${cellCount} cells.`);

    if (cellCount === 0) {
        console.log("Warning: Fetched 0 cells. The output file will be an empty array.");
    }

    // 2. Prepare the output file path
    const outputPath = path.join(process.cwd(), outputFilename);
    console.log(`Preparing to save data to: ${outputPath}`);

    // 3. Convert the data to a pretty-printed JSON string
    const jsonData = JSON.stringify(allCells, null, 2); // null, 2 for indentation

    // 4. Write the JSON string to the file
    fs.writeFileSync(outputPath, jsonData, 'utf8'); // Specify encoding

    console.log(`Successfully saved ${cellCount} cells to ${outputFilename}`);

  } catch (error) {
    console.error("\n--- An Error Occurred ---");
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(`API Error: Received status code ${error.response.status}`);
      console.error(`Error details: ${error.message}`);
      // You might want to log error.response.data if the server sends useful error details
      // console.error("Server response data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      console.error(`Network Error: No response received from ${apiUrl}.`);
      console.error(`Is the server running at that address and port?`);
      console.error(`Error details: ${error.message}`); // e.g., ECONNREFUSED
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Script/Setup Error:', error.message);
    }
    console.error("-------------------------\n");
    process.exit(1); // Exit with a non-zero code to indicate failure
  }
}

// --- Run the backup function ---
backupAllCells();