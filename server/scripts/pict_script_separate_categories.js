import axios from "axios";
import fs from 'fs'; // Import the Node.js file system module
import path from 'path'; // Optional: for creating robust file paths

// Keep the function to fetch data from ARASAAC
async function buscarDadosArasaac(pictogramId) {
  // Add specific language code if needed, assuming 'pt' for Portuguese as before
  const lang = 'pt'; 
  try {
    // Use template literal correctly for the URL
    const response = await axios.get(`https://api.arasaac.org/v1/pictograms/${lang}/${pictogramId}`); 
    return response.data;
  } catch (error) {
    // Log more specific error if possible (e.g., status code)
    if (error.response) {
      console.error(`Erro ao buscar dados do pictograma ${pictogramId} (Status: ${error.response.status}):`, error.message);
    } else {
      console.error(`Erro de rede ou configuração ao buscar dados do pictograma ${pictogramId}:`, error.message);
    }
    return null; // Return null on error
  }
}

// Main function to find pictograms by category and save them
async function findAndSaveByCategory(targetCategory) {
  if (!targetCategory) {
    console.error("Erro: Nenhuma categoria foi fornecida. Use: node seu_script.js <categoria>");
    process.exit(1); // Exit if no category is provided
  }

  console.log(`Iniciando busca por pictogramas da categoria: "${targetCategory}"`);
  const lowerTargetCategory = targetCategory.toLowerCase(); // For case-insensitive comparison

  try {
    // 1. Fetch all cell data from your local server
    console.log('Buscando dados das células locais...');
    const response = await axios.get('http://localhost:5000/cell/get');
    const localCells = response.data;
    const totalCells = localCells.length;
    console.log(`Encontradas ${localCells.length} células locais para processar.`);

    const matchingCellsData = [];
    let processedCount = 0;
    let arasaacFetchErrors = 0;
    let matchCount = 0;

    // 2. Process each local cell
    for (const cell of localCells) {
      processedCount++;
      // Extract the pictogram ID from the image URL
      const pictogramIdMatch = cell.img ? cell.img.match(/pictograms\/(\d+)\//) : null;
      const pictogramId = pictogramIdMatch ? pictogramIdMatch[1] : null;

      const progressMessage = `[${processedCount}/${totalCells}] Processando célula (ID local: ${cell._id || 'N/A'})`;
      if (pictogramId) {
          console.log(`${progressMessage} - Buscando ARASAAC ID: ${pictogramId}...`);
      } else {
          console.log(`${progressMessage} - Sem ID de pictograma ARASAAC.`);
          continue; // Skip if no ID, as before
      }

      // 3. Fetch ARASAAC data for the pictogram ID
      const dadosArasaac = await buscarDadosArasaac(pictogramId);

      if (!dadosArasaac) {
        arasaacFetchErrors++;
        continue; // Skip if ARASAAC data couldn't be fetched
      }

      // 4. Check if the pictogram belongs to the target category (checking categories and tags)
      const arasaacCategories = (dadosArasaac.categories || []).map(c => c.toLowerCase());
      const arasaacTags = (dadosArasaac.tags || []).map(t => t.toLowerCase());

      if (arasaacCategories.includes(lowerTargetCategory) || arasaacTags.includes(lowerTargetCategory)) {
        matchCount++;
        // 5. If it matches, prepare the cell data for saving
        const modifiedCell = { ...cell }; // Create a copy to avoid modifying the original array in memory

        // Ensure 'categories' field exists and is an array
        modifiedCell.categories = Array.isArray(modifiedCell.categories) ? [...modifiedCell.categories] : [];

        // Add the target category if it's not already present (case-insensitive check, add original casing)
        const lowerExistingCategories = modifiedCell.categories.map(c => String(c).toLowerCase());
        if (!lowerExistingCategories.includes(lowerTargetCategory)) {
          modifiedCell.categories.push(targetCategory); // Add the category with original casing
        }

        matchingCellsData.push(modifiedCell); // Add the modified cell data to our results
      }

      // Optional: Add a small delay to avoid overwhelming the ARASAAC API
      if (processedCount % 50 === 0) { // Delay every 50 requests
        console.log(`Processado ${processedCount}/${localCells.length}...`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // 500ms delay
      }
    } // End of loop through localCells

    console.log('Processamento concluído.');
    console.log(` - Células locais processadas: ${processedCount}`);
    console.log(` - Erros ao buscar dados ARASAAC: ${arasaacFetchErrors}`);
    console.log(` - Pictogramas encontrados na categoria "${targetCategory}": ${matchCount}`);

    // 6. Save the results to a JSON file
    if (matchingCellsData.length > 0) {
      // Sanitize category name for filename
      const safeCategoryName = targetCategory.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const outputFilename = `pictogramas_${safeCategoryName}.json`;
      
      // Use path.join for better cross-platform compatibility
      const outputPath = path.join(process.cwd(), outputFilename); 

      console.log(`Salvando ${matchingCellsData.length} células encontradas em ${outputPath}...`);
      try {
        // Use JSON.stringify with indentation for readability
        fs.writeFileSync(outputPath, JSON.stringify(matchingCellsData, null, 2)); 
        console.log('Arquivo salvo com sucesso!');
      } catch (writeError) {
        console.error(`Erro ao salvar o arquivo JSON (${outputPath}):`, writeError.message);
      }
    } else {
      console.log(`Nenhum pictograma encontrado para a categoria "${targetCategory}". Nenhum arquivo foi salvo.`);
    }

    return {
      totalProcessed: processedCount,
      arasaacErrors: arasaacFetchErrors,
      matchesFound: matchCount,
      outputFile: matchingCellsData.length > 0 ? path.join(process.cwd(), `pictogramas_${targetCategory.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`) : null
    };

  } catch (error) {
    if (error.response) { // Handle Axios errors specifically
        console.error(`Erro ao buscar células locais (Status: ${error.response.status}):`, error.message);
    } else {
        console.error('Erro durante o processamento:', error.message);
    }
    // Rethrow or handle as needed, maybe exit
    process.exit(1); 
  }
}

// Execution wrapper
async function main() {
  // Get the category from command-line arguments
  // process.argv[0] is node executable
  // process.argv[1] is the script file path
  // process.argv[2] is the first actual argument
  const targetCategory = process.argv[2];

  try {
    await findAndSaveByCategory(targetCategory);
  } catch (error) {
    // Catch errors from findAndSaveByCategory if they weren't handled internally
    console.error('Erro fatal na execução principal:', error);
    process.exit(1);
  }
}

// Run the main function
main();