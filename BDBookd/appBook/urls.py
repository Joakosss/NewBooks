from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework.documentation import include_docs_urls


router = DefaultRouter()
router.register(r"books", views.BookView)

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("login/", views.login),
    path("register/", views.registro),
    path("docs/", include_docs_urls(title="Book API")),
]

# """ path("book/<str:searchBook>", views.ApiConsult), """
