import './App.css';
import {useState} from "react";

const monthDatesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

const monthDaysArray = ["пн", "вт", "ср", "чт", "пт", "сб", "вс", "пн", "вт", "ср", "чт", "пт", "сб", "вс", "пн", "вт", "ср", "чт", "пт", "сб", "вс", "пн", "вт", "ср", "чт", "пт", "сб", "вс", "пн", "вт", "ср"];

function App() {

  const [employees, setEmployees] = useState([
    {
      id: "00001",
      name: "Петров И.А.",
      schedule: [{1: "1"}, {2: "1"}, {3: "1"}, {4: "1"}, {5: "1"}, {6: "н"}, {7: "н"}, {8: "1"}, {9: "1"}, {10: "1"}, {11: "1"}, {12: "1"}, {13: "н"}, {14: "н"}, {15: "1"}, {16: "1"}, {17: "1"}, {18: "1"}, {19: "1"}, {20: "н"}, {21: "н"}, {22: "1"}, {23: "1"}, {24: "1"}, {25: "1"}, {26: "1"}, {27: "н"}, {28: "н"}, {29: "1"}, {30: "1"}, {31: "у"}]
    },
    {
      id: "00002",
      name: "Степанов Л.А.",
      schedule: [{1: "1"}, {2: "1"}, {3: "1"}, {4: "1"}, {5: "1"}, {6: "н"}, {7: "н"}, {8: "1"}, {9: "1"}, {10: "1"}, {11: "1"}, {12: "1"}, {13: "н"}, {14: "н"}, {15: "1"}, {16: "1"}, {17: "1"}, {18: "1"}, {19: "1"}, {20: "н"}, {21: "н"}, {22: "1"}, {23: "1"}, {24: "1"}, {25: "1"}, {26: "1"}, {27: "н"}, {28: "н"}, {29: "1"}, {30: "1"}, {31: "1"}]
    },
    {
      id: "00003",
      name: "Семин М.С.",
      schedule: [{1: "1"}, {2: "1"}, {3: "1"}, {4: "1"}, {5: "1"}, {6: "н"}, {7: "н"}, {8: "1"}, {9: "1"}, {10: "1"}, {11: "1"}, {12: "1"}, {13: "н"}, {14: "н"}, {15: "о"}, {16: "о"}, {17: "о"}, {18: "1"}, {19: "1"}, {20: "н"}, {21: "н"}, {22: "1"}, {23: "1"}, {24: "1"}, {25: "1"}, {26: "1"}, {27: "н"}, {28: "н"}, {29: "1"}, {30: "1"}, {31: "1"}]
    },
    {
      id: "00004",
      name: "Комаров К.А.",
      schedule: [{1: "1"}, {2: "1"}, {3: "1"}, {4: "1"}, {5: "1"}, {6: "н"}, {7: "н"}, {8: "1"}, {9: "1"}, {10: "1"}, {11: "1"}, {12: "1"}, {13: "н"}, {14: "н"}, {15: "1"}, {16: "1"}, {17: "1"}, {18: "1"}, {19: "1"}, {20: "н"}, {21: "н"}, {22: "1"}, {23: "1"}, {24: "1"}, {25: "1"}, {26: "1"}, {27: "н"}, {28: "н"}, {29: "1"}, {30: "1"}, {31: "1"}]
    },
    {
      id: "00005",
      name: "Кириллов А.С.",
      schedule: [{1: "1"}, {2: "1"}, {3: "1"}, {4: "1"}, {5: "1"}, {6: "н"}, {7: "н"}, {8: "1"}, {9: "1"}, {10: "1"}, {11: "1"}, {12: "1"}, {13: "н"}, {14: "н"}, {15: "1"}, {16: "1"}, {17: "1"}, {18: "1"}, {19: "1"}, {20: "н"}, {21: "н"}, {22: "1"}, {23: "1"}, {24: "1"}, {25: "1"}, {26: "1"}, {27: "н"}, {28: "н"}, {29: "1"}, {30: "1"}, {31: "1"}]
    },
    {
      id: "00006",
      name: "Костомаров С.Б.",
      schedule: [{1: "1"}, {2: "1"}, {3: "1"}, {4: "1"}, {5: "1"}, {6: "н"}, {7: "н"}, {8: "1"}, {9: "1"}, {10: "1"}, {11: "1"}, {12: "1"}, {13: "н"}, {14: "н"}, {15: "1"}, {16: "1"}, {17: "1"}, {18: "1"}, {19: "1"}, {20: "н"}, {21: "н"}, {22: "1"}, {23: "1"}, {24: "1"}, {25: "1"}, {26: "1"}, {27: "н"}, {28: "н"}, {29: "1"}, {30: "1"}, {31: "1"}]
    },
  ]);

  const [popupVisible, setPopupVisible] = useState(false);

  const onDayBlur = () => {
    setPopupVisible(false);
  }

  return <div className="App">
    <section className="table-section">
      <table className="table">
        <thead>
        <tr>
          <th className="table__cell_name"></th>
          {monthDaysArray.map((day, index) => {
            return <th className="table__cell_day" key={index}>{day}</th>;
          })}
        </tr>
        <tr>
          <th className="table__cell_name">Сотрудник</th>
          {monthDatesArray.map((day, index) => {
            return <th className="table__cell_day" key={index}>{day}</th>;
          })}
        </tr>
        </thead>
        <tbody>
        {
          employees.map((employee, index) => {

              const employeeSchedule = employee.schedule.map((day, index) => {

                  const onDayDoubleClick = (event) => {
                    console.log(event);
                    setPopupVisible(true);
                    console.log('employee.id: ', employee.id);
                    console.log('day: ', day);
                  }

                  return (
                    <td
                      className="table__cell_day"
                      key={index}
                      onDoubleClick={onDayDoubleClick}
                      onBlur={onDayBlur}
                    >{day[index + 1]}</td>
                  )
                }
              )
              return (
                <tr>
                  <td className="table__cell_name">{employee.name}</td>
                  {employeeSchedule}
                </tr>
              );
            }
          )
        }
        </tbody>
        <tfoot>
        <tr>
          <td className="table__cell_name">Добавить сотрудника</td>
          {monthDaysArray.map((day, index) => {
            return <td className="table__cell_day" key={index}></td>;
          })}
        </tr>
        </tfoot>
      </table>
    </section>

    <section className={popupVisible ? "popup popup__visible" : "popup"}>
      <form className="popup__form">
        <button className="popup__button">Рабочий день</button>
        <button className="popup__button">Выходной</button>
        <button className="popup__button">Отпуск</button>
        <button className="popup__button">Больничный</button>
        <button className="popup__button">Увольнение</button>
      </form>
    </section>

  </div>;
}

export default App;
