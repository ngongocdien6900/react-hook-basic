import React from "react";
import useClock from "../../hooks/useClock";
import './BetterClock.scss';

//chỉ show giờ thôi nên không cần truyền vào props
function BetterClock() {
  const { timeString } = useClock();

  return (
    <div className="better-clock">
      <p className="better-clock__time">{timeString}</p>
    </div>
  );
}

export default BetterClock;
