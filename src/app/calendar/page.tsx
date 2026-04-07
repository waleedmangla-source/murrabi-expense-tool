"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getActivities } from "@/lib/store";

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Map our activities to FullCalendar event format
    const activities = getActivities();
    const mappedEvents = activities.map((activity) => {
      let color = "#3b82f6"; // blue (default)
      if (activity.type === "Tarbiyyat") color = "#10b981"; // green
      else if (activity.type === "Tabligh") color = "#f59e0b"; // amber
      else if (activity.type === "Visits") color = "#ec4899"; // pink
      else if (activity.type === "Admin") color = "#6366f1"; // indigo

      return {
        id: activity.id,
        title: activity.title,
        start: activity.date,
        allDay: true, // simplified for MVP
        backgroundColor: color,
        borderColor: color,
        extendedProps: {
          location: activity.location,
          description: activity.description,
          type: activity.type,
        },
      };
    });

    setEvents(mappedEvents);
  }, []);

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-10">
        <h1 className="text-5xl font-black text-white drop-shadow-md tracking-tight">
          Calendar
        </h1>
        <p className="text-white/40 mt-2 text-lg font-light tracking-wide uppercase text-xs font-bold tracking-widest mt-1">Schedule and manage your events.</p>
      </div>

      <div className="flex-1 bg-white/[0.03] backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
        {/* FullCalendar wrapper needs a specific style hack to look good in dark mode natively */}
        <div className="h-full fc-dark-theme-overrides">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            height="100%"
            eventClick={(info) => {
              // Basic alert for MVP, will be an elegant modal later
              alert(
                `Activity: ${info.event.title}\nType: ${info.event.extendedProps.type}\nLocation: ${info.event.extendedProps.location || 'N/A'}\nDescription: ${info.event.extendedProps.description}`
              );
            }}
            editable={true} // For future drag/drop support
            selectable={true}
          />
        </div>
      </div>
      
      {/* Scope a few dark mode overrides for FullCalendar */}
      <style dangerouslySetInnerHTML={{__html: `
        .fc-dark-theme-overrides {
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: rgba(255, 255, 255, 0.05);
          --fc-neutral-text-color: #a1a1aa;
          --fc-border-color: rgba(255, 255, 255, 0.1);
          --fc-button-text-color: #fff;
          --fc-button-bg-color: rgba(59, 130, 246, 0.2);
          --fc-button-border-color: rgba(59, 130, 246, 0.3);
          --fc-button-hover-bg-color: rgba(59, 130, 246, 0.4);
          --fc-button-hover-border-color: rgba(59, 130, 246, 0.5);
          --fc-button-active-bg-color: rgba(59, 130, 246, 0.6);
          --fc-button-active-border-color: rgba(59, 130, 246, 0.7);
          --fc-today-bg-color: rgba(255, 255, 255, 0.05);
        }
        .fc-theme-standard td, .fc-theme-standard th {
          border-color: var(--fc-border-color);
        }
        .fc .fc-button-primary:disabled {
          background-color: transparent;
          border-color: var(--fc-border-color);
          color: var(--fc-neutral-text-color);
        }
        .fc .fc-daygrid-day-number {
          color: white;
        }
        .fc .fc-col-header-cell-cushion {
          color: white;
        }
        .fc .fc-toolbar-title {
          color: white;
        }
      `}} />
    </div>
  );
}
