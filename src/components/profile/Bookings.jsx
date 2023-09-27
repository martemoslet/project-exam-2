import { missingImg } from "../../constants";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaStar } from "react-icons/fa";

const onImageError = (e) => {
  e.target.src = missingImg;
};

export function ProfileBookings({ bookingData }) {
  const convertDateFrom = new Date(bookingData.dateFrom).toLocaleDateString(
    "en-us",
    {
      month: "short",
      day: "numeric",
    }
  );
  const convertDateTo = new Date(bookingData.dateTo).toLocaleDateString(
    "en-us",
    {
      month: "short",
      day: "numeric",
    }
  );
  return (
    <Container key={bookingData.id}>
      <Row className="mt-2 pt-3 ps-2" style={{ backgroundColor: "#EDEDED" }}>
        <Col xs={2} className="d-flex justify-content-center">
          <Link to={`/venuePage/${bookingData.venue.id}`}>
            <img
              onError={onImageError}
              src={
                bookingData.venue.media ? bookingData.venue.media : missingImg
              }
              alt={bookingData.venue.name}
              className="rounded"
              height={70}
              width={70}
              style={{ objectFit: "cover" }}
            />
          </Link>
        </Col>
        <Col xs={10}>
          <p className="px-2">
            <span style={{ fontWeight: "bold" }}>{bookingData.venue.name}</span>
            <br></br>
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              {bookingData.venue.location.city},{" "}
              {bookingData.venue.location.country}{" "}
              <FaStar className="ms-2 me-2" size={15} />{" "}
              {bookingData.venue.rating > 0
                ? bookingData.venue.rating
                : `No ratings`}
            </span>
            <br></br>
            {convertDateFrom} - {convertDateTo}, Guests: {bookingData.guests}
          </p>
        </Col>
      </Row>
    </Container>
  );
}
