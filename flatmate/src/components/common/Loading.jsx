import React from "react";
import loading from "../../lotties/Loading.json";
import Lottie from "react-lottie";
function Loading() {
  const lottie3 = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie
        options={lottie3}
        style={{ objectFit: "contain", maxWidth: "500px" }}
      />
    </div>
  );
}

export default Loading;
