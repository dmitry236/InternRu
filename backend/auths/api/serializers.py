from auths.models import CustomUser 
from rest_framework import serializers


class AccountSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    
    class Meta:
        model = CustomUser 
        fields = ["id", "email", "password", "password2", "is_employer"]
        extra_kwargs = {
            "password": {"write_only": True}
        }