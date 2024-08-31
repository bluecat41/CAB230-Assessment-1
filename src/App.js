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
import UserPage from "./Pages/User.js";
import UploadPage from "./Pages/Upload.js";

// Components
import RootLayout from './Components/RootLayout';

// Creating browser router to display all routes using React Router module
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="user" element={<UserPage />} />
      <Route path="upload" element={<UploadPage />} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
