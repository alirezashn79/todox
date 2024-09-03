"use client";
import useDateStore from "@/stores/DateStore";
import useGuest from "@/stores/GuestStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import AllCheckTodos from "./AllCheckTodos";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import ToggleDoneTodo from "./ToggleDoneTodo";

interface ITodo {
  id: string;
  title: string;
  isDone: boolean;
  time: string;
  date: string;
}

export default function Table() {
  const date = useDateStore((state) => state.date);
  const [todosDate, setTodosDate] = useState<null | ITodo[]>(null);
  const [loading, setLoading] = useState(true);
  const [checkAll, setcheckAll] = useState(false);
  const allTodos = useGuest((state) => state.todos);

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      const isoDate = date.toISOString().split("T")[0];
      try {
        const filteredTodos = allTodos.filter((item) => item.date === isoDate);
        const result = filteredTodos.every((item: any) => item.isDone);

        setcheckAll(result);
        setTodosDate(filteredTodos);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [date, allTodos]);

  const loadingEl = (
    <div className=" max-w-lg mx-auto py-10 mt-32 flex items-center justify-center text-primary">
      <ClockLoader color="#7480ff" />
    </div>
  );

  const noTodoEl = (
    <div className=" max-w-lg mx-auto py-10 mt-32 lg:mt-20 flex flex-col items-center justify-center">
      <Image height={200} width={200} src="/img/empty.png" alt="empty" />
      <p className="text-gray-500 text-xl text-center font-semibold mt-2">
        هنوز هیچ کاری اضافه نکردی!
      </p>
    </div>
  );

  const todoEl = (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>
              <AllCheckTodos checkAll={checkAll} />
            </th>
            <th>عنوان</th>

            <th className="text-center">زمان</th>
            <th className="text-center">عملکرد ها</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {todosDate
            ?.sort(
              (a, b) =>
                (a.time.split(":")[0] as any) - (b.time.split(":")[0] as any)
            )
            .map((item) => (
              <tr key={item.id.toString()}>
                <th>
                  <ToggleDoneTodo id={item.id} isDone={item.isDone} />
                </th>
                <td className="min-w-64">{item.title}</td>

                <td className="text-center">{item.time}</td>

                <th>
                  <div className="flex items-center justify-center gap-4">
                    <EditTodo
                      _id={item.id}
                      time={item.time}
                      title={item.title}
                    />
                    <DeleteTodo id={item.id} />
                  </div>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return <>{loading ? loadingEl : !!todosDate?.length ? todoEl : noTodoEl}</>;
}
