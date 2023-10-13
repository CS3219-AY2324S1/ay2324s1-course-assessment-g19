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
      <h2>Matching in progress...</h2>
      <p>Timer: {timer} seconds</p>

      {partnerUsername && (
        <div>
          <p>Partner: {partnerUsername}</p>
        </div>
      )}
    </div>
  );
};

export default CountUpTimerPopup;
