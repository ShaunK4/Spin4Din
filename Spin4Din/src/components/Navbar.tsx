import { Container, Navbar, Nav } from "react-bootstrap";

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
        <Navbar.Brand href="/">Spin4Din</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/All">All Recipes</Nav.Link>
            <Nav.Link href="/GroceryList">Grocery List</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
