import { API_HOLIDAZE_URL } from "../../constants";
import { authFetch } from "../../components/auth/authFetch";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import VenuesOnOwner from "../../components/profile/VenuesOnOwner";

const action = "/profiles";

export default function OwnersVenues() {
  const [venues, setVenues] = useState(null);
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

        setVenues(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`${API_HOLIDAZE_URL}${action}/${name}/venues`);
  }, [name]);

  if (isLoading || !venues) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return <VenuesOnOwner venues={venues} />;
}
