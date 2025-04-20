import axios from 'axios';
import fs from 'fs';
import path from 'path';

// --- Configuration ---
// ... (Keep your existing configuration) ...
const API_ENDPOINT = 'http://localhost:5000/cell/get';
const OUTPUT_JSON_FILE = 'animal_board_with_text.json';
const BOARD_SIZE = 24;
const BOARD_NAME = 'Animais 2';
const TARGET_CATEGORY = 'animal';
const BOARD_TYPE = '0';
const USER_ID = '67d1ba27049c3eae90ec8c9e';
// ---------------------

// ... (shuffleArray function remains the same) ...
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function createAnimalBoardWithTextFromAPI() {
    // ... (Initial logs and config validation remain the same) ...
    console.log(`--- Iniciando criação de quadro (${BOARD_SIZE} células) ---`);
    console.log(`--- Filtros: texto não vazio E categoria '${TARGET_CATEGORY}' ---`);
    console.log(`--- Buscando células da API: ${API_ENDPOINT} ---`);
    const lowerTargetCategory = TARGET_CATEGORY.toLowerCase();
     if (!USER_ID || USER_ID === 'YOUR_USER_ID_HERE') { /* ... */ process.exit(1);}
     if (BOARD_TYPE !== '0' && BOARD_TYPE !== '1') { /* ... */ process.exit(1);}
     if (BOARD_SIZE <= 0) { /* ... */ process.exit(1);}


    let liveCells;

    // 1. Fetch data from the API
    try {
        // ... (API fetch logic remains the same) ...
        const response = await axios.get(API_ENDPOINT);
        liveCells = response.data;
        if (!Array.isArray(liveCells)) { /* ... */ process.exit(1); }
        console.log(`API Success: ${liveCells.length} total cells found.`);

    } catch (error) {
        // ... (API error handling remains the same) ...
        console.error(`\nAPI Error: Failed to fetch data from ${API_ENDPOINT}`);
        /* ... */ process.exit(1);
    }

    // ---- DEBUGGING: Inspect sample cell data ----
    console.log("\n--- DEBUG: Inspecting first 15 cells from API ---");
    let potentialMatches = 0;
    for(let i = 0; i < Math.min(liveCells.length, 200); i++) {
        const cell = liveCells[i];
        if (!cell) continue;
        const textNotEmpty = cell.text && String(cell.text).trim() !== '';
        const categoriesIsArray = Array.isArray(cell.categories);
        let hasAnimalCategory = false;
        if (categoriesIsArray) {
            hasAnimalCategory = cell.categories.some(category =>
                String(category).trim().toLowerCase() === lowerTargetCategory // Added trim() here for check
            );
        }
        console.log(`Cell ${i}: _id=${cell._id}`);
        console.log(`  -> Text: '${cell.text}' (NotEmpty=${textNotEmpty})`);
        console.log(`  -> Categories: ${JSON.stringify(cell.categories)} (IsArray=${categoriesIsArray}, HasAnimal=${hasAnimalCategory})`);
        if(textNotEmpty && hasAnimalCategory){
            potentialMatches++;
        }
    }
    console.log(`--- DEBUG: Found ${potentialMatches} potential matches in the first 15 cells ---`);
    console.log("-------------------------------------------------\n");
    // ---- END DEBUGGING ----


    // 2. Filter cells: require _id, non-empty text, AND target category
    console.log(`Filtering cells: must have _id, non-empty text, AND category '${TARGET_CATEGORY}'...`);
    const validCellsForBoard = liveCells.filter(cell => {
        const textIsValid = cell && cell.text && String(cell.text).trim() !== '';
        const categoriesIsValid = Array.isArray(cell.categories) &&
                               cell.categories.some(category =>
                                   // Add trim() here as well for robustness
                                   String(category).trim().toLowerCase() === lowerTargetCategory
                               );
        return cell && typeof cell._id !== 'undefined' && textIsValid && categoriesIsValid;
    });
    console.log(` -> ${validCellsForBoard.length} cells remaining after filtering.`);

    // 3. Check if enough valid cells are available
    if (validCellsForBoard.length < BOARD_SIZE) {
        console.error(`\nError: Not enough valid cells found (${validCellsForBoard.length}) matching all criteria to create a board of size ${BOARD_SIZE}.\n`);
        // Consider not exiting if you want to see the rest of the process with fewer cells
         process.exit(1);
    }

    // ... (Rest of the script: Shuffle, Select, Format, Save remains the same) ...

    // 4. Shuffle
    console.log('Shuffling valid cells...');
    shuffleArray(validCellsForBoard);

    // 5. Select
    console.log(`Selecting the first ${BOARD_SIZE} shuffled cells...`);
    const selectedCells = validCellsForBoard.slice(0, BOARD_SIZE);

    // 6. Format
    const boardCells = selectedCells.map(cell => ({
        cellId: String(cell._id),
        cellType: "cell"
    }));

    // 7. Create final object
    const finalBoard = {
        name: BOARD_NAME,
        numCells: boardCells.length,
        type: BOARD_TYPE,
        userId: USER_ID,
        cells: boardCells
    };

    // 8. Save
    const outputFilePath = path.join(process.cwd(), OUTPUT_JSON_FILE);
    try {
        console.log(`\nSaving the final board structure to ${outputFilePath}...`);
        const outputJsonData = JSON.stringify(finalBoard, null, 2);
        fs.writeFileSync(outputFilePath, outputJsonData, 'utf8');
        console.log('Board saved successfully!');
        console.log(` -> Name: ${finalBoard.name}`);
        console.log(` -> Number of Cells: ${finalBoard.numCells}`);
        console.log(` -> Type: ${finalBoard.type}`);
        console.log(` -> User ID: ${finalBoard.userId}`);
    } catch (error) {
        console.error(`\nFile Error: Failed to save the board to ${outputFilePath}:`, error.message);
        process.exit(1);
    }

    console.log('\n--- Script finished ---');
}

// --- Run the main function ---
createAnimalBoardWithTextFromAPI().catch(error => {
    console.error("\n--- Unexpected Error during script execution ---");
    console.error(error);
    process.exit(1);
});