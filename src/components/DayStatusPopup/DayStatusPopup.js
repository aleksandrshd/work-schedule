export const DayStatusPopup = ({popupVisible, closePopup, changeDayValue}) => {

  const onClick = (event) => {
    event.preventDefault();
    const dayValue = event.target.value;
    changeDayValue(dayValue);
  }

  return (
    <section className={popupVisible ? "popup popup__visible" : "popup"}>
      <form
        className="popup__form"
        onClick={onClick}
        autoFocus={true}
        onBlur={closePopup}
      >
        <button
          className="popup__button"
          value="1"
        >Рабочий день</button>
        <button
          className="popup__button"
          value="н"
        >Выходной</button>
        <button
          className="popup__button"
          value="о"
        >Отпуск</button>
        <button
          className="popup__button"
          value="б"
        >Больничный</button>
        <button
          className="popup__button"
          value="у"
        >Увольнение</button>
      </form>
    </section>
  );
}