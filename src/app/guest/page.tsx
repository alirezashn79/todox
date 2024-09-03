import Table from "@/components/template/guest/main/table/Table";
import Navbar from "@/components/template/guest/navbar/Navbar";
import NavigationDate from "@/components/template/index/NavigationDate";
import { isAuth } from "@/utils/serverHelpers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await isAuth();
  if (user) {
    return redirect("/");
  }

  return (
    <div className="container">
      <main>
        <Navbar />
        <div className="text-warning pt-2 leading-3 text-xs md:text-sm flex items-center gap-2">
          <div>
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
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          <p>
            داده های شما محافظت نشده اند، برای حفظ داده ها به صورت دائمی
            <Link
              href="/auth/login-register"
              className=" btn px-1 text-warning btn-link"
            >
              ثبت نام
            </Link>
            کنید. داده های موقت شما به حسابتان منتقل خواهد شد
          </p>
        </div>
        <section className="mt-8">
          <NavigationDate />
          <div className="mt-10">
            <Table />
          </div>
        </section>
      </main>
    </div>
  );
}
