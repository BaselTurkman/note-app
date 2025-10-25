import { prisma } from '@/lib/prisma';
import { createNote, deleteNote } from '@/app/_actions/notes';

export default async function NotesPage() {
  const notes = await prisma.note.findMany();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">My Notes</h1>
      <form action={createNote} className="mb-6 space-y-3">
        <input
          name="title"
          placeholder="Title"
          className="border p-2 rounded w-full"
        />
        <textarea
          name="content"
          placeholder="Content"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </form>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.id} className="border p-3 rounded">
            <h2 className="font-bold">{note.title}</h2>
            <p>{note.content}</p>
            <form
              action={async () => {
                'use server';
                await deleteNote(note.id);
              }}
            >
              <button type="submit" className="text-red-500 mt-2">
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
