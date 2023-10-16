import './App.css';
import {useState} from "react";
import {useWorkScheduleGenerator} from "./hooks/useWorkScheduleGenerator";
import {WorkScheduleTable} from "./components/WorkScheduleTable/WorkScheduleTable";
import {v1} from "uuid";
import {Header} from "./components/Header/Header";

function App() {

  const {month, setMonth, defaultSchedule, employees, setEmployees} = useWorkScheduleGenerator();

  const [popupVisible, setPopupVisible] = useState(false);

  const [employeeDataToUpdate, setEmployeeDataToUpdate] = useState([]);

  const onMonthSelectChange = (value) => {
    setMonth(value);
  }

  const addEmployee = () => {
    const newEmployee =
      {
        id: v1(),
        name: "Новый сотрудник",
        schedule: [...defaultSchedule]
      };
    employees.push(newEmployee);
    setEmployees([...employees]);
    console.log('employees', employees);
  }

  const setDataToUpdate = (employeeId, day) => {
    setEmployeeDataToUpdate([...employeeDataToUpdate, {id: employeeId, day: day}]);
    console.log('employeeDataToUpdate', employeeDataToUpdate);
  }

  const changeDayValue = (dayValue) => {
    employeeDataToUpdate.map(data => {
      const employeeToUpdate = employees.find(
        employee => employee.id === data.id
      );
      employeeToUpdate.schedule[data.day.dayOfMonth - 1].dayValue = dayValue;
      employeeToUpdate.schedule[data.day.dayOfMonth - 1].isClicked = false;
      setEmployees([...employees]);
    })
    setEmployeeDataToUpdate([]);
    closePopup();
  }

  const changeEmployeeName = (newName, employeeId) => {
    const employeeToUpdate = employees.find(employee => employee.id === employeeId);
    employeeToUpdate.name = newName;
    setEmployees([...employees]);
    console.log('employees', employees);
  }

  const deleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    setEmployees([...updatedEmployees]);
    console.log('employees', employees);
  }

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

  return <div className="App">

    <div className="main-menu"/>

    <div className="app-container">
      <Header/>

      <WorkScheduleTable
        month={month}
        onMonthSelectChange={onMonthSelectChange}
        defaultSchedule={defaultSchedule}
        employees={employees}
        addEmployee={addEmployee}
        openPopup={openPopup}
        setDataToUpdate={setDataToUpdate}
        changeEmployeeName={changeEmployeeName}
        deleteEmployee={deleteEmployee}
        popupVisible={popupVisible}
        closePopup={closePopup}
        changeDayValue={changeDayValue}
      />
    </div>

  </div>;
}

export default App;
