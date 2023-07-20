import React, { useState, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import axios from "axios";

const TimeEntryForm = () => {
  
  const convertToISODate = (inputDate) => {
    const [month, day, year] = inputDate.split("/");
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}`;
  };
  const currentDate = convertToISODate(new Date().toLocaleDateString("en-US"));

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  const [formData, setFormData] = useState({
    id: 0,
    projectName: "",
    activity: "",
    task: "",
    hours: 0,
    dateOnly: currentDate,
  });
  const [entries, setEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log(currentDate);
    event.preventDefault();
    try {
      if (isEditing) {
        // Edit existing entry
        const response = await axios.put(
          `http://localhost:5070/Edit?id=${formData.id}`,
          formData
        );
        if (response.status === 200) {
          // Refresh the entries after successful edit
          await fetchEntries();
          // Reset the form after editing
          setFormData({
            id: 0,
            projectName: "",
            activity: "",
            task: "",
            hours: 0,
            dateOnly: currentDate,
          });
          setIsEditing(false);
        } else {
          throw new Error("Failed to edit data.");
        }
      } else {
        // Create new entry
        debugger;
        const response = await axios.post(
          "http://localhost:5070/save",
          formData
        );
        if (response.status === 200) {
          // Refresh the entries after successful save
          console.log(response.data);
          await fetchEntries();
          // Reset the form after saving
          setFormData({
            id: 0,
            projectName: "",
            activity: "",
            task: "",
            hours: 0,
            dateOnly: currentDate,
          });
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
    setFormData({
      id: entry.id,
      projectName: entry.projectName,
      activity: entry.activity,
      task: entry.task,
      hours: entry.hours,
      dateOnly: entry.dateOnly.slice(0, 10),
    });
  };

  const handleDelete = async (entryId) => {
    try {
      const response = await axios.delete(`http://localhost:5070/${entryId}`);
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
        `http://localhost:5070/readdata?date=${currentDate}`
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
    fetchEntries();
    const intervalId = setInterval(fetchEntries, 1000);
    return () => clearInterval(intervalId);
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
                <th>
                  {currentDate} {currentDay}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Control
                    as="select"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Project</option>
                    <option value="Persona Nutrition">Persona Nutrition</option>
                    <option value="Nestle Health Sciences">
                      Nestle Health Sciences
                    </option>
                    <option value="Market Central">Market Central</option>
                    <option value="Family Central">Family Central</option>
                    <option value="Internal POC">Internal POC</option>
                    <option value="External POC">External POC</option>
                    <option value="Marketing & Sales">Marketing & Sales</option>
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    as="select"
                    name="activity"
                    value={formData.activity}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Activity</option>
                    <option value="Unit Testing">Unit Testing</option>
                    <option value="Acceptance Testing">
                      Acceptance Testing
                    </option>
                    <option value="Warranty/MC">Warranty/MC</option>
                    <option value="System Testing">System Testing</option>
                    <option value="Coding/Implementation">
                      Coding/Implementation
                    </option>
                    <option value="Design">Design</option>
                    <option value="Support">Support</option>
                    <option value="Integration Testing">
                      Integration Testing
                    </option>
                    <option value="Requirements Development">
                      Requirements Development
                    </option>
                    <option value="Planning">Planning</option>
                    <option value="PTO">PTO</option>
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    name="task"
                    value={formData.task}
                    onChange={handleInputChange}
                    placeholder="Enter Task"
                    required
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    placeholder="Enter Number of Hours"
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
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.projectName}</td>
                  <td>{entry.activity}</td>
                  <td>{entry.task}</td>
                  <td>{entry.hours}</td>
                  <td>{entry.dateOnly.slice(0, 10)}</td>
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
