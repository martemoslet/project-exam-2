import { Venue } from "./Venue"
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";

export default function VenueList({ venues }) {
    return (
        <Container>
            <Row>
            {venues && venues.length && venues.map((venueData) => (
                <Venue key={venueData.id} venueData={venueData} />
            ))}
        </Row>
        </Container>
    )
}