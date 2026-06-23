function Hero() {
  return (
    <div className="mx-auto max-w-6xl mt-6 px-5 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 p-8 md:p-12 text-white rounded-3xl shadow-xl shadow-indigo-100 dark:shadow-indigo-900/30 overflow-hidden relative">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex-1 space-y-4 md:space-y-6 z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Welcome to <span className="underline decoration-purple-300 decoration-wavy underline-offset-4">My Blog</span>
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl max-w-xl font-normal leading-relaxed">
            A fully functional creative blogging platform built using{' '}
            <a
              href="https://www.sanity.io/"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-purple-200 underline underline-offset-2 font-semibold transition-colors duration-200"
            >
              Sanity.io
            </a>{' '}
            and{' '}
            <a
              href="https://nextjs.org/"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-purple-200 underline underline-offset-2 font-semibold transition-colors duration-200"
            >
              Next.js
            </a>
            .
          </p>
        </div>

        <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0 z-10 w-full max-w-xs md:max-w-md">
          <img
            className="h-44 md:h-56 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-500"
            src="/hero.png"
            alt="Workspace Illustration"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
