from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"books", views.BookView)

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("login/", views.login),
    path("register/", views.registro),
]

# """ path("book/<str:searchBook>", views.ApiConsult), """
