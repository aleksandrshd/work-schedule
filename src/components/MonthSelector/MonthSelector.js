export const MonthSelector = ({month, onMonthSelectChange}) => {
  return (
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
  );
}