import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import { FaStar } from 'react-icons/fa';
import Placeholder from 'react-bootstrap/Placeholder';
import { missingImg } from "../../constants";

const onImageError = (e) => {
    e.target.src = missingImg
  }

export function Venue({ venueData }) {
    return (
                <Col className="d-flex justify-content-center">
                <Card className="border border-0" style={{ width: "16rem" }} key={venueData.id}>
                <Link to={`/venuePage/${venueData.id}`}>
                <Card.Img variant="top" onError={onImageError} src={venueData.media ? venueData.media : missingImg} alt={venueData.name} className="rounded" height={230} style={{ objectFit: "cover" }} />
                </Link>
                <Card.Body>
                <Card.Title>{venueData.location.city}, {venueData.location.country}</Card.Title>
                <Card.Text>{venueData.price} NOK night <span style={{ display:'flex', alignItems: "center" }}><FaStar className="me-2" size={15} /> {venueData.rating > 0 ? venueData.rating : `No ratings`}</span></Card.Text>
                </Card.Body>
                </Card>
                </Col>
    );
}