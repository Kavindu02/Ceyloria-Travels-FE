export default function SDKLoader() {
  return (
    // Full-screen container with a modern glass-morphism background
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-md">
      
      {/* --- Hide any nav/footer underneath --- */}
      <style>
        {`
          body > nav, 
          body > footer {
            display: none !important;
          }

          /* Floating animation for the logo */
          @keyframes float-logo {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }

          /* Shimmer animation for the text */
          @keyframes shimmer-text {
            0% { background-position: -200%; }
            100% { background-position: 200%; }
          }

          /* Progress bar translate animation */
          @keyframes translateX {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>

      <div className="relative flex flex-col items-center">
        {/* Logo Container */}
        <div 
          className="relative animate-pulse drop-shadow-2xl"
          style={{ animation: 'float-logo 3s ease-in-out infinite' }}
        >
          {/* Glow behind logo */}
          <div className="absolute -inset-4 rounded-full bg-blue-500/20 blur-xl"></div>
          
          {/* Logo Image */}
          <img
            src="/load.png"
            alt="SDK Travels Loading"
            className="relative h-auto w-48 object-contain md:w-64"
          />
        </div>

        {/* Loading Text */}
        <div className="mt-8">
          <h2 
            className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-[length:200%_auto] bg-clip-text text-xl font-bold tracking-[0.3em] text-transparent uppercase"
            style={{ animation: 'shimmer-text 3s linear infinite' }}
          >
            Loading...
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-1 w-32 overflow-hidden rounded-full bg-blue-900/30">
          <div className="h-full w-full animate-[translateX_1.5s_ease-in-out_infinite] rounded-full bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
}
