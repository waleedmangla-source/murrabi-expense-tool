import ExpenseForm from './components/ExpenseForm';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#e0e0e0] font-inter">
      <header className="py-8 px-6 text-center border-b border-white/5 bg-white/2 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-3xl font-manrope font-bold text-[#b8860b] mb-2 tracking-tight">
          Waqfeen Expense Portal
        </h1>
        <p className="text-sm text-gray-400 font-medium tracking-wide flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-[#1a4a2e] rounded-full animate-pulse" />
          Ahmadiyya Muslim Jama'at Canada
        </p>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-6">
        <ExpenseForm />
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Missionary Budget Tool • Standalone Edition
      </footer>
    </div>
  );
}

export default App;
