"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os

from django.contrib import admin
from django.http import Http404, JsonResponse
from django.urls import path
from django.views.generic import RedirectView

codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base_url = f"https://{codespace_name}-8000.app.github.dev"
else:
    base_url = "http://localhost:8000"

API_COMPONENTS = [
    'users',
    'teams',
    'activities',
    'leaderboard',
    'workouts',
]


def api_root(request):
    return JsonResponse({
        'base_url': base_url,
        'endpoints': {
            component: f"{base_url}/api/{component}/" for component in API_COMPONENTS
        },
    })


def api_component(request, component):
    if component not in API_COMPONENTS:
        raise Http404('API component not found')

    return JsonResponse({
        'component': component,
        'url': f"{base_url}/api/{component}/",
        'results': [],
    })

urlpatterns = [
    path('', RedirectView.as_view(url='/api/', permanent=False), name='root-redirect'),
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/<str:component>/', api_component, name='api-component'),
]
