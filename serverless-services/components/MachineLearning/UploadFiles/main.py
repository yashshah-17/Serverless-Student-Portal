from gcloud import storage

def hello_world(request):
   
    if request.method=="POST":
        print("Triggered")
        fileObj = request.files["file"]
        fileObj.save("/tmp/"+fileObj.filename)
        client = storage.Client()
        bucket = client.get_bucket('serverlessb00835071')
        blob = bucket.blob(fileObj.filename)
        blob.upload_from_filename("/tmp/"+fileObj.filename)
    return "File Uploaded"



