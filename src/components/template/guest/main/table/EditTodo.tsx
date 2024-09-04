"use client";
import Input from "@/components/modules/input";
import { zTodoSchemaClient } from "@/schemas/schema";
import useGuest from "@/stores/GuestStore";
import useTheme from "@/stores/ThemeStore";
import {
  convertToPersianTimeWithEnglishNumbers,
  timeStringToDate,
} from "@/utils/clientHelpers";
import { FireToast } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "cn-func";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { TypeOf } from "zod";

type TTodo = TypeOf<typeof zTodoSchemaClient>;

interface IEditTodoProps {
  _id: string;
  title: string;
  time: string;
}

export default function EditTodo({ _id, time, title }: IEditTodoProps) {
  const modalEdit = useRef<any>(null);
  const theme = useTheme((state) => state.theme);
  const [TimeValue, setTimeValue] = useState<Date | null>(
    !!time ? timeStringToDate(time) : null
  );
  // const [timeError, setTimeError] = useState<null | string>(null);
  const setEditTodo = useGuest((state) => state.editTodo);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TTodo>({
    defaultValues: {
      title,
    },
    resolver: zodResolver(zTodoSchemaClient),
  });

  const addTodoHandler: SubmitHandler<TTodo> = async (values) => {
    try {
      setEditTodo({
        id: _id,
        time: !!TimeValue
          ? convertToPersianTimeWithEnglishNumbers(TimeValue)
          : "",
        title: values.title,
      });

      modalEdit.current.close();
      FireToast({ type: "success", message: "تغییرات اعمال شد" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={() => modalEdit.current.showModal()}
        className="text-info"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>
      <dialog
        ref={modalEdit}
        className="modal modal-bottom sm:modal-middle font-normal"
      >
        <div className="modal-box !h-auto">
          <h3 className="font-bold text-lg">ویرایش</h3>
          <form onSubmit={handleSubmit(addTodoHandler)}>
            <div className="modal-middle space-y-4 mt-8">
              <Input
                name="title"
                register={register("title")}
                label="عنوان"
                errors={errors}
                placeholder="عنوان رو وارد کن"
              />

              <div className="form-control">
                <label className="label">
                  <span className="label-text">زمان</span>
                </label>
                <DatePicker
                  value={TimeValue}
                  calendarPosition="top-center"
                  onChange={(e) => setTimeValue(e?.toDate() as any)}
                  disableDayPicker
                  format="HH:mm"
                  className={theme === "dark" ? "bg-dark" : ""}
                  plugins={[<TimePicker hideSeconds />]}
                  render={(_, openCalendar) => (
                    <input
                      value={TimeValue?.toLocaleTimeString("fa-ir", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      readOnly
                      onClick={openCalendar}
                      type="text"
                      className={cn("input input-bordered w-full")}
                      placeholder="Time"
                    />
                  )}
                />
              </div>

              <button
                className="absolute bottom-6 end-28 btn btn-primary"
                type="submit"
                disabled={
                  isSubmitting || (watch("title") === title && !TimeValue)
                }
              >
                ویرایش
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">بستن</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
