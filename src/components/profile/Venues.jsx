import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import { FaStar } from 'react-icons/fa';
import { missingImg } from "../../constants";
import Bookings from "../bookings/Bookings";


const onImageError = (e) => {
    e.target.src = missingImg
  }

export function ProfileVenues({ venueData }) {
    return (
                <Row className="border border-0" key={venueData.id}>
                    <Col>
                    <Link to={`/venuePage/${venueData.id}`}>
                <img onError={onImageError} src={venueData.media ? venueData.media : missingImg} 
                alt={venueData.name} className="rounded" height={70} width={70} 
                style={{ objectFit: "cover" }} />
                </Link>


                <h4>{venueData.name}</h4>
                <p>{venueData.location.city}, {venueData.location.country} <span style={{ display:'flex', alignItems: "center" }}><FaStar className="me-2" size={15} /> 
                {venueData.rating > 0 ? venueData.rating : `No ratings`}</span>
                
                </p>
                <p>Bookings:</p>
               <Bookings bookings={venueData.bookings} />
               <Link to={`/updateVenuePage/${venueData.id}`}><button>Edit venue</button></Link>
                    </Col>
                </Row>

    );
}
    