import { API_HOLIDAZE_URL, BOOKINGS, VENUES } from "../../constants";
import { authFetch } from "../../components/auth/authFetch";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import UserProfile from "../../components/profile/Profile";

const action = "/profiles";

export default function ProfilePage() {
  const [data, setData] = useState(null);
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

        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`${API_HOLIDAZE_URL}${action}/${name}${VENUES}${BOOKINGS}`);
  }, [name]);

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

  return <UserProfile key={data.name} {...data} />;
}
