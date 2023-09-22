import { ProfileVenues } from "./Venues";

export default function VenuesOnProfile({ venues }) {
  return (
    <>
      {venues &&
        venues.length &&
        venues.map((venueData) => (
          <ProfileVenues key={venueData.id} venueData={venueData} />
        ))}
    </>
  );
}
