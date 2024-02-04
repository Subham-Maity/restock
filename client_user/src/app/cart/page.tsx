"use client";

import Cart from "@/components/cart/cart";

import HomeFooter from "@/components/common/home/home-footer";
import MarginWrapper from "@/wrapper/margin-wrapper";
import HomeTopNav from "@/components/common/home/home-top-nav";
import UserProtected from "@/security/protected-route/user-protected";

const CartPage = () => {
  return (
    <UserProtected>
      <HomeTopNav />
      <MarginWrapper>
        <Cart />
      </MarginWrapper>
      <HomeFooter />
    </UserProtected>
  );
};

export default CartPage;
