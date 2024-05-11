import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../assets/images/logos/logo.png";
import { Link, useLocation } from "react-router-dom";
import { Menu } from 'antd';

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  
  {
    title: "Jobs",
    href: "/Jobs",
    icon: "bi bi-briefcase",
  },
  {
    title: "Hiring Process",
    href: "/hiring",
    icon: "bi bi-person-check",
  },,
  {
    title: "People",
    href: "/People",
    icon: "bi bi-people",
  },
  {
    title: "Report",
    href: "/reports",
    icon: "bi bi-file-earmark-bar-graph-fill",
  },
  
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
       <img src={Logo} className="rounded-5"></img>

        <strong>Resume Parser </strong>
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
         
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
