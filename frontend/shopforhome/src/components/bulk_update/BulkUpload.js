import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import UploadedProducts from "./UploadedProducts";
import axios from "axios";




const BulkUpload = () => {
  //State to store the values
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // Parsed Data Response in array format
        setProducts(results.data);
      },
    });
  };

  const handleOnClick = async () => {
    await axios
      .post("http://localhost:3008/bulkupdate", products)
      .then((response) => {
        // navigate('/products')
        if (response?.status === 200) {
        //   setResponse(response?.data?.message);
        }
      });
  };
  return (
    <div>
      {/* <input
      className="file-input"
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      /> */}
      <div className="bulk-upload">
          <input onChange={changeHandler} name="file" class="form-control form-control-sm" id="formFileSm" accept=".csv" type="file"/>
          <button className="btn btn-outline-dark" onClick={handleOnClick}>
          <NavLink to='products' style={{textDecoration:'none'}}>Upload Products</NavLink></button>
      </div>
      <br />
      <br />
      <UploadedProducts products={products} />
    </div>
  );
};

export default BulkUpload;
