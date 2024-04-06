from django.urls import path
from .views import HomePageView, GetPostsView

app_name = 'homepage'
urlpatterns = [
    path('', HomePageView.as_view(), name='homepage'),
    path('get_posts/', GetPostsView.as_view(), name='get_posts')
]