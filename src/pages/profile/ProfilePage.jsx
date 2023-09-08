import { authFetch } from "../../components/auth/authFetch";
import AvatarChange from "./updateProfile";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import UserProfile from "../../components/profile/Profile";
import VenueManager from "./VenueManager";
import YourVenues from "./YourVenues";
import YourBookings from "./YourBookings";


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
  
      getData(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/?_venue=true/?_bookings=true`);
    }, [name]);
  
    if (isLoading || !data) {
      return <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
              </Spinner>;
    }
  
    if (isError) {
      return <div>Error</div>;
    }
    console.log(data)


return (
<div><UserProfile key={data.name} {...data} />
<AvatarChange />
{ data.venueManager === false ? <VenueManager /> : "" }
<h2>Upcoming bookings</h2>
<YourBookings />
<h3>Your venues</h3>
<YourVenues />
</div>
)
}
