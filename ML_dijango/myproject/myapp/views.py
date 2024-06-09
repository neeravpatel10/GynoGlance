# views.py

from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import HttpResponse
import requests
import logging

logger = logging.getLogger(__name__)

def home(request):
    return render(request, 'myapp/home.html')

NGROK_URL = 'https://476e-35-236-198-120.ngrok-free.app'  # Use the ngrok URL obtained from Colab

class ImagePredictionView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        logger.info("Received request for image prediction")
        try:
            image = request.FILES['image']
            response = requests.post(
                f'{NGROK_URL}/predict',
                files={'file': image}
            )
            response.raise_for_status()  # Raise an exception for HTTP errors
            logger.info("Received response from ML model")
            return HttpResponse(response.content, content_type='image/jpeg')
        except Exception as e:
            logger.error("Error during image prediction", exc_info=e)
            return HttpResponse(status=500)
