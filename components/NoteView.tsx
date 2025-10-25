"use client";

import { startTransition } from "react";
import { deleteNote } from "@/app/_actions/notes";
import { Note } from "@/types";

interface NoteViewProps {
  note: Note;
  onEdit: () => void;
}

export default function NoteView({ note, onEdit }: NoteViewProps) {
  const handleDelete = () => {
    startTransition(async () => {
      await deleteNote(note.id);
    });
  };

  return (
    <div>
      <h2 className="card-title text-lg font-semibold text-primary">
        {note.title}
      </h2>
      <p className="text-base-content/80 mt-2">{note.content}</p>
      <div className="flex gap-3 mt-4 justify-end">
        <div className="tooltip tooltip-bottom" data-tip="Edit note">
          <button
            onClick={onEdit}
            className="btn btn-sm btn-warning text-white"
          >
            ✏️
          </button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Delete note">
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-error text-white"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
