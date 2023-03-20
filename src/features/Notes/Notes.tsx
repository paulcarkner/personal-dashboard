/******************************************************************

           Name: Notes
    Description: An interactive notes panel for content and checklists. Uses localStorage for data.
    Return Type: JSX.Element
          Props: category: string
  Redux Actions: createNote(note: noteType)
Redux Selectors: notesStateSelector

******************************************************************/

import React, { useRef, useState } from "react";

//Components
import { NoteDialog } from "./NotesDialog";

//Styles
import styles from "./Notes.module.css";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  //types
  noteType,
  notesStateType,

  //actions
  createNote,

  //selectors
  notesStateSelector,
} from "./NotesSlice";

//Types
type props = {
  category: string;
};

export const Notes: React.FC<props> = ({ category }: props): JSX.Element => {
  const notesState: notesStateType = useAppSelector(notesStateSelector);
  const notes = notesState.notes?.filter((note) => note.category === category); //get notes for this category
  const dispatch = useAppDispatch();

  //initiate dialog
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogState, setDialogState] = useState<noteType>({
    id: "",
    name: "",
    type: "text",
    category: "",
    content: [{ id: "", checked: false, value: "" }],
  });

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let id = e.currentTarget.getAttribute("data-id");
    setDialogState(notes.filter((note) => note.id === id)[0]);
    dialogRef.current?.showModal();
  };

  function handleAddNoteClick() {
    const newNote: noteType = {
      id: crypto.randomUUID(),
      name: "",
      type: "text",
      category: category,
      content: [{ id: crypto.randomUUID(), checked: false, value: "" }],
    };
    dispatch(createNote(newNote));
    setDialogState(newNote);
    dialogRef.current?.showModal();
  }

  function handleAddToDoClick() {
    const newNote: noteType = {
      id: crypto.randomUUID(),
      name: "",
      type: "todo",
      category: category,
      content: [{ id: crypto.randomUUID(), checked: false, value: "" }],
    };
    dispatch(createNote(newNote));
    setDialogState(newNote);
    dialogRef.current?.showModal();
  }

  function handleCloseDialog() {
    dialogRef.current?.close();
  }

  return (
    <div className={styles.notes}>
      <div className={`${styles.notesContainer} customScroll`}>
        {notes?.map((note, index) => {
          switch (note.type) {
            case "text":
              return (
                <div className={styles.note} key={note.id}>
                  <div className={styles.noteTitle}>
                    {note.name.length > 0 ? note.name : <i>[Untitled]</i>}
                  </div>
                  <div className={styles.noteContent}>
                    {note.content[0].value}
                  </div>
                  <button
                    className={styles.editNoteBtn}
                    onClick={handleEditClick}
                    data-id={note.id}
                  >
                    <span className="material-symbols-sharp">edit_note</span>
                  </button>
                </div>
              );

            case "todo":
              return (
                <div className={styles.note} key={note.id}>
                  <div className={styles.noteTitle}>
                    {note.name.length > 0 ? note.name : <i>[Untitled]</i>}
                  </div>
                  <div className={`${styles.noteContent}`}>
                    {note.content.map((content, index) => {
                      if (index === 5 && note.content.length > 6)
                        return (
                          <div className={styles.moreItems} key={content.id}>
                            {note.content.length - 5} More Items...
                          </div>
                        );
                      if (index > 5) return null;
                      return (
                        <div className={styles.listItem} key={content.id}>
                          <span className="material-symbols-sharp">
                            {content.checked
                              ? "check_box"
                              : "check_box_outline_blank"}
                          </span>
                          <div className={styles.listItemText}>
                            {content.value}
                          </div>
                        </div>
                      );
                    })}
                    <button
                      className={styles.editNoteBtn}
                      onClick={handleEditClick}
                      data-id={note.id}
                    >
                      <span className="material-symbols-sharp">edit_note</span>
                    </button>
                  </div>
                </div>
              );
          }
          return null;
        })}
        <div className={styles.noNotes}>No Notes</div>
      </div>
      <div className={styles.buttonBar}>
        <button
          className={`${styles.addNoteBtn} btn`}
          onClick={handleAddNoteClick}
        >
          <span className="material-symbols-sharp">add_circle</span>
          Add Note
        </button>
        <button
          className={`${styles.addToDoBtn} btn`}
          onClick={handleAddToDoClick}
        >
          <span className="material-symbols-sharp">add_circle</span>
          Add Checklist
        </button>
      </div>
      <NoteDialog
        ref={dialogRef}
        note={dialogState}
        closeDialog={handleCloseDialog}
        dispatch={dispatch}
      />
    </div>
  );
};
