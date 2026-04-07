"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format, isToday, isFuture } from "date-fns";
import { Activity, getActivities } from "@/lib/store";
import { Calendar, ListTodo, Plus, Receipt } from "lucide-react";

export default function DashboardPage() {
  const [upcomingActivities, setUpcomingActivities] = useState<Activity[]>([]);
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    const allActivities = getActivities();
    
    // Sort by date closest to now
    const sorted = [...allActivities].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Filter strictly for today or future, take top 4
    const upcoming = sorted.filter(a => isToday(new Date(a.date)) || isFuture(new Date(a.date))).slice(0, 4);
    const today = allActivities.filter(a => isToday(new Date(a.date))).length;

    setUpcomingActivities(upcoming);
    setTodayCount(today);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.1)] mb-3 tracking-tight">
            Welcome back
          </h1>
          <p className="text-white/50 text-xl font-light">
            Today is <span className="text-white font-medium">{format(new Date(), "EEEE, MMMM do")}</span>
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white/[0.05] backdrop-blur-xl hover:bg-white/[0.1] text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all border border-white/10 shadow-2xl">
            <Receipt className="w-4 h-4" />
            New Expense
          </button>
          <Link 
            href="/activities/new"
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Activity
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
          <div className="w-14 h-14 bg-white/[0.05] rounded-2xl flex items-center justify-center mb-6 border border-white/5">
            <Calendar className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-4xl font-black text-white mb-1 drop-shadow-md">{todayCount}</h2>
          <p className="text-white/40 font-semibold tracking-wider uppercase text-xs">Activities Today</p>
        </div>
        
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
          <div className="w-14 h-14 bg-white/[0.05] rounded-2xl flex items-center justify-center mb-6 border border-white/5">
            <ListTodo className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-4xl font-black text-white mb-1 drop-shadow-md">{upcomingActivities.length}</h2>
          <p className="text-white/40 font-semibold tracking-wider uppercase text-xs">Upcoming Tasks</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
          <div className="w-14 h-14 bg-white/[0.05] rounded-2xl flex items-center justify-center mb-6 border border-white/5">
            <Receipt className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-4xl font-black text-white mb-1 drop-shadow-md">$0.00</h2>
          <p className="text-white/40 font-semibold tracking-wider uppercase text-xs">Pending Expenses</p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Activities */}
        <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-white tracking-tight">Upcoming Activities</h3>
            <Link href="/activities" className="text-sm font-bold text-white/50 hover:text-white transition-colors">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {upcomingActivities.length === 0 ? (
              <p className="text-white/20 text-center py-12 italic">No upcoming activities.</p>
            ) : (
              upcomingActivities.map(activity => (
                <div key={activity.id} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all group overflow-hidden relative">
                  <div className="flex-1 min-w-0 relative z-10">
                    <h4 className="font-bold text-[17px] text-white truncate transition-colors">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-white/40 truncate mt-1">
                      {format(new Date(activity.date), "MMM do, h:mm a")} • {activity.type}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* AI Assistant Preview */}
        <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-8 shadow-2xl relative overflow-hidden flex flex-col">
          <h3 className="text-2xl font-black text-white tracking-tight mb-8">AI Assistant</h3>
          
          <div className="flex-1 flex flex-col justify-end space-y-6">
            <div className="bg-white/[0.05] backdrop-blur-xl rounded-3xl p-6 border border-white/10 max-w-[90%] self-end shadow-xl">
              <p className="text-[15px] text-white/80 font-medium leading-relaxed">Phase 2: This will be your intelligent MurrabiOS agent. Ready to help you with research and planning.</p>
            </div>
            
            <div className="flex gap-3">
              <input 
                disabled
                type="text" 
                placeholder="Ask anything..." 
                className="flex-1 bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 cursor-not-allowed focus:outline-none"
              />
              <button disabled className="bg-white/[0.1] border border-white/10 px-6 rounded-2xl text-white/40 cursor-not-allowed font-black">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
