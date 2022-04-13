import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryListState } from "../atoms";

interface IForm {
  category: string;
}

export function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [categories, setCategories] = useRecoilState(categoryListState);
  const onValid = ({ category }: IForm) => {
    setCategories((oldCats) => [
      ...oldCats,
      { value: category, key: category.toUpperCase().replaceAll(" ", "_") },
    ]);
    setValue("category", "");
  };
  localStorage.setItem("categories", JSON.stringify(categories));
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("category")} placeholder="Write a new category" />
      <button>Add</button>
    </form>
  );
}
export default CreateCategory;
