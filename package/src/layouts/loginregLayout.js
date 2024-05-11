import { Outlet } from "react-router-dom";
import { Row, Col } from 'reactstrap'
import { Container } from "reactstrap";
import TopNavigation from "./TopNavigation";


const LoginRegLayout = () => {
    return (
        <main>

            <div className="pageWrapper d-lg-flex" >
                {/* Content Area */}

                <div className="col contentArea">
                    {/* Middle Content */}
                    <Container className="wrapper" fluid>
                        {/* Outlet */}
                        <Outlet />
                    </Container>
                </div>
                


            </div>

        </main>
    );
};

export default LoginRegLayout;
