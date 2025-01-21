import requests
import urllib.parse


# Funcion para generar la busqueda en la api
def generate_request(url, params={}):
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        if response.status_code == 200:
            return response.json()
    except requests.exceptions.RequestException as e:
        print(f"error al conectar con googleBook: {e} ")
        return None


# Funcion se encarga de tomar la id del libro que buscamos y ver si esta en mi BD si no la guarda
def serachInMyBD(idBook):
    return None


# Funcion madre que llama las otras funciones y devolver el libro
def get_book(query, params={}):
    url = f"https://www.googleapis.com/books/v1/volumes?q={query}"
    print(url)
    response = generate_request(url, params)
    if response:
        books = response.get("items")[0]
        return books
    return "error c:"
