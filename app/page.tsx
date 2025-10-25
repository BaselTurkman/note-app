import { prisma } from "@/lib/prisma";
import { createNote } from "@/app/_actions/notes";
import NoteItem from "@/components/NoteItem";

export default async function NotesPage() {
  const notes = await prisma.note.findMany();

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        My Notes 📝
      </h1>

      <div className="card bg-base-200 p-6 mb-8 shadow-lg border border-base-300 rounded-lg">
        <form action={createNote} className="space-y-4">
          <div className="flex flex-col gap-3">
            <input
              name="title"
              placeholder="Note title"
              className="input input-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:ring focus:ring-primary/20 rounded-lg text-base"
            />
            <textarea
              name="content"
              placeholder="Write your note..."
              className="textarea textarea-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:ring focus:ring-primary/20 rounded-lg text-base"
              rows={2}
            />
          </div>
          <div className="flex justify-end">
            <div className="relative tooltip tooltip-bottom" data-tip="Add new note">
              <button
                type="submit"
                className="btn btn-primary px-6 py-2 rounded-lg"
              >
                Add Note
              </button>
            </div>
          </div>
        </form>
      </div>
      {notes.length === 0 ? (
        <p className="text-center text-base-content/70">
          No notes yet. Start by adding one above!
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </ul>
      )}
    </div>
  );
}
