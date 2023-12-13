"use client";
import React, {useEffect} from 'react';
import {fetchBannerApiAsync} from "@/lib/features/Banner/bannerSlice";
import BgAdminTailwindWrapper from "@/lib/wrapper/AdminPannel/BgTailwindWrapper";
import {useDispatch, useSelector} from "react-redux";

function UpdateBanner(props:any) {
    const dispatch = useDispatch();
    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchBannerApiAsync());
    },[])
    let image=useSelector((state:any)=>state.banner.images);
    return (
            <BgAdminTailwindWrapper>
                {image}
                <div>
                    <input type="text" className="w-full" placeholder="Enter your banner image url here" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <input type="text" className="w-full" placeholder="Enter your banner image url here" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <input type="text" className="w-full" placeholder="Enter your banner image url here" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <input type="text" className="w-full" placeholder="Enter your banner image url here" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <input type="text" className="w-full" placeholder="Enter your banner image url here" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </BgAdminTailwindWrapper>

    );
}

export default UpdateBanner;