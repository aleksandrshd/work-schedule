import './WorkScheduleTable.css';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Input, Select} from 'antd';
import {MoreOutlined, SearchOutlined} from "@ant-design/icons";
import {DayStatusPopup} from "../DayStatusPopup/DayStatusPopup";

export const WorkScheduleTable = ({
                                    defaultSchedule,
                                    employees,
                                    addEmployee,
                                    openPopup,
                                    setDataToUpdate,
                                    changeEmployeeName,
                                    deleteEmployee,
                                    month,
                                    onMonthSelectChange,
                                    popupVisible,
                                    closePopup,
                                    changeDayValue
                                  }) => {

  const monthsArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

  const handleMonthChange = (value) => {
    onMonthSelectChange(value);
  };

  return (
    <section className="table-section">

      <div className="table__filters-container">
        <div className="table__filter-container">
          <Input
            placeholder="Поиск"
            style={{
              width: 400,
              height: 40
            }}
            prefix={<SearchOutlined/>}
          />

          <Button
            shape={"round"}
            size={"large"}
          >Фильтры</Button>
        </div>

        <div className="table__filter-container">
          <Select
            defaultValue={monthsArray[month - 1]}
            style={{width: 200}}
            size={"large"}
            onChange={handleMonthChange}
            options={[
              {value: 1, label: 'Январь'},
              {value: 2, label: 'Февраль'},
              {value: 3, label: 'Март'},
              {value: 4, label: 'Апрель'},
              {value: 5, label: 'Май'},
              {value: 6, label: 'Июнь'},
              {value: 7, label: 'Июль'},
              {value: 8, label: 'Август'},
              {value: 9, label: 'Сентябрь'},
              {value: 10, label: 'Октябрь'},
              {value: 11, label: 'Ноябрь'},
              {value: 12, label: 'Декабрь'},
            ]}
          />

          <Select
            defaultValue="Москва"
            style={{width: 200}}
            size={"large"}
            options={[
              {value: 'Москва', label: 'Москва'},
              {value: 'Санкт-Петербург', label: 'Санкт-Петербург'},
              {value: 'Калуга', label: 'Калуга'},
            ]}
          />
        </div>
      </div>

      <table className="table">
        <thead>
        <tr>
          <td className="table__cell_name"></td>
          {defaultSchedule.map(day => {
            return <td
              className={`table__cell_day
              ${day.isWeekend ? "table__cell_day_weekend table__cell_day_red" : ""}
              `}
              key={day.dayOfMonth}
            >{day.dayOfWeek}</td>;
          })}
        </tr>
        <tr>
          <td className="table__cell_name">Сотрудник</td>
          {defaultSchedule.map(day => {
            return <td
              className={`table__cell_day
              ${day.isWeekend ? "table__cell_day_weekend table__cell_day_red" : ""}
              `}
              key={day.dayOfMonth}>{day.dayOfMonth}</td>;
          })}
        </tr>
        </thead>
        <tbody>
        {
          employees.map(employee => {

              const employeeSchedule = employee.schedule.map(day => {

                  const onDayClick = (event) => {
                    day.isClicked = true;
                    setDataToUpdate(employee.id, day);
                    if (!event.ctrlKey) {
                      openPopup();
                    }
                  }

                  const onKeyUp = () => {
                    openPopup();
                  }

                  return (
                    <td
                      className={`table__cell_day
                      ${day.isWeekend ? "table__cell_day_weekend" : ""}
                      ${day.isClicked ? "table__cell_day_clicked" : ""}
                      ${day.dayValue === "о" ? "table__cell_day_vacation" : ""}
                      ${day.dayValue === "б" ? "table__cell_day_disease" : ""}
                      ${day.dayValue === "у" ? "table__cell_day_fired" : ""}
                      `}
                      key={day.dayOfMonth}
                      onClick={onDayClick}
                    >
                      <input
                        className="table__input"
                        onKeyUp={onKeyUp}
                        value={day.dayValue}
                        readOnly={true}
                      />
                    </td>
                  )
                }
              )

              const onNameChange = (newName) => {
                changeEmployeeName(newName, employee.id);
              }

              const onDeleteBtnClick = () => {
                deleteEmployee(employee.id);
              }

              return (
                <tr>
                  <td className="table__cell_name">
                    <div className="table__name-container">
                      <EditableSpan
                        text={employee.name}
                        onTextChange={onNameChange}
                      />
                      <Button
                        shape="circle"
                        icon={<MoreOutlined/>}
                        size={"middle"}
                        style={{border: "none"}}
                        onClick={onDeleteBtnClick}
                      />
                    </div>
                  </td>
                  {employeeSchedule}
                </tr>
              );
            }
          )
        }
        </tbody>
        <tfoot>
        <tr>
          <td className="table__cell_name">
            <button
              className="table__add-btn"
              onClick={addEmployee}
            >+ Добавить сотрудника
            </button>
          </td>
          {defaultSchedule.map(day => {
            return <td
              className={`table__cell_day ${day.isWeekend ? "table__cell_day_weekend" : ""}`}
              key={day.dayOfMonth}
            ></td>;
          })}
        </tr>
        </tfoot>
      </table>

      <DayStatusPopup
        popupVisible={popupVisible}
        closePopup={closePopup}
        changeDayValue={changeDayValue}
      />

    </section>
  );
}