"use client";
import React, { useEffect } from "react";

import BgAdminTailwindWrapper from "@/wrapper/admin-bg-wrapper";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannerApiAsync } from "@/lib/features/banner/banner-async-thunk";
import { AppDispatch } from "@/store/redux/store";

function UpdateBanner(props: any) {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBannerApiAsync());
  }, []);
  let image = useSelector((state: any) => state.banner.images);
  return (
    <BgAdminTailwindWrapper>
      {image}
      <div>
        <input
          type="text"
          className="w-full"
          placeholder="Enter your banner image url here"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <input
          type="text"
          className="w-full"
          placeholder="Enter your banner image url here"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <input
          type="text"
          className="w-full"
          placeholder="Enter your banner image url here"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <input
          type="text"
          className="w-full"
          placeholder="Enter your banner image url here"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <input
          type="text"
          className="w-full"
          placeholder="Enter your banner image url here"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </BgAdminTailwindWrapper>
  );
}

export default UpdateBanner;
