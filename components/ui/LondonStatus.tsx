"use client";

import React from "react";

interface LondonStatusProps {
  location?: string;
  temperatureC?: number;
  time?: string;
}

const londonTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/London",
});

const londonHourFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  hour12: false,
  timeZone: "Europe/London",
});

const getGreeting = (hourInLondon: number) => {
  if (hourInLondon >= 5 && hourInLondon < 12) return "Good Morning";
  if (hourInLondon >= 12 && hourInLondon < 17) return "Good Afternoon";
  if (hourInLondon >= 17 && hourInLondon < 22) return "Good Evening";
  return "Good night";
};

export default function LondonStatus({
  location = "London",
  temperatureC = 18,
  time: providedTime,
}: LondonStatusProps) {
  const [time, setTime] = React.useState("");
  const [greeting, setGreeting] = React.useState("Good Morning");

  React.useEffect(() => {
    const updateLondonStatus = () => {
      const now = new Date();
      const londonHour = Number.parseInt(londonHourFormatter.format(now), 10);
      setGreeting(getGreeting(londonHour));
      setTime(londonTimeFormatter.format(now));
    };

    updateLondonStatus();
    const intervalId = window.setInterval(updateLondonStatus, 15000);
    return () => window.clearInterval(intervalId);
  }, []);

  const displayTime = providedTime ?? time;

  return (
    <div className="flex items-center gap-3.5 text-right">
      <span>{greeting}</span>
      <span>{location}</span>
      <span>{temperatureC}°C</span>
      <span>{displayTime}</span>
    </div>
  );
}
