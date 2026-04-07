"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Calendar, MapPin, Tag } from "lucide-react";
import { getActivities, Activity, ActivityType } from "@/lib/store";
import { format } from "date-fns";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filterType, setFilterType] = useState<ActivityType | "All">("All");

  useEffect(() => {
    // In a real app this would be a fetch
    setActivities(getActivities());
  }, []);

  const filteredActivities = activities.filter(a => filterType === "All" || a.type === filterType);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-black text-white drop-shadow-md tracking-tight">
            Activities
          </h1>
          <p className="text-white/40 mt-2 text-lg font-light tracking-wide uppercase text-xs">Manage and track your daily tasks</p>
        </div>
        <Link 
          href="/activities/new"
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Activity
        </Link>
      </div>

      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "Tarbiyyat", "Tabligh", "Visits", "Admin"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type as any)}
            className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border ${
              filterType === type 
                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                : "bg-white/[0.03] backdrop-blur-xl text-white/50 border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map(activity => (
          <div 
            key={activity.id} 
            className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.05] hover:border-white/30 transition-all group shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-white/[0.05] text-white/60 border border-white/10">
                {activity.type}
              </span>
              {activity.isRecurring && (
                <span className="text-[10px] font-black tracking-widest uppercase text-white/30 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Recurring
                </span>
              )}
            </div>
            
            <h3 className="font-bold text-xl mb-3 text-white transition-colors group-hover:text-blue-400">
              {activity.title}
            </h3>
            <p className="text-white/40 text-sm font-medium leading-relaxed line-clamp-2 mb-6">
              {activity.description}
            </p>

            <div className="space-y-3 mt-auto pt-6 border-t border-white/5">
              <div className="flex items-center gap-2.5 text-xs font-bold tracking-tight text-white/40">
                <Calendar className="w-4 h-4 text-white/20" />
                <span>{format(new Date(activity.date), "MMM d, yyyy 'at' h:mm a")}</span>
              </div>
              {activity.location && (
                <div className="flex items-center gap-2.5 text-xs font-bold tracking-tight text-white/40">
                  <MapPin className="w-4 h-4 text-white/20" />
                  <span>{activity.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredActivities.length === 0 && (
        <div className="text-center py-24 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/10 border-dashed mt-6">
          <p className="text-white/20 mb-3 text-lg font-light">No activities found.</p>
          <Link href="/activities/new" className="text-white font-black text-sm tracking-tight border-b border-white/30 pb-0.5 hover:border-white transition-all">
            Create your first activity &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
