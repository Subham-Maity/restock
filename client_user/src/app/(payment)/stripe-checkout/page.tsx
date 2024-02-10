import React from "react";
import StripePaymentIntent from "@/components/payments/stripe/stripe-payment-intent";
import HomeTopNav from "@/components/common/home/home-top-nav";
import UserProtected from "@/security/protected-route/user-protected";
import MarginWrapper from "@/wrapper/margin-wrapper";
import HomeFooter from "@/components/common/home/home-footer";

const Page = () => {
  return (
    <>
      <HomeTopNav />
      <UserProtected>
        <MarginWrapper>
          <StripePaymentIntent />
        </MarginWrapper>
      </UserProtected>
      <HomeFooter />
    </>
  );
};

export default Page;
