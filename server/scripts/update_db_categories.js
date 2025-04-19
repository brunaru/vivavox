import fs from 'fs';
import path from 'path';
import axios from 'axios'; // Certifique-se de ter axios instalado: npm install axios

// --- Configuration ---
const BACKUP_FILE = 'all_cells_backup.json'; // Arquivo com o estado desejado das células
const API_ENDPOINT = 'http://localhost:5000/cell/patchMany'; // Seu endpoint backend
const BATCH_SIZE = 100; // Quantas atualizações enviar por requisição (ajuste conforme necessário)
const DELAY_BETWEEN_BATCHES = 500; // Milissegundos de pausa entre lotes (para não sobrecarregar o servidor)
// ---------------------

async function updateDatabaseCategories() {
    console.log(`--- Iniciando atualização de categorias no banco de dados ---`);
    console.log(`--- Lendo dados de: ${BACKUP_FILE} ---`);
    console.log(`--- Enviando para: ${API_ENDPOINT} ---`);
    console.log(`--- Tamanho do lote: ${BATCH_SIZE} ---`);

    const backupFilePath = path.resolve(process.cwd(), BACKUP_FILE);

    // --- Validate file existence ---
    if (!fs.existsSync(backupFilePath)) {
        console.error(`Erro Fatal: Arquivo de backup não encontrado: ${backupFilePath}`);
        process.exit(1);
    }
    // -----------------------------

    let allCells;

    // 1. Read the source backup file
    try {
        console.log(`Lendo ${backupFilePath}...`);
        const backupContent = fs.readFileSync(backupFilePath, 'utf8');
        allCells = JSON.parse(backupContent);
        if (!Array.isArray(allCells)) {
            console.error(`Erro Fatal: Conteúdo de ${backupFilePath} não é um array JSON.`);
            process.exit(1);
        }
        console.log(`Lidas ${allCells.length} células do arquivo.`);
    } catch (error) {
        console.error(`Erro Fatal ao ler/parsear ${backupFilePath}:`, error.message);
         if (error instanceof SyntaxError) {
             console.error("Verifique se o arquivo JSON contém erros de sintaxe ou caracteres inválidos.");
        }
        process.exit(1);
    }

    // 2. Prepare bulk update operations
    console.log('Preparando operações de atualização para o banco de dados...');
    const bulkOperations = [];
    let cellsWithoutId = 0;

    for (const cell of allCells) {
        if (cell && typeof cell._id !== 'undefined' && cell._id !== null) {
            // Ensure categories is an array, default to empty if not found (should not happen after previous script)
            const categoriesToSet = Array.isArray(cell.categories) ? cell.categories : [];

            bulkOperations.push({
                updateOne: {
                    filter: { _id: cell._id }, // Use the _id from the file to find the document
                    update: { $set: { categories: categoriesToSet } } // Set the categories array
                    // Use $set to replace the entire array with the one from the file
                }
            });
        } else {
            cellsWithoutId++;
        }
    }

    if (cellsWithoutId > 0) {
        console.warn(`Aviso: ${cellsWithoutId} células no arquivo ${BACKUP_FILE} não possuem '_id' válido e foram ignoradas.`);
    }

    const totalOperations = bulkOperations.length;
    if (totalOperations === 0) {
        console.log("Nenhuma operação de atualização válida para enviar. Script finalizado.");
        return;
    }
    console.log(`Preparadas ${totalOperations} operações de atualização.`);

    // 3. Send operations in batches
    console.log(`Enviando ${totalOperations} operações em lotes de ${BATCH_SIZE}...`);
    let successfulBatches = 0;
    let failedBatches = 0;
    let totalSent = 0;

    for (let i = 0; i < totalOperations; i += BATCH_SIZE) {
        const batch = bulkOperations.slice(i, i + BATCH_SIZE);
        const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(totalOperations / BATCH_SIZE);

        console.log(`\nEnviando lote ${batchNumber}/${totalBatches} (${batch.length} operações)...`);

        try {
            // Make the PATCH request to your backend endpoint
            const response = await axios.patch(API_ENDPOINT, batch, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Check response status from your backend
            if (response.status === 200) {
                console.log(`   Lote ${batchNumber} enviado com sucesso! (Status: ${response.status})`);
                successfulBatches++;
                totalSent += batch.length;
            } else {
                // This case might not happen if axios throws for non-2xx, but good practice
                console.error(`   Erro no lote ${batchNumber}: Servidor respondeu com status ${response.status}`);
                console.error(`   Resposta do servidor:`, response.data);
                failedBatches++;
            }

        } catch (error) {
            failedBatches++;
            console.error(`   Erro CRÍTICO ao enviar lote ${batchNumber}:`, error.message);
            if (error.response) {
                // If the server responded with an error status (4xx, 5xx)
                console.error(`   Status do erro: ${error.response.status}`);
                console.error(`   Resposta do servidor:`, error.response.data);
            } else if (error.request) {
                // If the request was made but no response received (network issue)
                console.error(`   Nenhuma resposta recebida do servidor.`);
            } else {
                // Setup error before request was sent
                console.error(`   Erro na configuração da requisição:`, error.message);
            }
            // Decide if you want to stop on the first error or continue with other batches
            // console.log("Interrompendo script devido a erro no lote.");
            // process.exit(1); // Uncomment to stop on first error
        }

        // Add a delay between batches to avoid overwhelming the server
        if (i + BATCH_SIZE < totalOperations) {
             if (DELAY_BETWEEN_BATCHES > 0) {
                console.log(`   Aguardando ${DELAY_BETWEEN_BATCHES}ms antes do próximo lote...`);
                await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
             }
        }
    } // End of batch loop

    // 4. Final Summary
    console.log('\n--- Envio de Atualizações Concluído ---');
    console.log(` - Total de operações preparadas: ${totalOperations}`);
    console.log(` - Total de operações enviadas (em lotes bem-sucedidos): ${totalSent}`);
    console.log(` - Lotes enviados com sucesso: ${successfulBatches}`);
    console.log(` - Lotes com falha: ${failedBatches}`);

    if (failedBatches > 0) {
        console.error("\nAtenção: Alguns lotes falharam. Verifique os logs acima. O banco de dados pode estar parcialmente atualizado.");
    } else if (totalSent === totalOperations) {
        console.log("Todas as atualizações foram enviadas com sucesso para o servidor.");
    } else {
         console.warn("Atenção: O número de operações enviadas não corresponde ao total preparado, verifique os logs.");
    }
    console.log('--- Script finalizado ---');
}

// --- Run the main function ---
updateDatabaseCategories().catch(error => {
    // Catch any unexpected errors not handled within the function
    console.error("\n--- Erro Inesperado na Execução Principal ---");
    console.error(error);
    process.exit(1);
});