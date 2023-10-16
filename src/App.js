import './App.css';
import {useState} from "react";
import {MonthSelector} from "./components/MonthSelector/MonthSelector";
import {useWorkScheduleGenerator} from "./hooks/useWorkScheduleGenerator";
import {WorkScheduleTable} from "./components/WorkScheduleTable/WorkScheduleTable";
import {DayStatusPopup} from "./components/DayStatusPopup/DayStatusPopup";
import {v1} from "uuid";

function App() {

  const {month, setMonth, defaultSchedule, employees, setEmployees} = useWorkScheduleGenerator();

  const [popupVisible, setPopupVisible] = useState(false);

  const [employeeDataToUpdate, setEmployeeDataToUpdate] = useState({});

  const onMonthSelectChange = (event) => {
    setMonth(event.currentTarget.value);
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
    setEmployeeDataToUpdate({id:employeeId, day:day});
  }

   const changeDayValue = (dayValue) => {
     const employeeToUpdate = employees.find(
       employee => employee.id === employeeDataToUpdate.id
     );
     employeeToUpdate.schedule[employeeDataToUpdate.day.dayOfMonth - 1].dayValue = dayValue;
     setEmployees([...employees]);
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

    <MonthSelector
      month={month}
      onMonthSelectChange={onMonthSelectChange}
    />

    <WorkScheduleTable
      defaultSchedule={defaultSchedule}
      employees={employees}
      addEmployee={addEmployee}
      openPopup={openPopup}
      setDataToUpdate={setDataToUpdate}
      changeEmployeeName={changeEmployeeName}
      deleteEmployee={deleteEmployee}

    />

    <DayStatusPopup
      popupVisible={popupVisible}
      closePopup={closePopup}
      changeDayValue={changeDayValue}
    />

  </div>;
}

export default App;
