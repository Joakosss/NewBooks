from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from .service import get_book
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from . import serializer, models
from django.contrib.auth.models import User
from django.db.models import Count

from rest_framework.views import APIView


class BookView(viewsets.ModelViewSet):
    queryset = models.Book.objects.all()
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

            book, created = models.Book.objects.get_or_create(
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


# CRUD MyReadings
@api_view(["GET", "POST", "PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def myReadings(request):
    if request.method == "GET":  # Espera token access
        books = models.MyReading.objects.filter(user=request.user).select_related(
            "book"
        )
        # SERIALIZAMOS(JSON) EL QUERY SET BOOK
        serializerr = serializer.MyReadingSerializer(books, many=True)
        return Response(serializerr.data, status=status.HTTP_200_OK)
    elif request.method == "POST":  # Espera token access, {book, myReading}
        if "book" not in request.data or "myReading" not in request.data:
            return Response(
                {"error": "Datos incompletos"}, status=status.HTTP_400_BAD_REQUEST
            )

        # extraemos la informacion desde el metodo post
        book_data = request.data["book"]
        # validamos haber recibido correctamente los datos
        # creamos o revisamos si existe en nuestra base de datos el libro
        book, created = models.Book.objects.get_or_create(
            id=book_data["id"],
            defaults={
                "title": book_data["title"],
                "description": book_data["description"],
                "author": book_data["author"],
                "category": book_data["category"],
                "imgLink": book_data["imgLink"],
                "pages": book_data["pages"],
            },
        )
        try:
            myReading = models.MyReading.objects.create(
                book=book,
                user=request.user,
                state=request.data["myReading"]["state"],
                currentPage=request.data["myReading"]["currentPage"],
                calification=request.data["myReading"]["calification"],
                comments=request.data["myReading"]["comments"],
                startReading=request.data["myReading"]["startReading"],
                finishReading=request.data["myReading"]["finishReading"],
                bookType=request.data["myReading"]["bookType"],
            )
            return Response(
                {"message": "Mi libro fue añadido correctamente"},
                status=status.HTTP_201_CREATED,
            )
        except IntegrityError:
            return Response(
                {"message": "Libro ya en mis libros"}, status=status.HTTP_409_CONFLICT
            )
        except:
            return Response(
                {"message": "Error inesperado"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        # devolver una respuesta adecuada
    elif (
        request.method == "PATCH"
    ):  # Espera token acces y {myReadingId, myReading:{myReadingData}}
        try:
            my_reading = models.MyReading.objects.get(
                id=request.data["myReadingId"], user=request.user
            )
        except:
            return Response(
                {"error": "Error inesperado"}, status=status.HTTP_400_BAD_REQUEST
            )

        serializerr = serializer.MyReadingSerializer(
            my_reading,
            data=request.data[
                "myReading"
            ],  # tomo todos los datos entregados por el request
            partial=True,  # le digo que puede ser solo una parte del serializer
        )
        if serializerr.is_valid():
            serializerr.save()
            print(serializerr)
        else:
            return Response(
                {"error": "Error inesperado"}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response({"message": my_reading.id}, status=status.HTTP_200_OK)
    elif request.method == "DELETE":  # Espera el token acces y {myReadingId}

        if "myReadingId" not in request.data:
            return Response(
                {"error": "Datos incompletos"}, status=status.HTTP_400_BAD_REQUEST
            )
        try:
            my_reading = models.MyReading.objects.get(
                id=request.data["myReadingId"], user=request.user
            )
            my_reading.delete()
            return Response({"message": "Delete Correcto"}, status=status.HTTP_200_OK)
        except AttributeError:
            return Response(
                {"message": "No corresponde a una lectura propia"},
                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
            )
        except Exception as e:
            return Response(
                {"message": "Error inesperado"},
                status=status.HTTP_400_BAD_REQUEST,
            )


@api_view(["POST"])
def login(request):

    user = get_object_or_404(User, email=request.data["email"])
    if not user.check_password(request.data["password"]):
        return Response(
            {"error": "usuario o contraseña invalida"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    token, created = Token.objects.get_or_create(user=user)
    serialize = serializer.UserSerializer(instance=user)

    return Response({"token": token.key, "user": serialize.data["email"]})


@api_view(["POST"])
def registro(request):
    try:
        User.objects.create_user(
            username=request.data["username"],
            password=request.data["password"],
            # email=request.data["email"],
        )
    except KeyError:
        return Response(
            {"error": "Datos incompletos"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except IntegrityError:
        return Response(
            {"error": "Nombre de usuario ya existente"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"message": "Creado con éxito"}, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def mostPopularBooks(request):
    maxResults = request.query_params.get(
        "maxResults", 4
    )  # cantidad maxima de elementos del top que quiero retornar
    top_books = models.Book.objects.annotate(reading_count=Count("lecturas")).order_by(
        "-reading_count"
    )[: int(maxResults)]
    serialize = serializer.BookSerializer(instance=top_books, many=True)
    return Response({"top_books": serialize.data}, status=status.HTTP_200_OK)
