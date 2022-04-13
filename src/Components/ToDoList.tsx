import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  const [category, setCategory] = useRecoilState(categoryState);
  const categories = useRecoilValue(categoryListState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const setToDos = useSetRecoilState(toDoState);
  const setCategories = useSetRecoilState(categoryListState);
  const storedToDos = JSON.parse(localStorage.getItem("toDos") as string);
  const storedCategories = JSON.parse(
    localStorage.getItem("categories") as string
  );
  setToDos(storedToDos);
  setCategories(storedCategories);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <h1>Create New Category</h1>
      <CreateCategory />
      <hr />
      <select value={category} onInput={onInput}>
        {categories?.map((cat, index) => (
          <option value={cat.key} key={index}>
            {cat.value}
          </option>
        ))}
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;
