import React from "react";
import NavHeader from "../Navbar/NavHeader";

function uploadfile () {

  const requestOptionsPost = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: "upload",
      organisation: localStorage.getItem("organization") || "dalhousie"
    })
  };

  fetch('https://us-central1-avid-garage-282122.cloudfunctions.net/pubsub_message_post_and_retrieve', requestOptionsPost)
    .then(response => response.json())
    .then(data => console.log(data));
}

function MachineLearning() {


  return (
    <div>
       <NavHeader />
    
    <div className="container">
      <br/>
      <h1 align="center">Welcome to the Machine Learning Dashboard</h1>
      <h5 align="center">Upload some files and see how clusters are formed</h5>

      <br/><br/><br/>
      <center>
        <form method="post" action="https://us-central1-instant-grove-279600.cloudfunctions.net/uploadFile" enctype="multipart/form-data">
            <input type="file" id="file" name="file" required></input>
            <input type="submit" className="btn btn-success" value="upload"></input>
        </form>
      </center>

      <br/>
      <hr/>
      <br/>
      <center>
        <form method="post" action="https://us-central1-instant-grove-279600.cloudfunctions.net/formClusters">
          <input type="submit" className="btn btn-primary" value="Create Clusters"></input>
        </form>
      </center>

      <br/>

      <center>
          <button onClick={uploadfile}
          className="btn btn-outline-primary">Upload Chat File</button>        
      </center>

      </div>
    </div>
  );
}

export default MachineLearning;
