import requests
import pymongo

def fetch_pictograms(language='pt'):
  url = f'https://api.arasaac.org/v1/pictograms/all/{language}'
  response = requests.get(url)
  pictograms = response.json()

  formated_pictograms = []
  for pictogram in pictograms:
    text = pictogram['keywords'][0]['keyword'] if pictogram['keywords'] else ''

    formated_pictograms.append({
      'text': text,
      'img': f'https://api.arasaac.org/v1/pictograms/{pictogram["_id"]}'
    })

  print("Collected all pictograms")

  return formated_pictograms



def send_pictograms_to_api(pictograms):
  total = len(pictograms)
  print(f"Enviando {total} pictogramas para a API...")

  for i, pictogram in enumerate(pictograms, 1):
    data = {
      "text": pictogram["text"],
      "img": pictogram["img"],
      "color": "#000000"  # Define uma cor padrão (se for obrigatório)
    }

    try:
      response = requests.post("http://localhost:3001/cell/post", json=data)
      
      if response.status_code == 201:
        print(f"[{i}/{total}] Pictograma inserido com sucesso!")
      elif response.status_code == 400:
        print(f"[{i}/{total}] Erro: {response.json().get('message', 'Erro desconhecido')}")
      else:
        print(f"[{i}/{total}] Erro ao inserir pictograma: {response.status_code} - {response.text}")

    except Exception as e:
      print(f"[{i}/{total}] Falha na requisição: {e}")

  print("Processo finalizado!")



pictograms = fetch_pictograms()
send_pictograms_to_api(pictograms)