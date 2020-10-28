import React from "react";
import useClock from "../../hooks/useClock";

//chỉ show giờ thôi nên không cần truyền vào props
function Clock() {
  const { timeString } = useClock();

  return <p style={{ fontSize: "42px" }}>{timeString}</p>;
}

export default Clock;
