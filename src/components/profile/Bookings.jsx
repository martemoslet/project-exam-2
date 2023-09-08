import { missingImg } from "../../constants";
import { Link } from "react-router-dom";

const onImageError = (e) => {
    e.target.src = missingImg
  }

export function ProfileBookings({ bookingData }) {
    const convertDateFrom = new Date(bookingData.dateFrom).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
      });
      const convertDateTo = new Date(bookingData.dateTo).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
      });
    return (

        <div key={bookingData.id}>
            <Link to={`/venuePage/${bookingData.venue.id}`}>
                <img onError={onImageError} src={bookingData.venue.media ? bookingData.venue.media : missingImg} 
                alt={bookingData.venue.name} className="rounded" height={70} width={70} 
                style={{ objectFit: "cover" }} />
                </Link>
        <p>
            <span style={{ fontWeight: "bold" }} >{bookingData.venue.name}</span><br></br>
            {bookingData.venue.location.city}, {bookingData.venue.location.country}<br></br>
            {convertDateFrom} - {convertDateTo}, guests: {bookingData.guests}</p>
      </div>

    );
}
    