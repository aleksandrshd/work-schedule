import React, {useState} from "react";

export function EditableSpan({text, onTextChange}) {

  const [editableMode, setEditableMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const changeInputValue = (e) => {
    setInputValue(e.currentTarget.value);
  }

  const activateEditMode = () => {
    setEditableMode(true);
    setInputValue(text);
  }

  const activateViewMode = () => {
    if (inputValue.trim() !== "")
    setEditableMode(false);
    onTextChange(inputValue.trim());
  }

  const setInputValueByEnter = (e) => {
    if (e.key === "Enter") {
      activateViewMode();
    }
  }

  return editableMode ? (
    <input
      autoFocus={true}
      value={inputValue}
      onChange={changeInputValue}
      onBlur={activateViewMode}
      onKeyDown={setInputValueByEnter}
    />
  ) : (
    <span
      onDoubleClick={activateEditMode}
    >{text}</span>
  )
}