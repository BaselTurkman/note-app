export default function Loading() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-primary mb-8">My Notes 📝</h1>

      <div className="flex justify-center items-center gap-3 mb-8 text-base-content/70">
        <span className="text-lg font-medium">Loading your notes...</span>
        <span className="loading loading-spinner loading-lg"></span>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="card bg-base-200 border border-base-300 shadow-md animate-pulse p-4 rounded-lg"
          >
            <div className="h-5 bg-base-300 rounded w-1/2 mb-4" />
            <div className="h-3 bg-base-300 rounded w-full mb-2" />
            <div className="h-3 bg-base-300 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
