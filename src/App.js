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
import VolcanoList from "./Pages/VolcanoList.js";

//Components
import RootLayout from './Components/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/VolcanoList" element={<VolcanoList />} />
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
