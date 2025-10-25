'use client';

import { useState } from 'react';
import { deleteNote, editNote } from '@/app/_actions/notes';

interface NoteItemProps {
  note: {
    id: number;
    title: string;
    content: string;
  };
}

export default function NoteItem({ note }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="border p-3 rounded">
      {!isEditing ? (
        <>
          <h2 className="font-bold">{note.title}</h2>
          <p>{note.content}</p>

          <div className="flex gap-4 mt-3">
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-600 hover:underline"
            >
              Edit
            </button>

            <form
              action={async () => {
                await deleteNote(note.id);
              }}
            >
              <button type="submit" className="text-red-500 hover:underline">
                Delete
              </button>
            </form>
          </div>
        </>
      ) : (
        <form
          action={async (formData) => {
            await editNote(note.id, formData);
          }}
          className="space-y-2"
        >
          <input
            name="title"
            defaultValue={note.title}
            className="border p-2 rounded w-full"
          />
          <textarea
            name="content"
            defaultValue={note.content}
            className="border p-2 rounded w-full"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </li>
  );
}
