function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-900 mt-16 bg-white dark:bg-slate-900 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <p className="text-sm font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
          Made with ❤️ by Kriti Singh
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
