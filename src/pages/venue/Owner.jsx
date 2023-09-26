import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { missingProfileImg } from "../../constants";
import * as storage from "../../components/auth/storage";

const profile = storage.load("profile");

const onImageError = (e) => {
  e.target.src = missingProfileImg;
};

export default function Owner() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`https://api.noroff.dev/api/v1/holidaze/venues/${id}/?_owner=true`);
  }, [id]);

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
    <Container className="mb-4">
      <hr className="mt-4 mb-4"></hr>
      <Row style={{ margin: 0 }}>
        <Col xs={3} md={2} className="d-flex justify-content-center">
          {profile ? (
            <Link to={`/ownerProfile/${data.owner.name}`}>
              <img
                onError={onImageError}
                src={data.owner.avatar ? data.owner.avatar : missingProfileImg}
                alt={data.owner.name}
                height={80}
                width={80}
                style={{ objectFit: "cover", borderRadius: "100%" }}
              />
            </Link>
          ) : (
            <img
              onError={onImageError}
              src={data.owner.avatar ? data.owner.avatar : missingProfileImg}
              alt={data.owner.name}
              height={80}
              width={80}
              style={{ objectFit: "cover", borderRadius: "100%" }}
            />
          )}
        </Col>
        <Col xs={9} md={10}>
          <h3>Owner</h3>
          <p>
            {data.owner.name}
            <br></br>
            {data.owner.email}
          </p>
        </Col>
      </Row>
    </Container>
  );
}
