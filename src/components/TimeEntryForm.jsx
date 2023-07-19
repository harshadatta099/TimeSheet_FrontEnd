import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import axios from "axios";

const TimeEntryForm = () => {
  const [projectName, setProjectName] = useState("");
  const [activity, setActivity] = useState("");
  const [task, setTask] = useState("");
  const [weekdays, setWeekdays] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
  });
  const [timeEntries, setTimeEntries] = useState([]);
  const handleInputChange = (day, value) => {
    setWeekdays((prevState) => ({
      ...prevState,
      [day]: value,
    }));
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const handleDelete = (index) => {
    setTimeEntries((prevTimeEntries) => {
      const updatedEntries = [...prevTimeEntries];
      updatedEntries.splice(index, 1);
      return updatedEntries;
    });
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);

    const entryToEdit = timeEntries[index];
    setProjectName(entryToEdit.projectName);
    setActivity(entryToEdit.activity);
    setTask(entryToEdit.task);
    setWeekdays({ ...entryToEdit.weekdays });
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedEntry = {
        projectName,
        activity,
        task,
        weekdays,
      };
      setTimeEntries((prevTimeEntries) => {
        const updatedEntries = [...prevTimeEntries];
        updatedEntries[editIndex] = updatedEntry;
        return updatedEntries;
      });

      // Reset form fields and editing state
      setIsEditing(false);
      setEditIndex(null);
      setProjectName("");
      setActivity("");
      setTask("");
      setWeekdays({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      handleSaveEdit();
      return;
    }

    if (!projectName || !activity || !task) {
      alert("Please fill  project name, activity and task");
      return;
    }
    setTimeEntries((prevTimeEntries) => [
      ...prevTimeEntries,
      { projectName, activity, task, weekdays },
    ]);
    
    console.log({ projectName, activity, task, weekdays });
      // Reset form fields 
    setProjectName("");
    setActivity("");
    setTask("");
    setWeekdays({
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
    });

    setIsEditing(false); // Reset editing state
  };

  const projectOptions = [
    { value: "", label: "Select Project" },
    { value: "Persona Nutrition", label: "Persona Nutrition" },
    { value: "Puritains", label: "Puritains" },
    { value: "Nestle Health Sciences", label: "Nestle Health Sciences" },
    { value: "Market Central", label: "Market Central" },
    { value: "Family Central", label: "Family Central" },
    { value: "Internal POC", label: "Internal POC" },
    { value: "External POC", label: "External POC" },
    { value: "Marketing & Sales", label: "Marketing & Sales" },
  ];

  const activityOptions = [
    { value: "", label: "Select Activity" },
    { value: "Unit Testing", label: "Unit Testing" },
    { value: "Acceptance Testing", label: "Acceptance Testing" },
    { value: "Warranty/MC", label: "Warranty/MC" },
    { value: "System Testing", label: "System Testing" },
    { value: "coding/implementation", label: "coding/implementation" },
    { value: "Design ", label: "Design" },
    { value: "Support", label: "Support" },
    { value: "Integration Testing", label: "Integration Testing" },
    { value: "Requirement Development", label: "Requirement Development" },
    { value: "Planning", label: "Planning" },
    { value: "PTO", label: "PTO" },
  ];

  const getCurrentWeekdayDates = () => {
    const today = new Date();
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    return Array.from({ length: 5 }, (_, i) => {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() - today.getDay() + i + 1);

      const formattedDate = currentDay.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
      // console.log(formattedDate);
      return days[i] + " " + formattedDate;
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Activity</th>
              <th>Task</th>
              {Object.entries(weekdays).map(([day], index) => (
                <th key={day}>
                  <div>{getCurrentWeekdayDates()[index]}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Select
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  style={{ width: "150px" }}
                >
                  {projectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Form.Select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  style={{ width: "150px" }}
                >
                  {activityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  style={{ width: "200px" }}
                />
              </td>
              {Object.entries(weekdays).map(([day, value], index) => (
                <td key={day}>
                  <Form.Control
                    type="number"
                    value={value}
                    onChange={(e) => handleInputChange(day, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
        <Button type="submit" className="m-2">
          {isEditing ? "Save" : "Add"}
        </Button>
        {isEditing && (
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        )}
      </Form>
      {timeEntries.length > 0 && (
        <div className="mt-3">
          <Table responsive bordered>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Activity</th>
                <th>Task</th>
                {Object.entries(weekdays).map(([day, value], index) => (
                  <th key={day}>
                    <div>{getCurrentWeekdayDates()[index]}</div>
                  </th>
                ))}
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {timeEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.projectName}</td>
                  <td>{entry.activity}</td>
                  <td>{entry.task}</td>
                  {Object.values(entry.weekdays).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                  <td>
                    <Button variant="info" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default TimeEntryForm;
