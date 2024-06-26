import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import Footer from "../layouts/Footer";

const FullLayout = () => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex bg-light">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header />
          {/********Middle Content**********/}
          <Container className="py-4 wrapper" fluid>
            <Outlet />
          </Container>

        </div>
        <div className="footerArea">

        </div>

      </div>
      <Footer></Footer>
    </main>
  );
};

export default FullLayout;
