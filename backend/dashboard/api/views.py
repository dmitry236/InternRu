from datetime import datetime 
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from ..models import JobPost
from .permissions import IsEmployer
from .serializers import JobPostSerializer
from .pagination import CustomPagination
from .renderers import CustomRenderer

class CreateJobPostView(CreateAPIView):
    permission_classes = [IsEmployer]
    serializer_class = JobPostSerializer
    
    def perform_create(self, serializer):
        user = self.request.user 
        serializer.save(poster=user)


class JobPostListView(ListAPIView):
    serializer_class = JobPostSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    filterset_fields = ["contract_type", "location", "working_language", "job_category", "industry"]
    search_fields = ["company", "job_title", "job_category", "industry"]
    ordering_fields = ["date_posted", "last_updated"]
    pagination_class = CustomPagination 
    renderer_classes = [CustomRenderer]
    
    def get_queryset(self):
        return JobPost.objects.filter(deadline__gte=datetime.today().date().strftime('%Y-%m-%d')).order_by("-last_updated")