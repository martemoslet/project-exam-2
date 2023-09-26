import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { API_HOLIDAZE_URL } from "../../constants";
import { authFetch } from "../auth/authFetch";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import styles from "../../components/ui/Button.module.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const action = "/bookings";

export default function Calendar() {
  let { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const guestsChange = (e) => {
    setGuests(parseInt(e.target.value));
  };

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

    getData(
      `https://api.noroff.dev/api/v1/holidaze/venues/${id}/?_bookings=true`
    );
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

  const excludeDateIntervals = data.bookings?.map((booking) => ({
    start: new Date(booking.dateFrom),
    end: new Date(booking.dateTo),
  }));

  async function onSubmit(event) {
    event.preventDefault();
    const bookVenueURL = `${API_HOLIDAZE_URL}${action}`;
    const bookingData = {
      dateFrom: startDate,
      dateTo: endDate,
      guests: guests,
      venueId: id,
    };

    const response = await authFetch(bookVenueURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(bookingData),
    });

    const result = await response.json();
    if (response.status === 201 || 204) {
      console.log(result);
      return result;
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center pt-4 pb-4 calendar">Book your stay</h1>
      <Form onSubmit={onSubmit}>
        <Form.Control value={id} id="id" readOnly hidden />
        <Row xs={1} sm={1} lg={1} className="justify-content-center">
          <Col>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              id="startDate"
              value={startDate}
              inline
              excludeDateIntervals={excludeDateIntervals}
            />
          </Col>
          <Col>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              id="endDate"
              value={endDate}
              inline
              excludeDateIntervals={excludeDateIntervals}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={4} md={2}>
            <Form.Label>Guests</Form.Label>
            <Form.Control
              id="guests"
              onChange={guestsChange}
              type="number"
              className="mb-3 guests"
              max={data.maxGuests}
              min="1"
            />

            <Button type="submit" className={styles.primary}>
              Book venue
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
