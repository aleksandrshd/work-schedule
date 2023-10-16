import {useEffect, useState} from "react";
import {v1} from "uuid";
import _ from "lodash";

export const useWorkScheduleGenerator = () => {

  const currentDate = new Date();

  const currentMonth = currentDate.getMonth() + 1;

  const [month, setMonth] = useState(currentMonth);

  const [defaultSchedule, setDefaultSchedule] = useState([]);

  const [employees, setEmployees] = useState([
    {
      id: v1(),
      name: "Петров И.А.",
      schedule: []
    },
    {
      id: v1(),
      name: "Степанов Л.А.",
      schedule: []
    },
    {
      id: v1(),
      name: "Семин М.С.",
      schedule: []
    },
    {
      id: v1(),
      name: "Комаров К.А.",
      schedule: []
    },
    {
      id: v1(),
      name: "Кириллов А.С.",
      schedule: []
    },
    {
      id: v1(),
      name: "Костомаров С.Б.",
      schedule: []
    },
  ]);

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
          dayValue: "1",
          isWeekend: false
        }
        :
        {
          dayOfMonth: i,
          dayOfWeek: getDayOfWeek(i),
          dayValue: "н",
          isWeekend: true
        });
    }

    setDefaultSchedule([...currentDefaultSchedule]);
  }, [month]);

  useEffect(() => {
    employees.map(employee => {
      const deepDefaultScheduleCopy = _.cloneDeep(defaultSchedule);
      employee.schedule = [...deepDefaultScheduleCopy];
    });
    setEmployees([...employees]);
  }, [defaultSchedule]);

  return {month, setMonth, defaultSchedule, employees, setEmployees};
}