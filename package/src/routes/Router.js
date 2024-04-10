import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const LoginRegLayout = lazy(() => import("../layouts/loginregLayout.js"));
/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const UploadFiles = lazy(() => import("../views/Upload/Upload.js"))
const Jobs = lazy(() => import("../views/Jobs/Jobs.js"))
const GetStarted = lazy(() => import("../views/Startup/GetStarted.js"))
const Login = lazy(() => import("../views/Startup/login.js"));
const Signup = lazy(() => import("../views/Startup/Signup.js"));
const People = lazy(() => import("../views/People/People.js"))
/*****Routes******/

const ThemeRoutes = [
  {
    path:"/",
    element:<LoginRegLayout/>,
    children: [
      { path: "/", exact: true, element: <GetStarted /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/signup", exact: true, element: <Signup /> },
      { path: "/getstarted", exact: true, element: <GetStarted /> },
      
    ],
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      {path: "/upload", exact: true, element: <UploadFiles/>},
      {path: "/jobs", exact: true, element: <Jobs/>},
      {path: "/people", exact: true, element: <People/>}

     
    ],
  },
];

export default ThemeRoutes;
