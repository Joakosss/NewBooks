from django.db import models
from django.contrib.auth.models import User


class Books(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=2000)
    pages = models.IntegerField()
    author = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    imgLink = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class MyReading(models.Model):
    book = models.ForeignKey(Books, on_delete=models.CASCADE, related_name="lecturas")
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="libros_leidos"
    )
    state = models.CharField(
        max_length=50
    )  # pendiente -leyendo -finalizado -abandonado
    currentPage = models.IntegerField()
    calification = models.IntegerField()  # del 1 al 5
    comments = models.TextField(max_length=500, blank=True)
    startReading = models.DateField(null=True, blank=True)
    finishReading = models.DateField(null=True, blank=True)
    bookType = models.CharField(max_length=50)  # fisico - digital - audio

    class Meta:
        unique_together = (
            "user",
            "book",
        )  # Evita duplicados del mismo usuario leyendo el mismo libro.

    def __str__(self):
        return self.book + " " + self.user
