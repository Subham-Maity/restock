import React from "react";
import { Alert, Spin } from "antd";

const AntdDefaultSpin = () => {
  return (
    <div className="dark:bg-gray-700 h-[660px] bg-cover">
      <Spin tip="Let's go!">
        <Alert
          message="Here is the data"
          description="We are on the way to get the data"
          type="info"
        />
      </Spin>
    </div>
  );
};

export default AntdDefaultSpin;
