export default function Library() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-3xl rounded-3xl overflow-hidden shadow-xl bg-white p-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800">Opening Soon</h1>
        <p className="mt-4 text-lg text-slate-600">Our library is coming soon — stay tuned!</p>
        <div className="mt-8">
          <img
            src="/images/bookstore.jpg"
            alt="Bookstore"
            className="w-full h-auto max-h-[60vh] object-cover rounded-lg"
          />
        </div>
      </div>
    </main>
  );
}
