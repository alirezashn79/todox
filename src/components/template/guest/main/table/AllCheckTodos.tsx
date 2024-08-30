"use client";
import useDateStore from "@/stores/DateStore";
import useGuest from "@/stores/GuestStore";
import useTheme from "@/stores/ThemeStore";
import client from "@/utils/client";
import { useState } from "react";
import { GridLoader, HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
interface IAllCheckProps {
  checkAll: boolean;
}
export default function AllCheckTodos({ checkAll }: IAllCheckProps) {
  const date = useDateStore((state) => state.date);
  const [loading, setLoading] = useState(false);
  const theme = useTheme((state) => state.theme);
  const setCheckAll = useGuest((state) => state.checkAll);

  const handleAllCheck = async () => {
    try {
      setLoading(true);

      setCheckAll({
        date: date.toISOString().split("T")[0],
        isCheck: !checkAll,
      });
      MySwal.fire({
        title: "Updated!",
        text: `All todos has been ${!checkAll ? "completed" : "uncompleted"}`,
        icon: "success",
        toast: true,
        showConfirmButton: false,
        timer: 1500,
        background: theme === "dark" ? "#1d232a" : undefined,
        color: theme === "dark" ? "#a6adbb" : undefined,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        // <span className="loading loading-spinner text-primary loading-md"></span>
        <HashLoader size={24} color="#7480ff" />
      ) : (
        <label>
          <input
            checked={checkAll}
            onChange={handleAllCheck}
            type="checkbox"
            className="checkbox checkbox-primary"
          />
        </label>
      )}
    </>
  );
}
