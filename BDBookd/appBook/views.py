from django.shortcuts import get_object_or_404
from .service import get_book
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from . import serializer, models
from django.contrib.auth.models import User


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


class MyReadingsView(viewsets.ModelViewSet):
    queryset = models.MyReading.objects.all()
    serializer_class = serializer.MyReadingSerializer


# Crear un libro en mi colección
@api_view(["POST"])
def addMyReading(request):
    # extraemos la informacion desde el metodo post
    book_data = request.data["book"]
    # validamos haber recibido correctamente los datos
    if not book_data:
        return Response(
            {"error": "Datos incompletos"}, status=status.HTTP_400_BAD_REQUEST
        )
    user = User.objects.get(email=request.data["user"])
    if not user:
        return Response(
            {"error": "Reintenta hacer login"}, status=status.HTTP_401_UNAUTHORIZED
        )
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

    myReading = models.MyReading.objects.create(
        book=book,
        user=user,
        state=request.data["myReading"]["state"],
        currentPage=request.data["myReading"]["currentPage"],
        calification=request.data["myReading"]["calification"],
        comments=request.data["myReading"]["comments"],
        startReading=request.data["myReading"]["startReading"],
        finishReading=request.data["myReading"]["finishReading"],
        bookType=request.data["myReading"]["bookType"],
    )

    """ print(book_data["title"]) """
    # devolver una respuesta adecuada
    return Response(
        {"message": "Book added successfully"}, status=status.HTTP_201_CREATED
    )


# Metodo get para traer mis libros de mi colección
@api_view(["GET"])
def getMyReadings(request):
    email = request.query_params.get("email")
    """ Validamos la existencia del email en el parametro """
    if not email:
        return Response(
            {"error": "Parametros no validos"}, status=status.HTTP_400_BAD_REQUEST
        )
    # creamos el usuario a partir del email, si no entrega un error 404
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "Usuario no existe"}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": "Error desconocido"}, status=status.HTTP_404_NOT_FOUND
        )

    books = models.MyReading.objects.filter(user=user).select_related("book")
    # SERIALIZAMOS(JSON) EL QUERY SET BOOK
    serializerr = serializer.MyReadingSerializer(books, many=True)
    return Response(serializerr.data, status=status.HTTP_200_OK)


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

    return Response({"token": token.key, "user": serialize.data})


@api_view(["POST"])
def registro(request):
    serialize = serializer.UserSerializer(data=request.data)
    if serialize.is_valid():
        serialize.save()
        user = User.objects.get(username=serialize.data["username"])
        user.set_password(serialize.data["password"])
        user.save()

        # creas un token para el usuario creado
        token = Token.objects.create(user=user)
        return Response(
            {"token": token.key, "user": serialize.data}, status=status.HTTP_201_CREATED
        )

    return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
