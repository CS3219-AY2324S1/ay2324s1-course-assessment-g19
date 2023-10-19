import React, { useState, useEffect } from "react";

interface CountUpTimerPopupProps {
  timer: number;
  partnerUsername?: string;
}

const CountUpTimerPopup: React.FC<CountUpTimerPopupProps> = ({
  timer,
  partnerUsername,
}) => {
  return (
    <div className="count-up-timer-popup">
      {partnerUsername ? (
        <>
          <h2>Matched!</h2>
          <p>Partner: {partnerUsername}</p>
        </>
      ) : (
        <>
          <h2>Matching in progress...</h2>
          <p>Timer: {timer} seconds</p>
        </>
      )}
    </div>
  );
};

export default CountUpTimerPopup;
