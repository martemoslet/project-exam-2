import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import { ProfileBookings } from './Bookings';

export default function BookingsOnProfile({ bookings }) {
    return (
        <Container>
            <Row>
            {bookings && bookings.length && bookings.map((bookingData) => (
                <ProfileBookings key={bookingData.id} bookingData={bookingData} />
            ))}
        </Row>
        </Container>
    )
}