import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, othersCategorySelector, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const categories = useRecoilValue(othersCategorySelector);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("toDos", JSON.stringify(toDos));

      return newToDos;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories.map((category) => (
        <button name={category.key} onClick={onClick}>
          {category.value}
        </button>
      ))}
    </li>
  );
}

export default ToDo;
