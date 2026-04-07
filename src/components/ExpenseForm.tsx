import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Download, FileText } from 'lucide-react';
import { CATEGORIES, type Category } from '../data/categories';
import { generatePDF } from '../utils/pdfGenerator';


interface ExpenseRow {
  id: string;
  date: string;
  description: string;
  categoryId: string;
  amount: string;
  hasTax: boolean;
}

const ExpenseForm: React.FC = () => {
  const [name, setName] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [rows, setRows] = useState<ExpenseRow[]>([
    { id: '1', date: '', description: '', categoryId: '', amount: '0', hasTax: false }
  ]);

  const addRow = () => {
    setRows([...rows, { id: Math.random().toString(36).substr(2, 9), date: '', description: '', categoryId: '', amount: '0', hasTax: false }]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(r => r.id !== id));
    }
  };

  const updateRow = (id: string, field: keyof ExpenseRow, value: any) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const totals = useMemo(() => {
    let subtotal = 0;
    let hst = 0;
    rows.forEach(r => {
      const amt = parseFloat(r.amount) || 0;
      if (r.hasTax) {
        // Assuming 13% HST for Canada
        subtotal += amt / 1.13;
        hst += amt - (amt / 1.13);
      } else {
        subtotal += amt;
      }
    });
    return { subtotal, hst, total: subtotal + hst };
  }, [rows]);

  const handleExport = () => {
    generatePDF({
      name,
      dateRange,
      rows: rows.map(r => ({
        ...r,
        category: CATEGORIES.find((c: Category) => c.account === r.categoryId)?.name || 'Unknown'
      })),
      ...totals
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="glass-card p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#b8860b]">Missionary Name</label>
          <input 
            type="text" 
            placeholder="Enter full name" 
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[#b8860b]">Reporting Period</label>
          <input 
            type="text" 
            placeholder="e.g. October 2024" 
            className="w-full"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount (CAD)</th>
                <th>Tax Inc.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="w-40"><input type="date" className="w-full p-2 text-sm" value={row.date} onChange={(e) => updateRow(row.id, 'date', e.target.value)} /></td>
                  <td><input type="text" placeholder="Expense detail..." className="w-full p-2 text-sm" value={row.description} onChange={(e) => updateRow(row.id, 'description', e.target.value)} /></td>
                  <td className="w-64">
                    <select className="w-full p-2 text-sm" value={row.categoryId} onChange={(e) => updateRow(row.id, 'categoryId', e.target.value)}>
                      <option value="">Select Category</option>
                      {CATEGORIES.map((c: Category) => <option key={c.account} value={c.account}>{c.name}</option>)}
                    </select>
                  </td>
                  <td className="w-32"><input type="number" step="0.01" className="w-full p-2 text-sm text-right" value={row.amount} onChange={(e) => updateRow(row.id, 'amount', e.target.value)} /></td>
                  <td className="w-20 text-center"><input type="checkbox" checked={row.hasTax} onChange={(e) => updateRow(row.id, 'hasTax', e.target.checked)} className="w-4 h-4 cursor-pointer accent-[#b8860b]" /></td>
                  <td className="w-12 text-center">
                    <button onClick={() => removeRow(row.id)} className="text-red-400/50 hover:text-red-400 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-white/5 flex justify-between items-center bg-white/1">
          <button onClick={addRow} className="secondary flex items-center gap-2 text-sm font-medium">
            <Plus size={16} /> Add Expense Row
          </button>
          <div className="text-right space-y-1">
            <div className="text-[10px] uppercase text-gray-500 font-bold tracking-tiler">Subtotal: ${totals.subtotal.toFixed(2)}</div>
            <div className="text-[10px] uppercase text-gray-500 font-bold tracking-tiler">HST (13%): ${totals.hst.toFixed(2)}</div>
            <div className="text-xl font-manrope font-bold text-white">Total: ${totals.total.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="secondary flex items-center gap-2">
          <FileText size={18} /> Save Draft
        </button>
        <button onClick={handleExport} className="primary flex items-center gap-2">
          <Download size={18} /> Export PDF Report
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
