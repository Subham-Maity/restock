"use client";
import "./globals.css";
import React from "react";
import Login from "@/components/auth/login/login";
export default function Home() {
  return (
    <div className="mt-20 h-fit">
      <Login/>
    </div>
  );
}
