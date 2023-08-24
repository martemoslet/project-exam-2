import { useEffect, useState } from "react";
import VenueList from "../../components/venues/VenueList"
import Spinner from 'react-bootstrap/Spinner';
import SearchBar from "../../components/search/Search";
import SearchList from "../../components/search/SearchList";


export default function Home() {
    const [venues, setVenues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function getData(url) {
            try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        setVenues(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`https://api.noroff.dev/api/v1/holidaze/venues/`);
  }, []);

  const [searchResults, setSearchResults] = useState([]);

  if (isLoading || !venues) {
    return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
    <div className="search">
        <SearchBar setSearchResults={setSearchResults} />
        <SearchList searchResults={searchResults} />
      </div>
    <VenueList venues={venues} />
    </>
  );
}
