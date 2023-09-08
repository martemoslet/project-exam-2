export default function Booking({ id, dateFrom, dateTo, guests }) {
    const convertDateFrom = new Date(dateFrom).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
      });
      const convertDateTo = new Date(dateTo).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
      });
    return (
      <div key={id}>
        <p>{convertDateFrom} - {convertDateTo}, guests: {guests}</p>
      </div>
    );
  }