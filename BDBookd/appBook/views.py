from django.http import JsonResponse
from .service import get_book
from rest_framework import viewsets, status
from rest_framework.response import Response
from . import serializer, models


class BookView(viewsets.ModelViewSet):
    queryset = models.Books.objects.all()
    serializer_class = serializer.BookSerializer

    # cuando se hace una consulta get se ejecuta esta funcion
    def list(self, request, *args, **kwargs):

        searchBook = request.query_params.get(
            "searchBook", None
        )  # se saca de la solicitud http el dato search book si no tiene es none
        if searchBook:
            # Realiza la solicitud a la API de Google Books
            book_data = get_book(searchBook)

            if book_data == "error c:":
                return Response(
                    {"error": "Error al conectar con Google Books"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            book, created = models.Books.objects.get_or_create(
                id=book_data["id"],
                defaults={
                    "title": book_data["volumeInfo"]["title"],
                    "author": ", ".join(book_data["volumeInfo"].get("authors", [])),
                    "description": book_data["volumeInfo"].get("description", ""),
                    "pages": book_data["volumeInfo"].get("pageCount", 0),
                    "category": ", ".join(
                        book_data["volumeInfo"].get("categories", [])
                    ),
                    "imgLink": book_data["volumeInfo"]
                    .get("imageLinks", {})
                    .get("thumbnail", ""),
                },
            )
        # Si no hay searchBook o después de manejar la API, devolver la lista de libros
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# ?searchBook=Harry+Potter+y+la+piedra+filosofal
