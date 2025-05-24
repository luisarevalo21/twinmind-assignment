import { Container } from "@mui/material";
import { Outlet } from "react-router";

const CustomContainer = () => {
  return (
    <Container className="homePageContainer" maxWidth="lg">
      <Outlet />
    </Container>
  );
};

export default CustomContainer;
