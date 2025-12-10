"use client";

import { useState, useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';

type CountdownTimerProps = {
  // No props needed as it will get state from Firestore
};

type TimeUnit = "Days" | "Hours" | "Minutes" | "Seconds";

interface TimerState {
  startTime: number;
  duration: number;
  paused: boolean;
}

const calculateTimeLeft = (timerState: TimerState | null) => {
  if (!timerState || timerState.paused) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const now = new Date().getTime();
  const endTime = timerState.startTime + timerState.duration;
  const difference = endTime - now;

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const TimeCard = ({ value, unit }: { value: number; unit: TimeUnit }) => (
  <div className="flex flex-col items-center">
    <div className="text-4xl md:text-6xl font-bold text-primary tracking-tighter w-24 h-24 flex items-center justify-center bg-primary/10 rounded-lg">
      {String(value).padStart(2, '0')}
    </div>
    <div className="text-sm md:text-base font-medium text-muted-foreground mt-2">{unit}</div>
  </div>
);

export function CountdownTimer({}: CountdownTimerProps) {
  const firestore = useFirestore();
  const timerStateRef = useMemoFirebase(() => 
    firestore ? doc(firestore, 'timer_state', 'main-timer') : null
  , [firestore]);
  
  const { data: timerState, isLoading } = useDoc<TimerState>(timerStateRef);
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (isLoading || !timerState) {
      // While loading or if no timer state exists, show all zeros
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    };
    
    // Set initial time left
    setTimeLeft(calculateTimeLeft(timerState));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(timerState));
    }, 1000);

    return () => clearInterval(timer);
  }, [timerState, isLoading]);


  if (isLoading) {
    return (
        <div className="flex items-center justify-center space-x-2 md:space-x-4 my-8">
            <TimeCard value={0} unit="Days" />
            <TimeCard value={0} unit="Hours" />
            <TimeCard value={0} unit="Minutes" />
            <TimeCard value={0} unit="Seconds" />
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2 md:space-x-4 my-8">
      <TimeCard value={timeLeft.days} unit="Days" />
      <TimeCard value={timeLeft.hours} unit="Hours" />
      <TimeCard value={timeLeft.minutes} unit="Minutes" />
      <TimeCard value={timeLeft.seconds} unit="Seconds" />
    </div>
  );
}
