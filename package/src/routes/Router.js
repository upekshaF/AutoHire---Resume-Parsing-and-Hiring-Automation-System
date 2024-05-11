import { exact } from "prop-types";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const LoginRegLayout = lazy(() => import("../layouts/loginregLayout.js"));
const FullLayoutLight = lazy(() => import("../layouts/FullLayoutLight.js"));
/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const UploadFiles = lazy(() => import("../views/Upload/Upload.js"))
const Jobs = lazy(() => import("../views/Jobs/Jobs.js"))
const GetStarted = lazy(() => import("../views/Startup/GetStarted.js"))
const Login = lazy(() => import("../views/Startup/login.js"));
const Signup = lazy(() => import("../views/Startup/Signup.js"));
const People = lazy(() => import("../views/People/People.js"))
const MyAccount = lazy(() => import("../views/MyAccount/MyAccount.js"))
const HiringStatus= lazy(() => import("../views/HiaringStatus/HiringStatus.js"))

/***** Pages for Normal Users ****/

const UserFeed = lazy(() => import("../views/NormalUser/UserFeed.js"))
const UserUpload = lazy(() => import("../views/NormalUser/UserUpload.js"))


/***** Pages for Admin  Users ****/
const AdminDashboard = lazy(() => import("../views/AdminUser/AdminDashboard.js"))
/*****Routes******/
const ViewReport = lazy(() => import("../views/ViewReport.js"))

const ThemeRoutes = [
  {
    path:"/",
    
    children: [
      { path: "/", exact: true, element: <GetStarted /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/signup", exact: true, element: <Signup /> },
      { path: "/getstarted", exact: true, element: <GetStarted /> },
      { path: "/userfeed", exact: true, element: <UserFeed /> },
      { path: "/userupload", exact: true, element: <UserUpload /> },
      { path: "/admindashboard", exact: true, element: <AdminDashboard /> },
      { path: "/reports", exact: true, element: <ViewReport /> },
    ],
  },
  {
    path:"/",
    element: <FullLayoutLight />,
    children: [
      {path: "/jobs", exact: true, element: <Jobs/>},
      {path: "/people", exact: true, element: <People/>},
      {path: "/account", exact: true, element: <MyAccount/>},
      {path: "/hiring", exact:true, element:<HiringStatus/>}
    ],
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      {path: "/upload", exact: true, element: <UploadFiles/>},
      
    

     
    ],
  },
];

export default ThemeRoutes;
