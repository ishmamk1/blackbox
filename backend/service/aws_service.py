import boto3
from botocore.exceptions import NoCredentialsError

import uuid

s3_client = boto3.client('s3')
bucket_name = "blackbox-hacknyu"

def upload_image_to_s3(image_file):
    file_name = f"uploads/{uuid.uuid4().hex}"
    s3_client.upload_file(image_file, bucket_name)

    # Generate a presigned URL for temporary access to the uploaded file
    try:
        presigned_url = s3_client.generate_presigned_url('get_object',
                                            Params={'Bucket': bucket_name, 'Key': file_name},
                                            ExpiresIn=432000) 
        return presigned_url
    except NoCredentialsError:
        print("Credentials not available")