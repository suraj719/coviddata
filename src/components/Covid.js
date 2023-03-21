import React, { useEffect, useState } from "react";
import gif from './giphy.webp'
export default function Covid() {
  const url = "https://api.rootnet.in/covid19-in/stats/latest";
  const [cases, setCases] = useState([]);
  const fetchapidata = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.regional);
        setCases(data.data.regional);
      });
  };
  useEffect(() => {
    fetchapidata();
  }, []);
  var totalcases = cases.reduce((total,acc) => {
    return acc.totalConfirmed+total
},0)
var totaldeaths = cases.reduce((total,acc) => {
    return acc.deaths+total
},0)
var totaldischargeed = cases.reduce((total,acc) => {
    return acc.discharged+total
},0)
  return (
    <div className="header text-center mt-5">
        <h1 className="text-danger">COVID-19 DATA</h1>
        <img className="gif" src={gif}/>
        <p className="text-white fs-5">
            Total Confirmed cases : {totalcases} <br/>
            Total Deaths : {totaldeaths} <br/>
            Total Discharged : {totaldischargeed}
        </p>
      <div className="container d-flex flex-wrap justify-content-between mt-5">
        {cases.map((state) => {
          return (
            <div className="card text-center m-3 align-items-center">
              <div className="card-body">
                <h5 className="card-title state">{state.loc}</h5>
                <p className="card-text">
                  Total confirmed cases: {state.totalConfirmed}
                  <br />
                  Total deaths: {state.deaths}
                  <br />
                  Discharged: {state.discharged}
                  <br />
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div>
          <h2 className="text-success mt-5 mb-1 bg-white">Note: This data is last updated on 2022-05-14</h2>
      </div>
    </div>
  );
}
