import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaStar } from "react-icons/fa";
import { missingImg } from "../../constants";
import Bookings from "../bookings/Bookings";
import Container from "react-bootstrap/Container";
import styles from "../../components/ui/Button.module.css";
import Button from "react-bootstrap/Button";

const onImageError = (e) => {
  e.target.src = missingImg;
};

export function ProfileVenues({ venueData }) {
  return (
    <Container key={venueData.id}>
      <Row
        className="mt-2 pt-3 pb-3 ps-2"
        style={{ backgroundColor: "#EDEDED" }}
      >
        <Col xs={2} className="d-flex justify-content-center">
          <Link to={`/venuePage/${venueData.id}`}>
            <img
              onError={onImageError}
              src={venueData.media ? venueData.media : missingImg}
              alt={venueData.name}
              className="rounded"
              height={70}
              width={70}
              style={{ objectFit: "cover" }}
            />
          </Link>
        </Col>

        <Col xs={10}>
          <p>
            <span style={{ fontWeight: "bold" }}>{venueData.name}</span>
            <br></br>
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              {venueData.location.city}, {venueData.location.country}{" "}
              <FaStar className="ms-2 me-2" size={15} />
              {venueData.rating > 0 ? venueData.rating : `No ratings`}
            </span>
            <br></br>
            {venueData.bookings.length === 0
              ? "No bookings on venue"
              : "Bookings: "}
            <br></br>
            <Bookings bookings={venueData.bookings} />
          </p>
          <div className="d-md-flex justify-content-md-end">
            <Link to={`/updateVenuePage/${venueData.id}`}>
              <Button className={styles.primary} size="sm">
                Edit
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
