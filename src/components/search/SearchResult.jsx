import { Link } from "react-router-dom";

const SingleSearchResult = ({ searchResult }) => {
  return (
    <div className="searchResult">
      <Link to={`/venuePage/${searchResult.id}`}>{searchResult.name}</Link>
    </div>
  );
};
export default SingleSearchResult;
