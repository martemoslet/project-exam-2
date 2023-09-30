import { API_HOLIDAZE_URL, VENUES } from "../../constants";
import { authFetch } from "../../components/auth/authFetch";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import BookingsOnProfile from "../../components/profile/BookingsOnProfile";

const action = "/profiles";

export default function YourBookings() {
  const [bookings, setBookings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { name } = useParams();

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await authFetch(url);
        const json = await response.json();

        setBookings(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`${API_HOLIDAZE_URL}${action}/${name}/bookings${VENUES}`);
  }, [name]);

  if (isLoading || !bookings) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return <BookingsOnProfile bookings={bookings} />;
}
