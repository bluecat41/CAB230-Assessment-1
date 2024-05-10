import './App.css';
import * as React from "react";
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
import VolcanoList, { countriesLoader } from "./Pages/VolcanoList.js";
import Volcano from "./Pages/Volcano.js";

//Components
import RootLayout from './Components/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="volcanolist" element={<VolcanoList />} loader={countriesLoader} 
      />
      <Route path="volcano" element={<Volcano />} 
      />
      <Route path="*" element={<ErrorPage />} />
    </Route>
    
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
