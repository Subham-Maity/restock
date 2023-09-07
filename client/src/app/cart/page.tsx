"use client";
import Cart from "@/app/components/cart/page";
import Protected from "@/app/components/auth/components/Protected";

const Page = () => {
  return (
    <div>
      <Protected>
        <Cart />
      </Protected>
    </div>
  );
};

export default Page;
