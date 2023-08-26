import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import { missingImg } from "../../constants";
import { FaStar } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';
import { FaUtensils } from 'react-icons/fa';
import { FaWifi } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';
import { FaDog } from 'react-icons/fa';

const onImageError = (e) => {
  e.target.src = missingImg
}

export default function SingleVenue({ id, media, name, price, rating, location, description, maxGuests, meta }) {
  return (
    <Container id={id} className="d-flex justify-content-center mt-4">
      <Row>
        <Col xs="8" lg="12" className="" style={{ maxWidth: "500px" }}>
        <div className="text-center">
        <h1 style={{ fontWeight: 300 }}>{name}</h1>
      <p>{location.city}, {location.country}<span style={{ alignItems: "center" }}><FaStar className="mx-2" size={15} /> {rating > 0 ? rating : `No ratings`}</span></p>
        </div>
        
     <img src={media ? media : missingImg} alt={name} height={400} width={500} onError={onImageError} style={{ objectFit: "cover" }} />

     <p className="mt-2">{description}</p>
     <div className="d-flex justify-content-center mt-4 pt-3" style={{ border: "solid 1px", borderRadius: 20, width: "250px", margin: "auto" }}>
     <p><FaUserFriends size={15} className="me-2" /> {maxGuests} guests<br></br>
     <FaUtensils size={15} className="me-2" /> {meta.breakfast > 0 ? `Breakfast included` : `Breakfast not included`}<br></br>
     <FaWifi size={15} className="me-2" /> {meta.wifi > 0 ? `Fast wifi` : `No wifi`}<br></br>
     <FaCar size={15} className="me-2" /> {meta.parking > 0 ? `Parking on site` : `No parking`}<br></br>
     <FaDog size={15} className="me-2" /> {meta.pets > 0 ? `Pets are allowed` : `No pets allowed`}<br></br> </p>
     </div>
        </Col>
      </Row>
      
    </Container>
  );
}