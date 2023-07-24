import React from "react";
import Header from "../components/Header";
import AddTasks from '../components/User/AddTasks';
import FetchData from '../components/User/FetchData';
import WeekData from '../components/WeekData';
const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mt-2">TimeSheet </h1>
            <div className="mt-3">
              
            <br />
              {/* <FetchData/> */}
              <FetchData />
              <br />
              {/* <WeekData/> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
