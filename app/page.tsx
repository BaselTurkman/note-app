import { prisma } from '@/lib/prisma';
import { createNote } from '@/app/_actions/notes';
import NoteItem from '@/components/NoteItem';

export default async function NotesPage() {
  const notes = await prisma.note.findMany();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-primary mb-8">
        📝 My Notes
      </h1>

      <div className="card bg-base-100 p-6 mb-8 border">
        <form action={createNote} className="space-y-5">
          <input
            name="title"
            placeholder="Note title"
            className="input input-bordered w-full"
          />
          <textarea
            name="content"
            placeholder="Write your note..."
            className="textarea textarea-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">
            ➕ Add Note
          </button>
        </form>
      </div>

      {notes.length === 0 ? (
        <p className="text-center text-base-content/70">
          No notes yet. Start by adding one above!
        </p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </ul>
      )}
    </div>
  );
}
