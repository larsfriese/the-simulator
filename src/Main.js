import React from 'react'
import { HashRouter, Routes, Route, BrowserRouter} from "react-router-dom";

// pages
import Home from './Home';
import SpringAndRotatingMass from './analytical_mechanics/spring_and_rotating_mass/SpringAndRotatingMass';
import Navbar_analyticalMechanics from './Navbar_analyticalMechanics';
import Comp from './special_relativity/test';


// style/scripts
import PageNotFound from './PageNotFound.js';

// bootstrap styles
import "./styles.css";

// additional style elements
import "./extra-styles.css";


export default function Main() {
  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path="/home" exact element={<Home />} />
        <Route path="/" exact element={<Home />} />

        <Route path="/analytical-mechanics/spring-and-rotating-mass" exact element={
          <div className="d-flex" id="wrapper">
          <Navbar_analyticalMechanics active='1' />
          <SpringAndRotatingMass />
          </div>
        } />

        <Route path="/comp" exact element={<Comp />} />

      </Routes>
    </BrowserRouter>
    </>
  );
}