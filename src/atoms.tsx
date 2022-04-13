import { atom, selector } from "recoil";

type catregories = "TO_DO" | "DOING" | "DONE";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}
export interface ICategories {
  key: string;
  value: string;
}

export const categoryListState = atom<ICategories[]>({
  key: "categories",
  default: [
    { key: "TO_DO", value: "TO DO" },
    { key: "DOING", value: "DOING" },
    { key: "DONE", value: "DONE" },
  ],
});

export const categoryState = atom<string>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get({ get }) {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos?.filter((todo) => todo.category === category);
  },
});

export const categoryKeySelector = selector({
  key: "categoryKeySelector",
  get({ get }) {
    const categories = get(categoryListState);
    const category = get(categoryState);

    const finded_category = categories.find((cat) => cat.key === category);

    return finded_category?.key;
  },
});
export const othersCategorySelector = selector({
  key: "othersCategorySelector",
  get({ get }) {
    const categories = get(categoryListState);
    const category = get(categoryState);

    return categories.filter((cat) => cat.key !== category);
  },
});
