import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startTimer, stopTimer } from "../redux-toolkit/taskSlice";

const TaskTimer = ({ task }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(task.timeSpent || 0);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    dispatch(startTimer(task.id));
    setIsRunning(true);
  };

  const handleStop = () => {
    dispatch(stopTimer(task.id));
    setIsRunning(false);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="mt-4">
      <p className="text-sm font-bold">Time Spent: {formatTime(time)}</p>
      <div className="mt-2 flex gap-2">
        {isRunning ? (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleStop}
          >
            Stop Timer
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleStart}
          >
            Start Timer
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskTimer;