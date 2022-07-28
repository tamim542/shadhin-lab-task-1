import logo from './logo.svg';
import './App.css';
import Tabs from './component/Tabs/Tabs';
import { Routes, Route } from "react-router-dom";
import Details from './component/Details/Details';
import Header from './component/Header/Header';
import Update from './component/Update/Update';
// import Countrystatecity from './component/Countrystatecity/Countrystatecity';
// import Divisions from './component/Divisions/Divisions';


function App() {
  return (
    <div className="App">
      <Header></Header>
      {/* <Countrystatecity></Countrystatecity>
      <Divisions></Divisions> */}
        <Routes>
        <Route path="/" element={<Tabs />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/updateinfo/:id" element={<Update />} />
       
      </Routes>
         
    </div>
  );
}

export default App;
