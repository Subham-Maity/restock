import "./globals.css";
import Banner from "@/app/components/Navbar/Banner/Home/Banner";
import Navbar from "@/app/components/Navbar/Navbar";
import React from "react";
import OurFacts from "@/app/components/siteStats/SiteStats";
import Footer from "@/app/components/Footer/Footer";
import { PcComponentProductList } from "@/app/components/products/pages/pc-components/ProductList";

function Loading() {
    return (
        <>
            loading .....
            <div className="">
                <main className="">
                    <Navbar />
                    <Banner />
                    <PcComponentProductList />
                    <OurFacts />
                </main>
            </div>
        </>
    );
}

export default Loading;