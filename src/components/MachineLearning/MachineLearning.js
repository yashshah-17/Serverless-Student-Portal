import React from "react";
import NavHeader from "../Navbar/NavHeader";

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
            <input type="file" id="file" name="file"></input>
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

      </div>
    </div>
  );
}

export default MachineLearning;
