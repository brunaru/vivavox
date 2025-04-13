import axios from 'axios';
import fs from 'fs';
import path from 'path';

// --- Configuration ---
const API_ENDPOINT = 'http://localhost:5000/cell/get';
const OUTPUT_JSON_FILE = 'board_2.json'; // Updated output file name
const BOARD_SIZE = 24; // Must be divisible by the number of target colors
const BOARD_NAME = 'Padrão 2'; 
const BOARD_TYPE = '0'; // '0' for standard, '1' for communication book etc.
const USER_ID = '67d1ba27049c3eae90ec8c9e'; // *** REPLACE WITH YOUR ACTUAL USER ID ***

// Define the target colors and their desired count
const TARGET_COLORS = {
    substantivos: '#4169E1', // Azul
    verbos: '#2E8B57',      // Verde
    adjetivos: '#FF8C00',   // Laranja
    sociais: '#FF69B4',     // Rosa
    numeros: '#808080',     // Cinza
    basicas: '#FFD700'      // Amarelo
};
const NUM_TARGET_COLORS = Object.keys(TARGET_COLORS).length;

// Validate configuration
if (!USER_ID || USER_ID === 'YOUR_USER_ID_HERE') {
    console.error("Error: USER_ID is not set. Please replace 'YOUR_USER_ID_HERE' with your actual User ID.");
    process.exit(1);
}
if (BOARD_TYPE !== '0' && BOARD_TYPE !== '1') {
    console.error(`Error: Invalid BOARD_TYPE '${BOARD_TYPE}'. Must be '0' or '1'.`);
    process.exit(1);
}
if (BOARD_SIZE <= 0) {
    console.error(`Error: Invalid BOARD_SIZE '${BOARD_SIZE}'. Must be a positive number.`);
    process.exit(1);
}
if (BOARD_SIZE % NUM_TARGET_COLORS !== 0) {
    console.error(`Error: BOARD_SIZE (${BOARD_SIZE}) must be perfectly divisible by the number of target colors (${NUM_TARGET_COLORS}).`);
    process.exit(1);
}
const CELLS_PER_COLOR = BOARD_SIZE / NUM_TARGET_COLORS;
// ---------------------

// --- Utility Functions ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// -----------------------

