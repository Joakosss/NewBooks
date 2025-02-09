from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework.documentation import include_docs_urls


router = DefaultRouter()
router.register(r"books", views.BookView)
router.register(r"myReadings", views.MyReadingsView)

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("login/", views.login),
    path("register/", views.registro),
    path("docs/", include_docs_urls(title="Book API")),
    path("add-my-reading/", views.add_myReading),
]

# """ path("book/<str:searchBook>", views.ApiConsult), """
