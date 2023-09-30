import { API_HOLIDAZE_URL, VENUES } from "../../constants";
import { authFetch } from "../../components/auth/authFetch";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OwnersVenues from "./OwnersVenues";
import { missingProfileImg } from "../../constants";

const action = "/profiles";

const onImageError = (e) => {
  e.target.src = missingProfileImg;
};

export default function OwnerProfile() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { name } = useParams();

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await authFetch(url);
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`${API_HOLIDAZE_URL}${action}/${name}${VENUES}`);
  }, [name]);

  if (isLoading || !data) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Container>
      <Row className="mt-3">
        <Col className="text-center" lg>
          <h1>{data.name}</h1>
          <p>{data.email}</p>
          <img
            onError={onImageError}
            src={data.avatar ? data.avatar : missingProfileImg}
            alt={data.name}
            height={120}
            width={120}
            style={{ objectFit: "cover" }}
            className="rounded"
          />
        </Col>
        <Col>
          <h2 className="text-center mb-3">{data.name}'s Venues</h2>
          <OwnersVenues />
        </Col>
      </Row>
    </Container>
  );
}
