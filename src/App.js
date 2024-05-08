import './App.css';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";

// Pages
import LandingPage from "./Pages/LandingPage.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import ErrorPage from "./Pages/ErrorPage.js";
import VolcanoList from "./Pages/VolcanoList.js";
import HomePage from "./Pages/HomePage.js";
import Header from "./Components/Header.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/VolcanoList" element={<VolcanoList />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
    
  )
)

function App() {

  return (
    <>
    <Header />
      <RouterProvider router={router}/>
   </>
  );
}

export default App;
