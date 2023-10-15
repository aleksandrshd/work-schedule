import {EditableSpan} from "../EditableSpan/EditableSpan";

export const WorkScheduleTable = ({defaultSchedule,
                                    employees,
                                    addEmployee,
                                    openPopup,
                                    setDataToUpdate,
                                    changeEmployeeName,
                                    deleteEmployee}) => {
  return (
    <section className="table-section">
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

                  const onDayDoubleClick = () => {
                    setDataToUpdate(employee.id, day);
                    openPopup();
                  }

                  return (
                    <td
                      className={`table__cell_day ${day.isWeekend ? "table__cell_day_weekend" : ""}`}
                      key={day.dayOfMonth}
                      onDoubleClick={onDayDoubleClick}
                    >{day.dayValue}</td>
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
                    <EditableSpan
                      text={employee.name}
                      onTextChange={onNameChange}
                    />
                    <button
                    onClick={onDeleteBtnClick}
                    >x</button>
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
            <button onClick={addEmployee}>Добавить сотрудника
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
    </section>
  );
}