import './App.css';
import {useEffect, useState} from "react";

function App() {

  const [month, setMonth] = useState(4);

  const [defaultSchedule, setDefaultSchedule] = useState([]);

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Петров И.А.",
      schedule: []
    },
    {
      id: 2,
      name: "Степанов Л.А.",
      schedule: []
    },
    {
      id: 3,
      name: "Семин М.С.",
      schedule: []
    },
    {
      id: 4,
      name: "Комаров К.А.",
      schedule: []
    },
    {
      id: 5,
      name: "Кириллов А.С.",
      schedule: []
    },
    {
      id: 6,
      name: "Костомаров С.Б.",
      schedule: []
    },
  ]);

  const [popupVisible, setPopupVisible] = useState(false);

  const onDayBlur = () => {
    setPopupVisible(false);
  }

  useEffect(() => {
    const getDaysInMonth = (year, month) =>
      new Date(year, month, 0).getDate();

    const getDayOfWeek = (date) => {
      const dayOfWeek = new Date(`2023-${month}-${date}`).getDay();
      return isNaN(dayOfWeek) ? null :
        ["вс", "пн", "вт", "ср", "чт", "пт", "сб"][dayOfWeek];
    }

    const daysAmount = getDaysInMonth(2023, month);

    const currentDefaultSchedule = [];
    for (let i = 1; i <= daysAmount; i++) {
      currentDefaultSchedule.push(getDayOfWeek(i) !== "сб" && getDayOfWeek(i) !== "вс" ?
        {
          dayOfMonth: i,
          dayOfWeek: getDayOfWeek(i),
          dayValue: "1"
        }
        :
        {
          dayOfMonth: i,
          dayOfWeek: getDayOfWeek(i),
          dayValue: "н",
          isWeekend: true
        });
    }

    setDefaultSchedule(currentDefaultSchedule);
  }, [month]);

  useEffect(() => {
    employees.map(employee => {
      employee.schedule = [...defaultSchedule]
    });
    setEmployees([...employees]);
  }, [defaultSchedule])

  const onMonthSelectChange = (event) => {
    setMonth(event.currentTarget.value);
  }

  return <div className="App">
    <section className="table-section">

      <select onChange={onMonthSelectChange} value={month}>
        <option>--Выберите месяц--</option>
        <option value={1} key={1}>Январь</option>
        <option value={2} key={2}>Февраль</option>
        <option value={3} key={3}>Март</option>
        <option value={4} key={4}>Апрель</option>
        <option value={5} key={5}>Май</option>
        <option value={6} key={6}>Июнь</option>
        <option value={7} key={7}>Июль</option>
        <option value={8} key={8}>Август</option>
        <option value={9} key={9}>Сентябрь</option>
        <option value={10} key={10}>Октябрь</option>
        <option value={11} key={11}>Ноябрь</option>
        <option value={12} key={12}>Декабрь</option>
      </select>

      <table className="table">
        <thead>
        <tr>
          <th className="table__cell_name"></th>
          {defaultSchedule.map(day => {
            return <th
              className={`table__cell_day ${day.isWeekend ? "table__cell_day_weekend" : ""}`}
              key={day.dayOfMonth}>{day.dayOfMonth}</th>;
          })}
        </tr>
        <tr>
          <th className="table__cell_name">Сотрудник</th>
          {defaultSchedule.map(day => {
            return <th
              className={`table__cell_day ${day.isWeekend ? "table__cell_day_weekend" : ""}`}
              key={day.dayOfMonth}
            >{day.dayOfWeek}</th>;
          })}
        </tr>
        </thead>
        <tbody>
        {
          employees.map(employee => {

              const employeeSchedule = employee.schedule.map(day => {

                  const onDayDoubleClick = (event) => {
                    console.log(event);
                    setPopupVisible(true);
                    console.log('employee.id: ', employee.id);
                    console.log('day: ', day);
                  }

                  return (
                    <td
                      className={`table__cell_day ${day.isWeekend ? "table__cell_day_weekend" : ""}`}
                      key={day.dayOfMonth}
                      onDoubleClick={onDayDoubleClick}
                      onBlur={onDayBlur}
                    >{day.dayValue}</td>
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
          {defaultSchedule.map(day => {
            return <td
              className={`table__cell_day ${day.isWeekend ? "table__cell_day_weekend" : ""}`}
              key={day.dayOfMonth}
            ></td>;
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
