"use client";

export type ActivityType = "Tarbiyyat" | "Tabligh" | "Visits" | "Admin";

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  description: string;
  location: string;
  date: string;
  isRecurring: boolean;
}

// Initial mock data
const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Friday Sermon Preparation",
    type: "Tarbiyyat",
    description: "Preparing notes for the upcoming Friday sermon.",
    location: "Mission House",
    date: new Date().toISOString(),
    isRecurring: true,
  },
  {
    id: "2",
    title: "Meeting with Local Chapter",
    type: "Tabligh",
    description: "Discussing strategies for Tabligh events.",
    location: "Community Center",
    date: new Date(Date.now() + 86400000).toISOString(),
    isRecurring: false,
  },
];

let globalActivities = [...mockActivities];

// Very simple mock store (since it's purely frontend right now)
// Will use properly with state or context later, but exporting helpers for now.
export function getActivities() {
  return globalActivities;
}

export function addActivity(activity: Activity) {
  globalActivities.push(activity);
}