async function createBoardDistributedByColor() {
    console.log(`--- Iniciando criação de quadro (${BOARD_SIZE} células) ---`);
    console.log(`--- Selecionando ${CELLS_PER_COLOR} células para cada uma das ${NUM_TARGET_COLORS} cores alvo ---`);
    console.log(`--- Cores Alvo: ${Object.entries(TARGET_COLORS).map(([name, hex]) => `${name} (${hex})`).join(', ')} ---`);
    console.log(`--- Buscando células da API: ${API_ENDPOINT} ---`);

    let liveCells;

    // 1. Fetch data from the API
    try {
        const response = await axios.get(API_ENDPOINT);
        liveCells = response.data;
        if (!Array.isArray(liveCells)) {
            throw new Error('API response data is not an array.');
        }
        console.log(`API Success: ${liveCells.length} total cells found.`);

    } catch (error) {
        console.error(`\nAPI Error: Failed to fetch data from ${API_ENDPOINT}`);
        console.error(error.message || error);
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Data: ${JSON.stringify(error.response.data)}`);
        }
        process.exit(1);
    }

    // 2. Filter and Group Cells by Target Color
    console.log(`Filtrando e agrupando células por cor (requer _id, texto não vazio e cor alvo)...`);
    const cellsByColor = {};
    // Initialize the structure with target colors
    Object.values(TARGET_COLORS).forEach(colorHex => {
        cellsByColor[colorHex] = [];
    });

    liveCells.forEach(cell => {
        const hasId = cell && typeof cell._id !== 'undefined';
        const hasText = cell && cell.text && String(cell.text).trim() !== '';
        const hasValidColor = cell && cell.color && cellsByColor.hasOwnProperty(cell.color); // Check if the color is one we care about

        if (hasId && hasText && hasValidColor) {
            cellsByColor[cell.color].push(cell);
        }
    });

    // Log counts for each color group
    Object.entries(TARGET_COLORS).forEach(([name, colorHex]) => {
        const count = cellsByColor[colorHex] ? cellsByColor[colorHex].length : 0;
        console.log(` -> Cor ${name} (${colorHex}): ${count} células encontradas com texto não vazio.`);
    });

    // 3. Select Cells per Color Group
    console.log(`\nSelecionando ${CELLS_PER_COLOR} células para cada cor...`);
    const selectedCells = [];
    let allColorsHaveEnough = true;

    for (const [name, colorHex] of Object.entries(TARGET_COLORS)) {
        const colorGroup = cellsByColor[colorHex];
        console.log(`Processando cor ${name} (${colorHex})...`);

        if (!colorGroup || colorGroup.length < CELLS_PER_COLOR) {
            console.error(`  -> Erro: Células insuficientes para a cor ${name} (${colorHex}). Encontradas: ${colorGroup?.length || 0}, Necessárias: ${CELLS_PER_COLOR}.`);
            allColorsHaveEnough = false;
            // Continue processing other colors to show full report, but mark failure
        } else {
            // Shuffle cells within this color group
            shuffleArray(colorGroup);
            // Select the required number of cells
            const cellsToAdd = colorGroup.slice(0, CELLS_PER_COLOR);
            selectedCells.push(...cellsToAdd); // Add the selected cells to the main list
            console.log(`  -> Selecionadas ${cellsToAdd.length} células.`);
        }
    }

    // 4. Check if enough cells were selected overall
    if (!allColorsHaveEnough) {
        console.error(`\nErro Fatal: Não foi possível encontrar células suficientes para todas as cores alvo para criar um quadro de tamanho ${BOARD_SIZE}.`);
        process.exit(1);
    }

    if (selectedCells.length !== BOARD_SIZE) {
         // This check is a safeguard, should theoretically not happen if allColorsHaveEnough is true
         console.error(`\nErro Inesperado: O número final de células selecionadas (${selectedCells.length}) não corresponde ao tamanho do quadro desejado (${BOARD_SIZE}).`);
         process.exit(1);
    }

    // 5. Shuffle the final combined list (optional but recommended for board layout)
    console.log(`\nEmbaralhando a lista final de ${selectedCells.length} células selecionadas...`);
    shuffleArray(selectedCells);

    // 6. Format Cells for Board
    const boardCells = selectedCells.map(cell => ({
        cellId: String(cell._id), // Ensure ID is a string
        cellType: "cell"
    }));

    // 7. Create final Board Object
    const finalBoard = {
        name: BOARD_NAME,
        numCells: boardCells.length,
        type: BOARD_TYPE,
        userId: USER_ID,
        cells: boardCells // Already shuffled
    };

    // 8. Save the Board to JSON File
    const outputFilePath = path.join(process.cwd(), OUTPUT_JSON_FILE);
    try {
        console.log(`\nSalvando a estrutura final do quadro em ${outputFilePath}...`);
        const outputJsonData = JSON.stringify(finalBoard, null, 2); // Pretty print JSON
        fs.writeFileSync(outputFilePath, outputJsonData, 'utf8');
        console.log('Quadro salvo com sucesso!');
        console.log(` -> Nome: ${finalBoard.name}`);
        console.log(` -> Número de Células: ${finalBoard.numCells}`);
        console.log(` -> Tipo: ${finalBoard.type}`);
        console.log(` -> User ID: ${finalBoard.userId}`);
        // console.log(` -> Prévia das Células: ${JSON.stringify(finalBoard.cells.slice(0, 5))}...`); // Optional preview
    } catch (error) {
        console.error(`\nErro de Arquivo: Falha ao salvar o quadro em ${outputFilePath}:`, error.message);
        process.exit(1);
    }

    console.log('\n--- Script finalizado ---');
}

// --- Run the main function ---
createBoardDistributedByColor().catch(error => {
    console.error("\n--- Erro Inesperado durante a execução do script ---");
    console.error(error);
    process.exit(1);
});