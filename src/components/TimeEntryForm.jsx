import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

const TimeEntryForm = () => {
  const [projectName, setProjectName] = useState('');
  const [activity, setActivity] = useState('');
  const [task, setTask] = useState('');
  const [weekdays, setWeekdays] = useState({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
  });

  const handleInputChange = (day, value) => {
    setWeekdays(prevState => ({
      ...prevState,
      [day]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    console.log('Submitted', {  projectName, activity, task, weekdays });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Table responsive bordered>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Activity</th>
            <th>Task</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Select
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                style={{ width: '150px' }}
              >
                
                <option value="">Select Project</option>
                <option value="Project 1">Project 1</option>
                <option value="Project 1">Project 1</option>
                <option value="Project 1">Project 1</option>
                <option value="Project 1">Project 1</option>
              </Form.Select>
            </td>
            <td>
              <Form.Select
                value={activity}
                onChange={e => setActivity(e.target.value)}
                style={{ width: '150px' }}
              >
                <option value="">Select Activity</option>
                <option value="Project 1">Project 1</option>
                <option value="Project 1">Project 1</option>
                <option value="Project 1">Project 1</option>
                <option value="Project 1">Project 1</option>
                <option value="Project 1">Project 1</option>

              </Form.Select>
            </td>
            <td>
              <Form.Control
                type="text"
                value={task}
                onChange={e => setTask(e.target.value)}
                style={{ width: '200px' }}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={weekdays.monday}
                onChange={e => handleInputChange('monday', e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={weekdays.tuesday}
                onChange={e => handleInputChange('tuesday', e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={weekdays.wednesday}
                onChange={e => handleInputChange('wednesday', e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={weekdays.thursday}
                onChange={e => handleInputChange('thursday', e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={weekdays.friday}
                onChange={e => handleInputChange('friday', e.target.value)}
                
              />
            </td>
          </tr>
        </tbody>
      </Table>
      
    </Form>
  );
};

export default TimeEntryForm;
