"use client";

import { useState, useTransition } from "react";
import { deleteNote, editNote } from "@/app/_actions/notes";

interface NoteItemProps {
  note: {
    id: number;
    title: string;
    content: string;
  };
}

export default function NoteItem({ note }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, startDelete] = useTransition();
  const [isSaving, startSave] = useTransition();

  return (
    <li className="card bg-base-200 border border-base-300 shadow-md hover:shadow-lg transition-all p-4 rounded-lg">
      {!isEditing ? (
        <>
          <h2 className="card-title text-lg font-semibold text-primary">
            {note.title}
          </h2>
          <p className="text-base-content/80 mt-2">{note.content}</p>

          <div className="flex gap-3 mt-4 justify-end tooltip tooltip-bottom">
            <div className="tooltip tooltip-bottom" data-tip="Edit Note">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-sm btn-warning text-white"
                data-tip="Edit note"
              >
                ✏️
              </button>
            </div>
            <form
              action={() =>
                startDelete(async () => {
                  await deleteNote(note.id);
                })
              }
            >
              <div className="tooltip tooltip-bottom" data-tip="Delete note">
                <button
                  type="submit"
                  className={`btn btn-sm btn-error text-white  ${
                    isDeleting ? "opacity-70 pointer-events-none" : ""
                  }`}
                >
                  {isDeleting ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    "🗑️"
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <form
          action={(formData) =>
            startSave(async () => {
              await editNote(note.id, formData);
              setIsEditing(false);
            })
          }
          className="space-y-3"
        >
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
            <button
              type="submit"
              disabled={isSaving}
              className={`btn btn-sm btn-success text-white tooltip tooltip-bottom ${
                isSaving ? "opacity-70" : ""
              }`}
              data-tip="Save changes"
            >
              {isSaving ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "💾"
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-sm btn-ghost tooltip tooltip-bottom"
              data-tip="Cancel editing"
              disabled={isSaving}
            >
              ❌
            </button>
          </div>
        </form>
      )}
    </li>
  );
}
