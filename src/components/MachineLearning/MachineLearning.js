import React from "react";

function MachineLearning() {


 

  return (
    <div className="container">
      <h3>Machine learning module</h3>

      <form method="post" action="https://us-central1-instant-grove-279600.cloudfunctions.net/uploadFile" enctype="multipart/form-data">
          <input type="file" id="file" name="file"></input>
          <input type="submit" value="upload"></input>
      </form>

      <form method="post" action="https://us-central1-instant-grove-279600.cloudfunctions.net/formClusters">
        <input type="submit" value="Create Clusters"></input>
      </form>


    </div>
  );
}

export default MachineLearning;
