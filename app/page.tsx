import { prisma } from "@/lib/prisma";
import NoteItem from "@/components/NoteItem";
import AddNoteForm from "@/components/AddNoteForm";

export default async function NotesPage() {
  const notes = await prisma.note.findMany();

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        My Notes 📝
      </h1>
      <AddNoteForm />
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
