import React from "react";
import "./SearchingStyles.css";
import { Button, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../db/firebase";
import LinearProgress from "@mui/material/LinearProgress";
import uuid from "react-uuid";

const Searching = ({ isSearching, searchInputValue, setSearchInputValue,currentUserData }) => {
  let valueToSearch =
    searchInputValue &&
    searchInputValue[0].toUpperCase() + searchInputValue.slice(1);
  const [searchResults, setSearchResults] = useState(null);
  const [searchCollection, setSearchCollection] = useState("candidates");
  const [loading, setLoading] = useState(false);

  const Ref = collection(db, searchCollection === "jobs" ? "jobs" : "employee");
  const searchingField =
    searchCollection === "jobs" ? "Category" : "Candidate Name";

  useEffect(() => {
    let handle = setTimeout(() => {
      if (valueToSearch.length >= 3) {
        setLoading(true);
        async function handleSearch() {
          let resultData = [];
          const q = query(Ref, where(searchingField, "==", valueToSearch));
          const querySnapshot = await getDocs(q);
          console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            resultData.push(doc.data());
          });
          console.log(resultData);
          Array.isArray(resultData) && !resultData.length
            ? setSearchResults("Nothig found")
            : setSearchResults(resultData);
          setLoading(false);
          setSearchInputValue("")
        }
        handleSearch();
      }
    }, 1000);

    return () => {
      clearTimeout(handle);
    };
  }, [searchInputValue, searchCollection]);

  function RenderSearchedResults({ searchResults }) {
    console.log(searchingField);
    return (
      <div className="search-result">
        {searchResults === "Nothig found" ? (
          <div>No results found for the search.</div>
        ) : (
          <>
            {searchResults.map((res) => {
              return (
                <Link
                  to={
                    searchCollection === "jobs"
                      ? `/jobs/${res.id}`
                      : `/candidate/${res.id}`
                  }
                      key={uuid()}
                >
                  <div className="result-line">
                    <div className="result-left-wrap">
                      <div className="result-left">
                        <div className="avatar-circel">
                          <div className="avatar-initial">
                            <span>
                              {" "}
                              {searchCollection === "jobs"
                                ? res["Position Name"][0]
                                : res["Candidate Name"][0]}
                            </span>
                          </div>
                        </div>
                        <span>
                          {searchCollection === "jobs"
                            ? res["Position Name"]
                            : res["Candidate Name"]}
                        </span>
                      </div>
                    </div>

                    <div className="result-right">
                      <span>
                        {searchCollection === "jobs"
                          ? res["Client"]
                          : res["Candidate Phone Number"]}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
    );
  }

    const handleClick = (collection) => {
      setSearchResults([])
    setSearchCollection(collection);
  };

  if (!isSearching) {
    return;
  }

  console.log(searchResults);
  return (
    <div className="searchResultWrap">
      <div className="filter">
        <div className="filter-title">
          {loading && <LinearProgress />}
          <span>Search for</span>
        </div>
    {currentUserData.type==='recruiter'?<Button
            style={
              searchCollection === "candidates"
                ? { backgroundColor: "#1976d2", color: "white" }
                : {}
            }
            variant="outlined"
            sx={{ height: "20px" }}
            onClick={() => handleClick("candidates")}
          >
            Candidates
          </Button>:null}
        <Button
          style={
            searchCollection === "jobs"
              ? { backgroundColor: "#1976d2", color: "white" }
              : {}
          }
          variant="outlined"
          sx={{ height: "20px" }}
          onClick={() => handleClick("jobs")}
        >
          Jobs
        </Button>
        <Divider />
      </div>
      <div className="results">
        {searchResults ? (
          <RenderSearchedResults searchResults={searchResults} />
        ) : (
          <div className="initial-search-tex">
            Please enter 3 characters or more
          </div>
        )}
      </div>
    </div>
  );
};

export default Searching;
