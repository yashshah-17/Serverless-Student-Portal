import json
import pickle
from google.cloud import storage
from scipy.spatial import distance
def hello_world(request):

    all_files = {}
    all_files_vector = {}
    final_dict = {}
    client_store = storage.Client()

    storage_bucket = client_store.get_bucket("model_and_vector")
    blob = storage_bucket.blob("tfidfVectorizer.pkl")
    blob.download_to_filename("/tmp/vectorizer.pkl")
    blob = storage_bucket.blob("model.pkl")
    blob.download_to_filename("/tmp/model.pkl")

    fp = open("/tmp/model.pkl","rb")
    ml_model = pickle.load(fp)
    fp.close()

    fp = open("/tmp/vectorizer.pkl","rb")
    vectorizer = pickle.load(fp)
    fp.close()

    print("Model succesfully imported")
    print("Vectorizer successfully imported")
    
    cluster_centroids = ml_model.cluster_centers_.argsort()[:,::-1]

    print(cluster_centroids)

    blobs = client_store.list_blobs("serverlessb00835071")
    for each_blob in blobs:
        filename = "/tmp/"+each_blob.name
        each_blob.download_to_filename(filename)

        fp = open(filename,"r")
        all_files[each_blob.name] = fp.read()
        fp.close()
    
    print(len(all_files))

    for key, value in all_files.items():
        all_files_vector[key] = vectorizer.transform([all_files[key]]).toarray()[0]

    print(len(all_files_vector))
    print("Vector created for all the files")

    total_clusters = 20

    for key, value in all_files_vector.items():
        num = 0
        difference = distance.euclidean(value,cluster_centroids[0])
        for individual in range(0,len(cluster_centroids)):
            res = distance.euclidean(value,cluster_centroids[individual])
            if(res <= difference):
                num = individual
        final_dict[key] = num
    
    print(final_dict)

    clusters = []
    final_clusters = []
    for key, value in final_dict.items():
        file_lis = []
        for i in final_dict.keys():
            if(final_dict[i]==value):
                file_lis.append(i)
        clusters.append(file_lis)

    for i in clusters:
        if(i not in final_clusters):
            final_clusters.append(i)
    
    print(final_clusters)
    return json.dumps(final_clusters)
