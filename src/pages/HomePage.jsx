import React from "react";
import Header from "../components/Header";
import AddTasks from '../components/User/AddTasks';
import FetchData from '../components/User/FetchData';
import GetData from '../components/User/EditDeleteData';
import WeekData from '../components/WeekData';
import EditDeleteData from '../components/User/EditDeleteData';
const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mt-2">TimeSheet </h1>
            <div className="mt-3">
              <AddTasks/>
            <br />
              <FetchData/>
              
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
