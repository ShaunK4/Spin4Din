import { Container, Navbar, Nav } from "react-bootstrap";
import LoginPlaceholder from "./LoginPlaceholder";

function Navigationbar() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      fixed="top"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/logo.ico"
            width="40"
            height="40"
            alt="Spin4Din logo"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/All">All Recipes</Nav.Link>
            <Nav.Link href="/GroceryList">Grocery List</Nav.Link>
          </Nav>
          <LoginPlaceholder />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
