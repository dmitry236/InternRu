from django.db import models
from django.utils import timezone
from auths.models import CustomUser
from django.utils.text import slugify 
from django.conf import settings

class JobPost(models.Model):
    CONTRACT_TYPE = (
        ("Full-time", "Full-time"),
        ("Part-time", "Part-time"),
        ("Freelance", "Freelance"),
        ("Internship", "Internship")
    )
    COMPANY_SIZE = (
            ("0-10", "0-10"),
            ("11-50", "11-50"),
            ("51-200", "51-200"),
            ("201-500", "201-500"),
            ("501-1000", "501-1000"),
            ("1001-5000", "1001-5000")
        )
    INDUSTRY = (
            ("SaaS", "SaaS"),
            ("E-commerce", "E-commerce"),
            ("Technology", "Technology"),
            ("Fashion", "Fashion"), 
            ("Finance", "Finance"),
            ("Health", "Health"), 
            ("Gaming", "Gaming"),
            ("Travel", "Travel"), 
            ("Food", "Food"),
            ("Education", "Education"),
            ("Transportation", "Transportation"),
            ("Music", "Music"), 
            ("Arts", "Arts"), 
            ("Others", "Others")
        )