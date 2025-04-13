import fs from 'fs';
import path from 'path';

// --- Configuration ---
const BACKUP_FILE = 'all_cells_backup.json';      // File with all cells (to be modified)
const ANIMAL_LIST_FILE = 'pictogramas_animal.json'; // File containing only animal cells
const TARGET_CATEGORY = 'animal';                 // The category name to add
// ---------------------

const lowerTargetCategory = TARGET_CATEGORY.toLowerCase();

async function updateCategoriesFromList() {
    console.log(`--- Iniciando atualização de categorias em ${BACKUP_FILE} ---`);
    console.log(`--- Usando lista de animais de ${ANIMAL_LIST_FILE} ---`);
    console.log(`--- Categoria a ser adicionada/verificada: "${TARGET_CATEGORY}" ---`);

    const backupFilePath = path.join(process.cwd(), BACKUP_FILE);
    const animalListFilePath = path.join(process.cwd(), ANIMAL_LIST_FILE);

    // --- Validate file existence ---
    if (!fs.existsSync(backupFilePath)) {
        console.error(`Erro Fatal: Arquivo principal não encontrado: ${backupFilePath}`);
        process.exit(1);
    }
    if (!fs.existsSync(animalListFilePath)) {
        console.error(`Erro Fatal: Arquivo da lista de animais não encontrado: ${animalListFilePath}`);
        process.exit(1);
    }
    // -----------------------------

    let allCells;
    let animalCells;

    // 1. Read the main backup file
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
        process.exit(1);
    }

    // 2. Read the animal list file
    try {
        console.log(`Lendo ${animalListFilePath}...`);
        const animalListContent = fs.readFileSync(animalListFilePath, 'utf8');
        animalCells = JSON.parse(animalListContent);
        if (!Array.isArray(animalCells)) {
            console.error(`Erro Fatal: Conteúdo de ${animalListFilePath} não é um array JSON.`);
            process.exit(1);
        }
        console.log(`Lidas ${animalCells.length} células do arquivo de animais.`);
    } catch (error) {
        console.error(`Erro Fatal ao ler/parsear ${animalListFilePath}:`, error.message);
        process.exit(1);
    }

    // 3. Create a Set of animal IDs for efficient lookup
    console.log('Criando índice de IDs de animais...');
    const animalIdSet = new Set();
    let animalIdsWithoutUnderscoreId = 0;
    for (const animalCell of animalCells) {
        if (animalCell && typeof animalCell._id !== 'undefined') { // Check if _id exists
             animalIdSet.add(String(animalCell._id)); // Store IDs as strings for consistent comparison
        } else {
            animalIdsWithoutUnderscoreId++;
        }
    }
     if(animalIdsWithoutUnderscoreId > 0) {
        console.warn(`Aviso: ${animalIdsWithoutUnderscoreId} células no arquivo ${ANIMAL_LIST_FILE} não possuem a propriedade '_id'. Elas serão ignoradas.`);
    }
    console.log(`Índice criado com ${animalIdSet.size} IDs únicos de animais.`);


    // 4. Iterate through all cells and update categories
    console.log('Processando células do arquivo principal...');
    let updatedCount = 0;
    let clearedCount = 0;
    let cellsWithoutId = 0;

    for (const cell of allCells) {
        if (!cell || typeof cell._id === 'undefined') {
            cellsWithoutId++;
             // Ensure categories is empty for cells without an ID we can check
             cell.categories = [];
            continue; // Skip cells without an _id
        }

        const cellIdString = String(cell._id);

        // Ensure 'categories' field exists and is an array
        if (!Array.isArray(cell.categories)) {
            cell.categories = [];
        }

        if (animalIdSet.has(cellIdString)) {
            // This cell IS an animal
            // Check if the category is already present (case-insensitive)
            const alreadyHasCategory = cell.categories.some(cat => String(cat).toLowerCase() === lowerTargetCategory);
            if (!alreadyHasCategory) {
                cell.categories.push(TARGET_CATEGORY); // Add the category
                updatedCount++;
            }
             // Optional: If you want *only* the 'animal' category for these:
             // cell.categories = [TARGET_CATEGORY];
             // updatedCount++;
        } else {
            // This cell IS NOT an animal according to the list
            if (cell.categories.length > 0) { // Only count if we actually cleared something
                 clearedCount++;
            }
            cell.categories = []; // Set categories to empty array
        }
    }

    if (cellsWithoutId > 0) {
         console.warn(`Aviso: ${cellsWithoutId} células no arquivo ${BACKUP_FILE} não possuem a propriedade '_id'. Suas categorias foram definidas como [].`);
    }

    console.log('\n--- Processamento Concluído ---');
    console.log(` - Categoria "${TARGET_CATEGORY}" adicionada/confirmada em ${updatedCount} células.`);
    console.log(` - Campo 'categories' definido como [] em ${clearedCount} células (que não estavam na lista de animais e tinham categorias anteriores).`);
    console.log(` - Total de células no arquivo principal: ${allCells.length}`);


    // 5. Write the modified data back to the backup file
    try {
        console.log(`\nSalvando dados atualizados em ${backupFilePath}...`);
        const outputJsonData = JSON.stringify(allCells, null, 2); // Pretty print
        fs.writeFileSync(backupFilePath, outputJsonData, 'utf8');
        console.log('Arquivo salvo com sucesso!');
    } catch (error) {
        console.error(`Erro Fatal ao salvar o arquivo ${backupFilePath}:`, error.message);
        console.error('Os dados processados podem não ter sido salvos!');
        process.exit(1);
    }

    console.log('--- Script finalizado ---');
}

// --- Run the main function ---
updateCategoriesFromList().catch(error => {
    console.error("\n--- Erro Inesperado na Execução Principal ---");
    console.error(error);
    process.exit(1);
});