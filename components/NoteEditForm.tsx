"use client";

import { useState, useTransition, FormEvent } from "react";
import { editNote } from "@/app/_actions/notes";
import { Note } from "@/types";

interface NoteEditFormProps {
  note: Note;
  onCancel: () => void;
}

export default function NoteEditForm({ note, onCancel }: NoteEditFormProps) {
  const [isSaving, startSave] = useTransition();
  const [error, setError] = useState("");

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string)?.trim();
    const content = (formData.get("content") as string)?.trim();

    if (!title) {
      setError("Title is required!");
      return;
    }
    if (!content) {
      setError("Content cannot be empty!");
      return;
    }

    startSave(async () => {
      try {
        await editNote(note.id, formData);
        onCancel();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Failed to save note");
      }
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-3">
      <input
        name="title"
        defaultValue={note.title}
        className="input input-bordered w-full bg-base-100"
        placeholder="Edit title"
        disabled={isSaving}
      />
      <textarea
        name="content"
        defaultValue={note.content}
        className="textarea textarea-bordered w-full bg-base-100"
        placeholder="Edit content"
        disabled={isSaving}
      />
      <div className="flex gap-3 justify-end">
        <div className="tooltip tooltip-bottom" data-tip="Save">
        <button
          type="submit"
          disabled={isSaving}
          className={`btn btn-sm btn-success text-white ${
            isSaving ? "opacity-70" : ""
          }`}
        >
          {isSaving ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "💾"
          )}
        </button>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Cancel">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-sm btn-ghost"
          disabled={isSaving}
        >
          ❌
        </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
    </form>
  );
}
