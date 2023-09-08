import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import { ProfileVenues } from './Venues';

export default function VenuesOnProfile({ venues }) {
    return (
        <Container>
            <Row>
            {venues && venues.length && venues.map((venueData) => (
                <ProfileVenues key={venueData.id} venueData={venueData} />
            ))}
        </Row>
        </Container>
    )
}