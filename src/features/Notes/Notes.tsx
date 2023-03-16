import React, { useRef, forwardRef, useState, useEffect } from "react";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import type { AppDispatch } from "../../app/store";

import {
  //types
  noteType,
  contentType,
  notesStateType,

  //actions
  createNote,
  deleteNote,
  updateNoteName,
  updateNoteContent,
  addNoteItem,
  deleteNoteContent,

  //selectors
  notesStateSelector,
} from "./NotesSlice";

//Styles
import styles from "./Notes.module.css";

//Type Declarations
type props = {
  category: string;
};

type dialogProps = {
  note: noteType;
  closeDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dispatch: AppDispatch;
};

export const Notes: React.FC<props> = ({ category }: props): JSX.Element => {
  const notesState: notesStateType = useAppSelector(notesStateSelector);
  const notes = notesState.notes?.filter((note) => note.category === category);
  const dispatch = useAppDispatch();

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

//Dialog Component
const NoteDialog = forwardRef<HTMLDialogElement, dialogProps>((props, ref) => {
  const [inputState, setInputState] = useState<noteType>(props.note);

  useEffect(() => {
    setInputState(props.note);
  }, [props.note]);

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputState(Object.assign({}, inputState, { name: e.target.value }));
    props.dispatch(updateNoteName({ id: inputState.id, name: e.target.value }));
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let id = e.target.getAttribute("data-id") || "";
    let editedContent = Object.assign(
      {},
      inputState.content.find((content) => content.id === id),
      { value: e.target.value }
    );
    let value: Array<contentType> = inputState.content.map((content) =>
      content.id === id ? editedContent : content
    );
    setInputState(Object.assign({}, inputState, { content: value }));
    props.dispatch(
      updateNoteContent({
        id: inputState.id,
        contentId: id,
        checked: editedContent.checked,
        value: editedContent.value,
      })
    );
  };

  const handleCheckClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let id = e.currentTarget.getAttribute("data-id") || "";
    let editedContent = Object.assign(
      {},
      inputState.content.find((content) => content.id === id),
      {
        checked: !inputState.content.find((content) => content.id === id)
          ?.checked,
      }
    );
    let value = inputState.content.map((content) =>
      id === content.id ? editedContent : content
    );
    setInputState(Object.assign({}, inputState, { content: value }));
    props.dispatch(
      updateNoteContent({
        id: inputState.id,
        contentId: id,
        checked: editedContent.checked,
        value: editedContent.value,
      })
    );
  };

  const handleAddItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let newId = crypto.randomUUID();
    setInputState(
      Object.assign({}, inputState, {
        content: [
          ...inputState.content,
          { id: newId, checked: false, value: "" },
        ],
      })
    );
    props.dispatch(addNoteItem({ id: inputState.id, contentId: newId }));
  };

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let id = e.currentTarget.getAttribute("data-id") || "";
    let value = inputState.content.filter((content) => content.id !== id);
    setInputState(Object.assign({}, inputState, { content: value }));
    props.dispatch(
      deleteNoteContent({
        id: inputState.id,
        contentId: id,
      })
    );
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      props.dispatch(deleteNote(inputState.id));
      props.closeDialog(e);
    }
  };

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.closeDialog(e);
  };

  return (
    <dialog className="customScroll" ref={ref}>
      <div className={styles.dialogHeader}>Note Editor</div>
      <div className={styles.dialogForm}>
        <input
          className={styles.noteName}
          value={inputState.name}
          onChange={handleNameChange}
          placeholder="Untitled Note"
          name="name"
        />
        {inputState.type === "text" ? (
          <textarea
            name="content"
            key={0}
            data-id={inputState.content[0].id}
            value={inputState.content[0].value}
            onChange={handleContentChange}
            autoFocus={true}
          ></textarea>
        ) : (
          <div className={styles.list}>
            {inputState.content.map((content, index) => {
              return (
                <div className={styles.listItem} key={content.id}>
                  <button
                    className={styles.checkBtn}
                    data-id={content.id}
                    onClick={handleCheckClick}
                  >
                    <span className="material-symbols-sharp">
                      {content.checked
                        ? "check_box"
                        : "check_box_outline_blank"}
                    </span>
                  </button>
                  <input
                    className={styles.listInput}
                    name="content"
                    data-id={content.id}
                    value={content.value}
                    onChange={handleContentChange}
                    autoFocus={index === inputState.content.length - 1}
                  />
                  <button
                    className={styles.removeBtn}
                    data-id={content.id}
                    onClick={handleRemoveClick}
                  >
                    <span className="material-symbols-sharp">cancel</span>
                  </button>
                </div>
              );
            })}
            <div className={`${styles.listItem} ${styles.addItem}`}>
              <span className="material-symbols-sharp">add</span>
              <button className={styles.addItem} onClick={handleAddItemClick}>
                Add Item...
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.dialogFooter}>
        <button className="btn btn-secondary" onClick={handleDeleteClick}>
          <span className="material-symbols-sharp">delete</span>
        </button>
        <button className="btn" onClick={handleCloseClick}>
          Close
        </button>
      </div>
    </dialog>
  );
});
