from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework.documentation import include_docs_urls

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = DefaultRouter()

urlpatterns = [
    path("api/v1/", include(router.urls)),
    # path("login/", views.login),
    path("register/", views.registro),
    path("topBooks/", views.mostPopularBooks),
    path("docs/", include_docs_urls(title="Book API")),
    path("add-my-reading/", views.addMyReading),
    path("read-my-readings/", views.getMyReadings),
    #
    # simple jwt
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

# """ path("book/<str:searchBook>", views.ApiConsult), """
