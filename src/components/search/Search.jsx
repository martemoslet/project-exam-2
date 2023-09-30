import { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const SearchBar = ({ setSearchResults }) => {
  const [searchInput, setSearchInput] = useState("");

  const fetchData = (value) => {
    fetch("https://api.noroff.dev/api/v1/holidaze/venues/")
      .then((response) => response.json())
      .then((json) => {
        const searchResults = json.filter((venues) => {
          return (
            value &&
            venues &&
            venues.name &&
            venues.name.toLowerCase().includes(value)
          );
        });
        setSearchResults(searchResults);
      });
  };

  const handleChange = (value) => {
    setSearchInput(value);
    fetchData(value);
  };

  return (
    <Container
      style={{
        paddingTop: 50,
        margin: "auto",
        borderRadius: 20,
      }}
    >
      <Form>
        <Row className="d-flex justify-content-center">
          <h1 style={{ fontSize: 18, fontWeight: 300 }} className="text-center">
            Find your dream holiday
          </h1>
          <Col xs={7} lg={9}>
            <Form.Control
              type="search"
              onChange={(e) => handleChange(e.target.value)}
              value={searchInput}
              style={{ maxWidth: 500, margin: "auto" }}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
export default SearchBar;
