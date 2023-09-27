import { OwnersProfileVenues } from "./OwnersProfileVenues";

export default function VenuesOnOwner({ venues }) {
  return (
    <>
      {venues &&
        venues.length &&
        venues.map((venueData) => (
          <OwnersProfileVenues key={venueData.id} venueData={venueData} />
        ))}
    </>
  );
}
