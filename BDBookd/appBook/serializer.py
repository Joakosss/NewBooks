from rest_framework import serializers
from . import models


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        # fields=("id", "title", "description", "pages", "author", "category", "imgLink")
        fields = "__all__"


class MyReadingSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = models.MyReading
        fields = (
            "id",
            "state",
            "currentPage",
            "calification",
            "comments",
            "startReading",
            "finishReading",
            "bookType",
            "book",
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ("username", "email", "password")
