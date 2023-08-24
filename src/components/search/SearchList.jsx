import SingleSearchResult from "./SearchResult";
import Col from 'react-bootstrap/Col';

const SearchList = ({ searchResults }) => {
    return (
      <Col className="" style={{ display: "flex", flexDirection: "column", maxWidth: "500px",
      margin: "auto", maxHeight: "150px", overflowY: "scroll", borderRadius: 7, marginBottom: 50 }} xs={7} lg={9}>
        {searchResults.map((searchResult, id) => {
          return <SingleSearchResult key={id} searchResult={searchResult} />;
        })}
      </Col>
    );
  };
  export default SearchList;