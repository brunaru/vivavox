import fs from 'fs';
import path from 'path';

// --- Configuration ---
const BACKUP_FILE = 'all_cells_backup.json';
const ARASAAC_DATA_FILE = 'arasaac_pictograms_pt.json';
// --- End Configuration ---

// --- Helper Functions ---
/**
 * Extracts the ARASAAC pictogram ID from an image URL.
 * Example: "https://static.arasaac.org/pictograms/2239/2239_300.png" -> "2239"
 * @param {string} imageUrl The URL string.
 * @returns {string | null} The extracted ID as a string, or null if not found.
 */
function extractPictogramId(imageUrl) {
    if (!imageUrl || typeof imageUrl !== 'string') {
        return null;
    }
    // Regex to find digits between "/pictograms/" and the next "/"
    const match = imageUrl.match(/pictograms\/(\d+)\//);
    return match ? match[1] : null; // Return the first capturing group (the digits) or null
}

// --- Main Async Function ---
async function updateCategoriesDirectly() {
    // 1. Get Target Category from Command Line Arguments
    const targetCategory = process.argv[2]; // 0: node, 1: script.js, 2: first arg
    if (!targetCategory) {
        console.error("Erro: Categoria alvo não fornecida.");
        console.error("Uso: node seu_script.js <nome_da_categoria>");
        process.exit(1); // Exit with error code
    }
    const lowerTargetCategory = targetCategory.toLowerCase();
    console.log(`--- Iniciando atualização de categorias em ${BACKUP_FILE} ---`);
    console.log(`--- Categoria alvo: "${targetCategory}" ---`);
    console.log(`--- Usando dados ARASAAC de: ${ARASAAC_DATA_FILE} ---`);

    const backupFilePath = path.resolve(process.cwd(), BACKUP_FILE);
    const arasaacDataPath = path.resolve(process.cwd(), ARASAAC_DATA_FILE);

    // --- Validate file existence ---
    if (!fs.existsSync(backupFilePath)) {
        console.error(`Erro Fatal: Arquivo principal não encontrado: ${backupFilePath}`);
        process.exit(1);
    }
    if (!fs.existsSync(arasaacDataPath)) {
        console.error(`Erro Fatal: Arquivo de dados ARASAAC não encontrado: ${arasaacDataPath}`);
        process.exit(1);
    }
    // -----------------------------

    let allCells;
    let arasaacRawData;

    // 2. Read Backup File
    try {
        console.log(`Lendo ${backupFilePath}...`);
        const backupContent = fs.readFileSync(backupFilePath, 'utf8');
        allCells = JSON.parse(backupContent);
        if (!Array.isArray(allCells)) {
            console.error(`Erro Fatal: Conteúdo de ${backupFilePath} não é um array JSON.`);
            process.exit(1);
        }
        console.log(`Lidas ${allCells.length} células do arquivo principal.`);
    } catch (error) {
        console.error(`Erro Fatal ao ler/parsear ${backupFilePath}:`, error.message);
        if (error instanceof SyntaxError) {
             console.error("Verifique se o arquivo JSON principal contém erros de sintaxe ou caracteres inválidos (problemas de codificação?).");
        }
        process.exit(1);
    }

    // 3. Read ARASAAC Data File
    try {
        console.log(`Lendo ${arasaacDataPath}...`);
        const arasaacContent = fs.readFileSync(arasaacDataPath, 'utf8');
        arasaacRawData = JSON.parse(arasaacContent);
        if (!Array.isArray(arasaacRawData)) {
            console.error(`Erro Fatal: Conteúdo de ${arasaacDataPath} não é um array JSON.`);
            process.exit(1);
        }
        console.log(`Lidos ${arasaacRawData.length} pictogramas do arquivo ARASAAC.`);
    } catch (error) {
        console.error(`Erro Fatal ao ler/parsear ${arasaacDataPath}:`, error.message);
        if (error instanceof SyntaxError) {
             console.error("Verifique se o arquivo JSON ARASAAC contém erros de sintaxe ou caracteres inválidos (problemas de codificação?).");
        }
        process.exit(1);
    }

    // 4. Build ARASAAC Lookup Map for efficient access
    console.log('Construindo índice de pictogramas ARASAAC por ID...');
    const arasaacLookup = new Map();
    let pictosWithoutId = 0;
    for (const picto of arasaacRawData) {
        if (picto && typeof picto._id !== 'undefined' && picto._id !== null) {
            const idStr = String(picto._id);
            // Store lowercase categories and tags for easier matching
            const categories = (Array.isArray(picto.categories) ? picto.categories : []).map(c => String(c).toLowerCase());
            const tags = (Array.isArray(picto.tags) ? picto.tags : []).map(t => String(t).toLowerCase());
            arasaacLookup.set(idStr, { categories, tags });
        } else {
            pictosWithoutId++;
        }
    }
    if (pictosWithoutId > 0) {
        console.warn(`Aviso: ${pictosWithoutId} pictogramas no arquivo ARASAAC não possuem '_id' válido e foram ignorados.`);
    }
    console.log(`Índice construído com ${arasaacLookup.size} pictogramas ARASAAC.`);

    // 5. Process allCells: Check ARASAAC data and update categories
    console.log(`Processando ${allCells.length} células do arquivo principal...`);
    let updatedCount = 0;
    let categoryConfirmedCount = 0;
    let cellsWithoutPictogramId = 0;
    let cellsPictogramNotFound = 0;
    let processedCount = 0;

    for (const cell of allCells) {
        processedCount++;
        if (processedCount % 500 === 0) { // Log progress periodically
            console.log(`   ... processado ${processedCount}/${allCells.length}`);
        }

        if (!cell) continue; // Skip null/undefined entries if any

        // Ensure 'categories' field exists and is an array
        if (!Array.isArray(cell.categories)) {
            cell.categories = [];
        }

        // Extract ARASAAC ID from cell's image URL
        const pictogramId = extractPictogramId(cell.img);

        if (!pictogramId) {
            cellsWithoutPictogramId++;
            continue; // Cannot check ARASAAC data without an ID
        }

        // Lookup the pictogram in our ARASAAC map
        const arasaacInfo = arasaacLookup.get(pictogramId);

        if (!arasaacInfo) {
            cellsPictogramNotFound++;
            // Optional: Log which ID wasn't found
            // console.warn(`   - ID de pictograma ARASAAC ${pictogramId} (da célula ${cell._id || cell.text}) não encontrado nos dados ARASAAC.`);
            continue; // Pictogram data not found in our local ARASAAC file
        }

        // Check if the ARASAAC pictogram matches the target category (in categories or tags)
        const isMatch = arasaacInfo.categories.includes(lowerTargetCategory) ||
                        arasaacInfo.tags.includes(lowerTargetCategory);

        if (isMatch) {
            // Check if the target category (original casing) is already present
            const lowerExistingCategories = cell.categories.map(c => String(c).toLowerCase());
            if (!lowerExistingCategories.includes(lowerTargetCategory)) {
                cell.categories.push(targetCategory); // Add the category
                updatedCount++;
            } else {
                 categoryConfirmedCount++;
            }
        }
        // **NO 'else' block**: We don't modify categories if it's not a match
    }

    console.log('\n--- Processamento Concluído ---');
    console.log(` - Categoria "${targetCategory}" adicionada a ${updatedCount} células.`);
    console.log(` - Categoria "${targetCategory}" já estava presente em ${categoryConfirmedCount} células.`);
    console.log(`   (Total de células correspondentes à categoria: ${updatedCount + categoryConfirmedCount})`);
    console.log(` - Células ignoradas por não ter ID de pictograma na URL: ${cellsWithoutPictogramId}`);
    console.log(` - Células ignoradas por ID de pictograma não encontrado no arquivo ARASAAC: ${cellsPictogramNotFound}`);
    console.log(` - Total de células no arquivo principal: ${allCells.length}`);

    // 6. Write the modified data back to the original backup file
    try {
        console.log(`\nSalvando dados atualizados de volta em ${backupFilePath}...`);
        const outputJsonData = JSON.stringify(allCells, null, 2); // Pretty print JSON
        fs.writeFileSync(backupFilePath, outputJsonData, 'utf8'); // Explicitly use UTF-8
        console.log('Arquivo salvo com sucesso!');
    } catch (error) {
        console.error(`Erro Fatal ao salvar o arquivo ${backupFilePath}:`, error.message);
        console.error('Os dados processados podem não ter sido salvos!');
        process.exit(1);
    }

    console.log('--- Script finalizado ---');
}

// --- Run the main function ---
updateCategoriesDirectly().catch(error => {
    console.error("\n--- Erro Inesperado na Execução Principal ---");
    console.error(error);
    process.exit(1);
});