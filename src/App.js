import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // We had less time, your database was very big, so I could not store all the data, I have added 30 data from starting, sorry for that
  // you have to start json server then applection will work ...
  // json-server --watch db.json --port 3004
  //
  //
  const [weight, setWeight] = useState(0);
  const [location, setLocation] = useState(0);
  const [customerdata, setCoustomer] = useState([]);
  const [companydata, setCompanydata] = useState([]);
  const [result, setResult] = useState();

  const handleWeight = (e) => {
    setWeight(e);
  };
  const handleLocation = (e) => {
    setLocation(e);
  };

  useEffect(() => {
    getalldata();
  }, []);

  const getalldata = () => {
    fetch("http://localhost:3004/customer_pincode")
      .then((res) => res.json())
      .then((result) => {
        setCoustomer(result);
        console.log(result);
      });

    fetch("http://localhost:3004/company_data")
      .then((res) => res.json())
      .then((result) => {
        setCompanydata(result);
      });
  };

  const handleclick = () => {
    var userdatafilter = customerdata.filter((e) => e.c_pincode == location);
    var a = userdatafilter[0].c_zone;
    var companyfilterdata = companydata.filter((e) => e.company_zone == a);
    var firstkg = companyfilterdata[0].firstkg;
    var anothercharge = companyfilterdata[0].additional;
    var totalsum = firstkg;
    var step1 = weight - 0.5;
    var price = anothercharge / 0.5;
    var final = price * step1;
    totalsum = totalsum + final;
    setResult(totalsum);
  };

  return (
    <div className="App">
      <div className="result">₹ {result}</div>
      <div className="box">
        <input
          className="weightbox"
          placeholder="weight of product"
          onChange={(e) => {
            handleWeight(e.target.value);
          }}
        ></input>

        <div>
          <input
            className="locationbox"
            placeholder="Enter location / pincode"
            onChange={(e) => {
              handleLocation(e.target.value);
            }}
          ></input>
        </div>
        <button onClick={handleclick}>Total Price</button>
      </div>
    </div>
  );
}

export default App;
