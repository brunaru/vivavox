import axios from 'axios';
import fs from 'fs';
import path from 'path';

// --- Configuration ---
const API_ENDPOINT = 'http://localhost:5000/cell/get'; // API endpoint to fetch all cells
const OUTPUT_JSON_FILE = 'live_balanced_board.json'; // Updated output file name
const BOARD_SIZE = 24;                               // Desired number of cells on the board
const BOARD_NAME = 'Padrão 1';      // Updated board name
const DEFAULT_COLOR_KEY = 'unknown_color';            // Key for cells without a color field
// ---------------------

// Fisher-Yates (Knuth) Shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function createBalancedBoardWithTextFromAPI() {
    console.log(`--- Iniciando criação de quadro balanceado (${BOARD_SIZE} células) com texto não vazio ---`);
    console.log(`--- Buscando células da API: ${API_ENDPOINT} ---`);

    let liveCells;

    // 1. Fetch data from the API
    try {
        const response = await axios.get(API_ENDPOINT);
        liveCells = response.data;

        if (!Array.isArray(liveCells)) {
            console.error(`Erro Fatal: A resposta da API (${API_ENDPOINT}) não foi um array JSON válido.`);
            console.error("Resposta recebida:", liveCells);
            process.exit(1);
        }
        console.log(`API retornou com sucesso. ${liveCells.length} células encontradas.`);

    } catch (error) {
        // ... (Error handling remains the same) ...
         console.error(`\n--- Erro Fatal ao buscar dados da API (${API_ENDPOINT}) ---`);
         if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error(`   Data: ${JSON.stringify(error.response.data)}`);
         } else if (error.request) {
            console.error(`   Erro de rede/conexão: ${error.message}`);
            console.error(`   Verifique se o servidor em ${API_ENDPOINT} está rodando.`);
         } else {
            console.error(`   Erro inesperado: ${error.message}`);
         }
         console.error("----------------------------------------\n");
         process.exit(1);
    }

    // ---- NEW: Filter cells based on _id and non-empty text ----
    console.log('Filtrando células: requer _id e texto não vazio...');
    const validCellsForBoard = liveCells.filter(cell =>
        cell &&                              // Cell exists
        typeof cell._id !== 'undefined' &&   // Has an _id
        cell.text &&                         // Text exists and is not null/undefined
        String(cell.text).trim() !== ''      // Text is not an empty string (after trimming whitespace)
    );
    console.log(` -> ${validCellsForBoard.length} células restantes após filtragem.`);
    // ---------------------------------------------------------


    // --- Validate board size against *filtered* cells ---
     if (validCellsForBoard.length < BOARD_SIZE) {
         console.warn(`Aviso: O número de células válidas com texto (${validCellsForBoard.length}) é menor que o BOARD_SIZE desejado (${BOARD_SIZE}). O quadro final terá no máximo ${validCellsForBoard.length} células.`);
     }
     if (BOARD_SIZE <= 0) {
        console.error(`Erro Fatal: BOARD_SIZE deve ser um número positivo.`);
        process.exit(1);
     }
     // ----------------------------------------------------


    // 2. Group cell IDs by color (using *filtered* data)
    console.log('Agrupando células filtradas por cor...');
    const cellsByColor = {};
    // No need to count validCellsCount here, it's validCellsForBoard.length
    for (const cell of validCellsForBoard) {
        // We already know cell and cell._id exist from the filter
        const colorKey = (cell.color || DEFAULT_COLOR_KEY).toUpperCase();
        if (!cellsByColor[colorKey]) {
            cellsByColor[colorKey] = [];
        }
        cellsByColor[colorKey].push(String(cell._id)); // Store only the ID
    }

    const colorGroups = Object.keys(cellsByColor);
    console.log(`Células filtradas agrupadas em ${colorGroups.length} cores:`);
    colorGroups.forEach(color => {
        console.log(` - Cor ${color}: ${cellsByColor[color].length} células`);
    });


    // 3. Shuffle IDs within each color group
    console.log('Embaralhando células dentro de cada grupo de cor...');
    for (const colorKey in cellsByColor) {
        shuffleArray(cellsByColor[colorKey]);
    }

    // 4. Select cells using round-robin approach (logic remains the same, operates on filtered groups)
    console.log(`Selecionando ${BOARD_SIZE} células de forma balanceada...`);
    const selectedCellIds = new Set();
    const boardCells = [];
    let currentCellIndexByColor = {};
    colorGroups.forEach(color => currentCellIndexByColor[color] = 0);

    let attempts = 0;
    const maxAttempts = validCellsForBoard.length * 2 + BOARD_SIZE; // Use filtered count for max attempts

    while (boardCells.length < BOARD_SIZE && attempts < maxAttempts) {
        let cellAddedInCycle = false;
        for (const colorKey of colorGroups) {
            if (boardCells.length >= BOARD_SIZE) break;

            const availableIds = cellsByColor[colorKey];
            let currentIndex = currentCellIndexByColor[colorKey];

            while (currentIndex < availableIds.length) {
                 const candidateId = availableIds[currentIndex];
                 if (!selectedCellIds.has(candidateId)) {
                     selectedCellIds.add(candidateId);
                     boardCells.push({
                         cellId: candidateId,
                         cellType: "cell"
                     });
                     currentCellIndexByColor[colorKey] = currentIndex + 1;
                     cellAddedInCycle = true;
                     break;
                 }
                 currentIndex++;
            }
        }
        if (!cellAddedInCycle && boardCells.length < BOARD_SIZE) {
             console.warn(`Aviso: Não foi possível adicionar mais células (com texto). Quadro final terá ${boardCells.length} células.`);
            break;
        }
        attempts++;
    }

     if (attempts >= maxAttempts) {
         console.error("Erro: Atingido limite máximo de tentativas na seleção de células.");
     }

    // 5. Create the final board object
    const finalBoard = {
        name: BOARD_NAME,
        numCells: boardCells.length,
        cells: boardCells
    };

    // 6. Save the board to the output file
    const outputFilePath = path.join(process.cwd(), OUTPUT_JSON_FILE);
    try {
        console.log(`\nSalvando quadro final em ${outputFilePath}...`);
        const outputJsonData = JSON.stringify(finalBoard, null, 2);
        fs.writeFileSync(outputFilePath, outputJsonData, 'utf8');
        console.log('Quadro salvo com sucesso!');
        console.log(` -> Nome: ${finalBoard.name}`);
        console.log(` -> Número de Células: ${finalBoard.numCells}`);
        console.log(' -> Distribuição de cores no quadro final (baseada nas células selecionadas):');
        // Calculate final distribution
        const finalColorCounts = {};
         boardCells.forEach(boardCell => {
             // Find original color by checking the groups we created
             let originalColor = DEFAULT_COLOR_KEY.toUpperCase();
             for(const colorKey in cellsByColor){
                 // Check if the *original group* contained this ID
                 if(cellsByColor[colorKey].includes(boardCell.cellId)){
                     originalColor = colorKey;
                     break;
                 }
             }
             finalColorCounts[originalColor] = (finalColorCounts[originalColor] || 0) + 1;
         });
         Object.entries(finalColorCounts)
               .sort(([, countA], [, countB]) => countB - countA)
               .forEach(([color, count]) => console.log(`    - ${color}: ${count}`));

    } catch (error) {
        console.error(`Erro Fatal ao salvar o arquivo ${outputFilePath}:`, error.message);
        process.exit(1);
    }

    console.log('\n--- Script finalizado ---');
}

// --- Run the main function ---
createBalancedBoardWithTextFromAPI().catch(error => {
    console.error("\n--- Erro Inesperado na Execução Principal ---");
    console.error(error);
    process.exit(1);
});