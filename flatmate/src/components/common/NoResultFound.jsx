import React from "react";
import noresult from "../../lotties/No-Result.json";
import Lottie from "react-lottie";

const lottie1 = {
  loop: true,
  autoplay: true,
  animationData: noresult,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function NoResultFound() {
  return (
    <div>
      <Lottie
        options={lottie1}
        // style="object-fit:contain; max-width:500px"
        style={{ objectFit: "contain", maxWidth: "500px" }}
      />

      <p className="text-center text-2xl px-4 -mt-20">No Result Found .</p>
    </div>
  );
}

export default NoResultFound;
