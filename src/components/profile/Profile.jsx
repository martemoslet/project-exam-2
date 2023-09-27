import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../components/ui/Button.module.css";
import Button from "react-bootstrap/Button";
import AvatarChange from "../../pages/profile/updateProfile";
import VenueManager from "../../pages/profile/VenueManager";
import YourBookings from "../../pages/profile/YourBookings";
import YourVenues from "../../pages/profile/YourVenues";
import { FaPlus } from "react-icons/fa";
import { missingProfileImg } from "../../constants";

const onImageError = (e) => {
  e.target.src = missingProfileImg;
};

export default function UserProfile({
  avatar,
  name,
  email,
  venueManager,
  _count,
}) {
  return (
    <Container>
      <Row className="mt-3">
        <Col className="text-center" lg>
          <h1>{name}</h1>
          <p>{email}</p>
          <img
            onError={onImageError}
            src={avatar ? avatar : missingProfileImg}
            alt={name}
            height={120}
            width={120}
            style={{ objectFit: "cover" }}
            className="rounded"
          />
          <AvatarChange />
        </Col>
        <Col lg>
          <h2 className="pb-2">Upcoming bookings</h2>
          {_count.bookings > 0 ? <YourBookings /> : "No bookings yet!"}
          <h3 className="mt-4">Your venues</h3>
          {_count.venues > 0 ? <YourVenues /> : "You have no venues yet"}
          {venueManager === false ? <VenueManager /> : ""}
          <div className="mt-4 mb-4">
            {venueManager === true ? (
              <Button href="/addVenuePage" className={styles.addBtn}>
                <FaPlus className="me-2" size={15} />
                Add venue
              </Button>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
