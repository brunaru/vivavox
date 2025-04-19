// Importa o módulo 'fs/promises' para operações de arquivo assíncronas
import { writeFile } from 'fs/promises';

// --- Configuração ---
// Substitua 'pt' pelo código de idioma desejado (ex: 'es', 'en', 'fr', etc.)
const languageCode = 'pt';
// Nome do arquivo onde os dados serão salvos
const outputFilename = `arasaac_pictograms_${languageCode}.json`;
// URL base da API do ARASAAC (verifique a documentação oficial se esta mudar)
const baseUrl = 'https://api.arasaac.org/v1';
// --- Fim da Configuração ---

// Constrói a URL completa da API
const apiUrl = `${baseUrl}/pictograms/all/${languageCode}`;

// Função assíncrona principal para buscar e salvar os dados
async function fetchAndSavePictograms() {
  console.log(`Iniciando busca de pictogramas em '${languageCode}' de ${apiUrl}...`);

  try {
    // 1. Faz a requisição GET usando fetch
    const response = await fetch(apiUrl);

    // Verifica se a requisição foi bem-sucedida 
    if (!response.ok) {
      // Se não foi, lança um erro com o status
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    console.log('Requisição bem-sucedida. Processando resposta JSON...');

    // 2. Extrai o corpo da resposta como JSON
    const pictogramsData = await response.json();

    console.log(`Recebidos ${Array.isArray(pictogramsData) ? pictogramsData.length : 'dados'} pictogramas.`);

    // 3. Converte o objeto JavaScript de volta para uma string JSON formatada
    // (null, 2) adiciona indentação para tornar o arquivo JSON mais legível
    const jsonString = JSON.stringify(pictogramsData, null, 2);

    // 4. Salva a string JSON no arquivo especificado
    await writeFile(outputFilename, jsonString, 'utf-8');

    console.log(`\nSucesso! Os pictogramas foram salvos no arquivo: ${outputFilename}`);

  } catch (error) {
    // Captura e exibe qualquer erro que ocorra durante o processo
    console.error('\nOcorreu um erro durante o processo:');
    console.error(error);
  }
}

// Chama a função principal para iniciar o processo
fetchAndSavePictograms();