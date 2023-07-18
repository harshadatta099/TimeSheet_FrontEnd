import React from "react";
import Header from "../components/Header";
import TimeTrackerApp from "../components/TimeEntryForm";
import TimeEntryForm from "../components/TimeEntryForm";
const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mt-2">TimeSheet </h1>
            <div className="mt-3">
              <TimeTrackerApp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
