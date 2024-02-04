import React from "react";
import { Spin } from "antd";

const AntdDefaultSpin = () => {
  return (
    <div className="dark:bg-gray-700 h-[660px] bg-cover">
      <Spin tip="Let's go!"></Spin>
    </div>
  );
};

export default AntdDefaultSpin;
