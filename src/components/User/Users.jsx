import React, { useState, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import axios from "axios";

const TimeEntryForm = () => {

  
  const [data, setData] = useState({
    id: 0,
    userName: "",
    email: "",
    task: "",
    hours: 0,
    createdDate: new Date().toISOString(),
    activityname: "",
    projectnameid: 0,
    projectname: "",
    activityid: 0,
  });

  const [entries, setEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [selectedActivityId, setSelectedActivityId] = useState(0);
  
  

  const projects = [
    "PersonaNutrition",
    "Puritains",
    "NestleHealthSciences",
    "MarketCentral",
    "FamilyCentral",
    "InternalPOC",
    "ExternalPOC",
    "Marketing&Sales",
  ];

  const activities = [
    "UnitTesting",
    "AcceptanceTesting",
    "Warranty/MC",
    "SystemTesting",
    "Coding/Implementation",
    "Design",
    "Support",
    "IntegrationTesting",
    "RequirementsDevelopment",
    "Planning",
    "PTO",
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleProjectChange = (event) => {
    const { value } = event.target;
    setSelectedProjectId(parseInt(value, 10));
    setData({ ...data, projectnameid: parseInt(value, 10) });
  };

  const handleActivityChange = (event) => {
    const { value } = event.target;
    setSelectedActivityId(parseInt(value, 10));
    setData({ ...data, activityid: parseInt(value, 10) });
  };
  useEffect(() => {
    // Fetch the username and email from localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { userName, email } = JSON.parse(storedUser);
      setData((prevData) => ({
        ...prevData,
        userName: userName,
        email: email,
      }));
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        // Edit existing entry
        const response = await axios.put(
          `http://localhost:5070/EditTask?id=${data.id}`,
          data
        );
        if (response.status === 200) {
          // Refresh the entries after successful edit
          await fetchEntries();
          // Reset the form after editing
          setData({
            id: 0,
            userName: "",
            email: "",
            task: "",
            hours: 0,
            createdDate: new Date().toISOString(),
            activityname: "",
            projectnameid: 0,
            projectname: "",
            activityid: 0,
          });
          setIsEditing(false);
        } else {
          throw new Error("Failed to edit data.");
        }
      } else {
        const selectedProject = projects[data.projectnameid];
        const selectedActivity = activities[data.activityid];

        // Create new entry
        const newData = {
          ...data,
          projectname: selectedProject,
          activityname: selectedActivity,
        };

        const response = await axios.post("http://localhost:5070/add", newData);
        if (response.status === 200) {
          await fetchEntries();

          setData({
            id: 0,
            userName: "",
            email: "",
            task: "",
            hours: 0,
            createdDate: new Date().toISOString(),
            activityname: "",
            projectnameid: 0,
            projectname: "",
            activityid: 0,
          });
          setSelectedProjectId(0);
          setSelectedActivityId(0);
        } else {
          throw new Error("Failed to save data.");
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEditEntry = (entry) => {
    setIsEditing(true);
    setData({
      id: entry.id,
      userName: entry.userName,
      email: entry.email,
      task: entry.task,
      hours: entry.hours,
      createdDate: entry.createdDate,
      activityname: entry.activityname,
      projectnameid: entry.projectnameid,
      projectname: entry.projectname,
      activityid: entry.activityid,
    });
  };

  const handleDelete = async (entryId, user) => {
    try {
      const response = await axios.delete(
        `http://localhost:5070/delete?id=${entryId}&user=${user}`
      );
      if (response.status === 200) {
        // Refresh the entries after successful delete
        await fetchEntries();
      } else {
        throw new Error("Failed to delete data.");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5070/UserData?email=${data.email}`
      );
      if (response.status === 200) {
        setEntries(response.data);
      } else {
        throw new Error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEntries();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Table bordered>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Activity</th>
                <th>Task</th>
                <th>Hours</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Control
                    as="select"
                    name="projectnameid"
                    value={selectedProjectId}
                    onChange={handleProjectChange}
                    required
                  >
                    <option value="">Select Project</option>
                    {projects.map((project, index) => (
                      <option key={index} value={index}>
                        {project}
                      </option>
                    ))}
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    as="select"
                    name="activityid"
                    value={selectedActivityId}
                    onChange={handleActivityChange}
                    required
                  >
                    <option value="">Select Activity</option>
                    {activities.map((activity, index) => (
                      <option key={index} value={index}>
                        {activity}
                      </option>
                    ))}
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    name="task"
                    value={data.task}
                    onChange={handleInputChange}
                    placeholder="Enter Task"
                    required
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    name="hours"
                    value={data.hours}
                    onChange={handleInputChange}
                    placeholder="Enter Number of Hours"
                    required
                  />
                </td>
                <td>
                  <Form.Control
                    type="date"
                    name="createdDate"
                    value={data.createdDate.slice(0, 10)}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </Table>

          <Button type="submit">{isEditing ? "Save" : "Add"}</Button>
        </Form>
        <br />
        {entries.length > 0 ? (
          <Table bordered>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Activity</th>
                <th>Task</th>
                <th>Hours</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.projectname}</td>
                  <td>{entry.activityname}</td>
                  <td>{entry.task}</td>
                  <td>{entry.hours}</td>
                  <td>{entry.createdDate.substring(0, 10)}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEditEntry(entry)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No records found.</p>
        )}
      </div>
    </>
  );
};

export default TimeEntryForm;
