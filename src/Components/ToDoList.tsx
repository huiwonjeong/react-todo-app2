import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoryListState,
  categoryState,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const toDos2 = useRecoilValue(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const categories = useRecoilValue(categoryListState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(toDos2);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <h1>Create New Category</h1>
      <CreateCategory />
      <hr />
      <select value={category} onInput={onInput}>
        {categories.map((cat, index) => (
          <option value={cat.key} key={index}>
            {cat.value}
          </option>
        ))}
      </select>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;
