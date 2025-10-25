"use client";

import { useState } from "react";
import NoteView from "./NoteView";
import NoteEditForm from "./NoteEditForm";
import { Note } from "@/types";

interface NoteItemProps {
  note: Note;
}

export default function NoteItem({ note }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="card bg-base-200 border border-base-300 shadow-md hover:shadow-lg transition-all p-4 rounded-lg">
      {isEditing ? (
        <NoteEditForm note={note} onCancel={() => setIsEditing(false)} />
      ) : (
        <NoteView note={note} onEdit={() => setIsEditing(true)} />
      )}
    </li>
  );
}
