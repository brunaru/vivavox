import axios from "axios";

const CORES = {
  substantivos: '#4169E1', // Azul
  verbos: '#2E8B57',      // Verde
  adjetivos: '#FF8C00',   // Laranja
  sociais: '#FF69B4',     // Rosa
  numeros: '#808080',     // Cinza
  basicas: '#FFD700'      // Amarelo
};


async function buscarDadosArasaac(pictogramId) {
  try {
    const response = await axios.get(`https://api.arasaac.org/v1/pictograms/pt/${pictogramId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar dados do pictograma ${pictogramId}:`, error.message);
    return null;
  }
}


function determinarCor(categorias, tags) {
  // Converte arrays para lowercase para comparação
  const cats = categorias.map(c => c.toLowerCase());
  const tgs = tags.map(t => t.toLowerCase());

  // Verifica categorias e tags em ordem de prioridade
  if (cats.includes('verb') || tgs.includes('verb')) {
    return CORES.verbos;
  }

  if (cats.includes('pronoun') || cats.includes('personal pronoun') || 
      cats.includes('possessive pronoun') || cats.includes('demonstrative pronoun') || 
      tgs.includes('pronoun') || tgs.includes('personal pronoun') || 
      tgs.includes('possessive pronoun') || cats.includes('adverb') || tgs.includes('adverb')) {
    return CORES.basicas;
  }
  
  if (cats.includes('adjective') || tgs.includes('adjective') || tgs.includes('descriptor')) {
    return CORES.adjetivos;
  }
  
  if (tgs.includes('social') || tgs.includes('communication')) {
    return CORES.sociais;
  }
  
  if (tgs.includes('number') || tgs.includes('time')) {
    return CORES.numeros;
  }
  
  return CORES.substantivos; // Cor padrão para substantivos
}


async function atualizarCores() {
  try {
    const response = await axios.get('http://localhost:5000/cell/get');
    const cells = response.data;
    console.log(`Encontradas ${cells.length} células para processar`);
    
    let atualizadas = 0;
    let falhas = 0;

    // Processa em lotes de 50 para não sobrecarregar a API do ARASAAC
    for (let i = 0; i < cells.length; i += 50) {
      const lote = cells.slice(i, i + 50);
      const atualizacoes = [];

      for (const cell of lote) {
        // Extrai o ID do pictograma da URL da imagem
        const pictogramId = cell.img.match(/pictograms\/(\d+)\//)?.[1];
        
        if (pictogramId) {
          const dadosArasaac = await buscarDadosArasaac(pictogramId);
          
          if (dadosArasaac) {
            const cor = determinarCor(
              dadosArasaac.categories || [], 
              dadosArasaac.tags || []
            );

            atualizacoes.push({
              updateOne: {
                filter: { _id: cell._id },
                update: { $set: { color: cor } }
              }
            });
            atualizadas++;
          } else {
            falhas++;
          }
        }
      }

      // Executa as atualizações do lote
      if (atualizacoes.length > 0) {
        await axios.patch("http://localhost:5000/cell/patchMany", atualizacoes);
        console.log(`Processadas ${i + atualizacoes.length} de ${cells.length} células`);
      }

      // Pequeno delay para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return {
      totalProcessadas: cells.length,
      atualizadas,
      falhas
    };

  } catch (error) {
    console.error('Erro no processamento:', error);
    throw error;
  }
}


// Gerar relatório de distribuição de cores
async function gerarRelatorio() {
  try {
    const response = await axios.get("http://localhost:5000/cell/getCellColorReport")
    const distribuicao = response.data;

    console.log('Distribuição de cores:');
    console.log(distribuicao);
    
    return distribuicao;
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    throw error;
  }
}


// Execução principal
async function main() {
  try {
    console.log('Iniciando atualização de cores...');
    const resultado = await atualizarCores();
    console.log('Resultado:', resultado);
    
    console.log('Gerando relatório de distribuição...');
    await gerarRelatorio();
    
  } catch (error) {
    console.error('Erro na execução principal:', error);
  }
}


main();