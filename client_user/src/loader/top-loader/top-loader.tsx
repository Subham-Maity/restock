"use client";
import React from "react";
import NextTopLoader from "nextjs-toploader";

const TopLoader = ({
  children,
  isLoading = true,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) => {
  return (
    <div>
      {isLoading && (
        <NextTopLoader
          color="linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div>
                    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
      )}

      {children}
    </div>
  );
};

export default TopLoader;
