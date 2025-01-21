from rest_framework import serializers
from . import models


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Books
        # fields=("id", "title", "description", "pages", "author", "category", "imgLink")
        fields = "__all__"


class MyReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MyReading
        # fields=("id", "title", "description", "pages", "author", "category", "imgLink")
        fields = "__all__"
