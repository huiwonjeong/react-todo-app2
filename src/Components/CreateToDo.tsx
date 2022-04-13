import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryKeySelector, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryKeySelector);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: category ?? "" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  localStorage.setItem("toDos", JSON.stringify(toDos));
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write a to do" })}
        placeholder="Write to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
