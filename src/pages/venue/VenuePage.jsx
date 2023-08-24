import SingleVenue from "../../components/venues/SingleVenue";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

export default function VenuePage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { id } = useParams();

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

    getData(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
  }, [id]);

  if (isLoading || !data) {
    return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
      <SingleVenue key={data.id} {...data} />
  );
}