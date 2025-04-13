import axios from 'axios';
import fs from 'fs';
import path from 'path';

// --- Configuration ---
const INPUT_JSON_FILE = 'all_cells_backup.json'; // File containing the cell data
const API_ENDPOINT = 'http://localhost:5000/cell/post'; // Your API endpoint for posting a cell
const REQUEST_DELAY_MS = 50; // Delay in milliseconds between POST requests (adjust as needed)
// Set to 0 if you want no delay, but be cautious with server load. 50ms is a reasonable starting point.
// ---------------------

async function postCellsToApi() {
    console.log(`--- Iniciando postagem de células de ${INPUT_JSON_FILE} para ${API_ENDPOINT} ---`);
    console.log(`--- Usando delay entre requisições: ${REQUEST_DELAY_MS}ms ---`);

    const inputFilePath = path.join(process.cwd(), INPUT_JSON_FILE);

    // 1. Validate file existence
    if (!fs.existsSync(inputFilePath)) {
        console.error(`Erro Fatal: Arquivo de entrada não encontrado: ${inputFilePath}`);
        process.exit(1);
    }

    let allCells;

    // 2. Read and parse the JSON file
    try {
        console.log(`Lendo arquivo ${inputFilePath}...`);
        const fileContent = fs.readFileSync(inputFilePath, 'utf8');
        allCells = JSON.parse(fileContent);
        if (!Array.isArray(allCells)) {
            console.error(`Erro Fatal: O conteúdo de ${inputFilePath} não é um array JSON válido.`);
            process.exit(1);
        }
        console.log(`Arquivo lido com sucesso. ${allCells.length} células encontradas para postar.`);
    } catch (error) {
        console.error(`Erro Fatal ao ler ou parsear ${inputFilePath}:`, error.message);
        process.exit(1);
    }

    // 3. Iterate and POST each cell
    let successCount = 0;
    let errorCount = 0;
    const totalCells = allCells.length;

    console.log('Iniciando requisições POST...');

    for (let i = 0; i < totalCells; i++) {
        const cell = allCells[i];
        const cellIdentifier = cell.categories || cell._id || `índice ${i}`; // For logging

        // Optional: Add basic validation if needed before posting
        if (!cell || typeof cell !== 'object' || !cell.img) {
             console.warn(`[${i + 1}/${totalCells}] Aviso: Item inválido ou sem 'img', pulando: ${JSON.stringify(cell)}`);
             errorCount++; // Count as an error/skipped item
             continue;
        }


        try {
            // Log progress periodically
            if ((i + 1) % 100 === 0 || (i + 1) === totalCells ) {
                 console.log(`[${i + 1}/${totalCells}] Postando célula com categories: ${cellIdentifier} ...`);
            }

            // Make the POST request
            // We send the 'cell' object directly as the request body
            const response = await axios.post(API_ENDPOINT, cell);

            // Check for successful status codes (e.g., 200 OK, 201 Created)
            if (response.status >= 200 && response.status < 300) {
                successCount++;
            } else {
                // This case might not be hit often if axios throws on non-2xx codes by default
                console.error(`[${i + 1}/${totalCells}] Erro ao postar célula ${cellIdentifier}: Status ${response.status}`);
                errorCount++;
            }

        } catch (error) {
            errorCount++;
            console.error(`\n--- Erro ao postar célula ${cellIdentifier} [${i + 1}/${totalCells}] ---`);
            if (error.response) {
                // Server responded with a status code outside the 2xx range
                console.error(`   Status: ${error.response.status}`);
                console.error(`   Data: ${JSON.stringify(error.response.data)}`); // Log the response body from the server
            } else if (error.request) {
                // Request was made but no response received (e.g., network error, server down)
                console.error(`   Erro de rede/conexão: ${error.message}`);
                 console.error(`   Verifique se o servidor em ${API_ENDPOINT} está rodando.`);
            } else {
                // Setup error or other issue
                console.error(`   Erro inesperado: ${error.message}`);
            }
            console.error(`   Dados da célula: ${JSON.stringify(cell)}`); // Log the cell data that failed
            console.error("----------------------------------------\n");
        }

        // 4. Apply delay between requests (if configured)
        if (REQUEST_DELAY_MS > 0 && i < totalCells - 1) { // Don't delay after the last item
            await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY_MS));
        }
    } // End of loop

    // 5. Final Summary
    console.log('\n--- Postagem Concluída ---');
    console.log(` - Total de células no arquivo: ${totalCells}`);
    console.log(` - Requisições POST bem-sucedidas: ${successCount}`);
    console.log(` - Requisições POST com erro (ou itens pulados): ${errorCount}`);
    console.log('--- Script finalizado ---');
}

// --- Run the main function ---
postCellsToApi().catch(error => {
    // Catch any unexpected errors not caught within the main loop/try-catch blocks
    console.error("\n--- Erro Fatal Inesperado na Execução Principal ---");
    console.error(error);
    process.exit(1);
});