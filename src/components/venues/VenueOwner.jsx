import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function VenueOwner(name, email, avatar) {
  return (
    <Container>
      <Row>
        <Col>Owner: {name}</Col>
      </Row>
    </Container>
  );
}
