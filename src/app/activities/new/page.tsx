"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { addActivity, ActivityType } from "@/lib/store";

export default function NewActivityPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    type: "Tarbiyyat" as ActivityType,
    description: "",
    location: "",
    date: new Date().toISOString().slice(0, 16), // YYYY-MM-DDThh:mm format for primitive input
    isRecurring: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addActivity({
      id: Math.random().toString(36).substring(7),
      ...formData,
      date: new Date(formData.date).toISOString()
    });

    router.push("/activities");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link 
        href="/activities"
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white w-fit mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Activities
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">New Activity</h1>
        <p className="text-zinc-400">Plan a new task or event.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Title</label>
          <input 
            required
            type="text" 
            placeholder="e.g. Friday Sermon Preparation"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Type</label>
            <select
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value as ActivityType})}
            >
              <option value="Tarbiyyat">Tarbiyyat</option>
              <option value="Tabligh">Tabligh</option>
              <option value="Visits">Visits</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Date & Time</label>
            <input 
              required
              type="datetime-local" 
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all [color-scheme:dark]"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Location</label>
          <input 
            type="text" 
            placeholder="e.g. Mission House"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Description</label>
          <textarea 
            rows={4}
            placeholder="Notes about this activity..."
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="recurring"
            className="w-5 h-5 rounded border-white/10 bg-black/50 text-blue-500 focus:ring-blue-500/50 cursor-pointer"
            checked={formData.isRecurring}
            onChange={e => setFormData({...formData, isRecurring: e.target.checked})}
          />
          <label htmlFor="recurring" className="text-sm font-medium text-zinc-300 cursor-pointer select-none">
            This is a recurring activity
          </label>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
          <Link
            href="/activities"
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
          >
            Save Activity
          </button>
        </div>
      </form>
    </div>
  );
}
