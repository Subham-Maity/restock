"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/redux/store";
import { useEffect } from "react";
import { selectLoggedInUser } from "@/lib/features/auth/auth-slice";
import { resetOrder } from "@/lib/features/order/order-slice";
import { resetCartAsync } from "@/lib/features/cart/cart-async-thunk";
import { useAppSelector } from "@/store/redux/useSelector";

function OrderSuccessPage() {
  const params = useParams();
  const user = useAppSelector(selectLoggedInUser);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCartAsync());
    dispatch(resetOrder());
  }, [dispatch, user]);

  if (!user) return <div></div>;
  return (
    <>
      {!params.id && <Link href="/public" replace={true}></Link>}
      <main className="grid h-fit place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold dark:text-indigo-400 text-indigo-600">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight dark:text-gray-200 text-gray-900 sm:text-5xl">
            Order Number #{params?.id}
          </h1>
          <p className="mt-6 text-base leading-7 dark:text-gray-400 text-gray-600">
            You can check your order in My Account &gt; My Orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccessPage;
