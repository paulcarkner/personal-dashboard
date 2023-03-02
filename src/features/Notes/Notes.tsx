import React, { useRef, forwardRef, useState, useEffect } from "react";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import type { AppDispatch } from "../../app/store";

import {
  //types
  NoteType,
  ContentType,
  NotesStateType,

  //actions
  CreateNote,
  DeleteNote,
  UpdateNoteName,
  UpdateNoteContent,
  AddNoteItem,
  DeleteNoteContent,

  //selectors
  NotesStateSelector,
} from "./NotesSlice";

//Styles
import styles from "./Notes.module.css";

//Components

//Type Declarations
type Props = {
  category: string;
};

type DialogProps = {
  note: NoteType;
  closeDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dispatch: AppDispatch;
};

export const Notes: React.FC<Props> = ({ category }: Props): JSX.Element => {
  const notesState: NotesStateType = useAppSelector(NotesStateSelector);
  const notes = notesState.notes?.filter((note) => note.category === category);
  const dispatch = useAppDispatch();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogState, setDialogState] = useState<NoteType>({
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
    const newNote: NoteType = {
      id: crypto.randomUUID(),
      name: "",
      type: "text",
      category: category,
      content: [{ id: crypto.randomUUID(), checked: false, value: "" }],
    };
    dispatch(CreateNote(newNote));
    setDialogState(newNote);
    dialogRef.current?.showModal();
  }

  function handleAddToDoClick() {
    const newNote: NoteType = {
      id: crypto.randomUUID(),
      name: "",
      type: "todo",
      category: category,
      content: [{ id: crypto.randomUUID(), checked: false, value: "" }],
    };
    dispatch(CreateNote(newNote));
    setDialogState(newNote);
    dialogRef.current?.showModal();
  }

  function handleCloseDialog() {
    dialogRef.current?.close();
  }

  return (
    <div className={styles.Notes}>
      <div className={`${styles.NotesContainer} customScroll`}>
        {notes?.map((note, index) => {
          switch (note.type) {
            case "text":
              return (
                <div className={styles.Note} key={note.id}>
                  <div className={styles.NoteTitle}>
                    {note.name.length > 0 ? note.name : <i>[Untitled]</i>}
                  </div>
                  <div className={styles.NoteContent}>
                    {note.content[0].value}
                  </div>
                  <button
                    className={styles.EditNoteBtn}
                    onClick={handleEditClick}
                    data-id={note.id}
                  >
                    <span className="material-symbols-sharp">edit_note</span>
                  </button>
                </div>
              );

            case "todo":
              return (
                <div className={styles.Note} key={note.id}>
                  <div className={styles.NoteTitle}>
                    {note.name.length > 0 ? note.name : <i>[Untitled]</i>}
                  </div>
                  <div className={`${styles.NoteContent}`}>
                    {note.content.map((content, index) => {
                      if (index === 5 && note.content.length > 6)
                        return (
                          <div className={styles.MoreItems} key={content.id}>
                            {note.content.length - 5} More Items...
                          </div>
                        );
                      if (index > 5) return null;
                      return (
                        <div className={styles.ListItem} key={content.id}>
                          <span className="material-symbols-sharp">
                            {content.checked
                              ? "check_box"
                              : "check_box_outline_blank"}
                          </span>
                          <div className={styles.ListItemText}>
                            {content.value}
                          </div>
                        </div>
                      );
                    })}
                    <button
                      className={styles.EditNoteBtn}
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
        <div className={styles.NoNotes}>No Notes</div>
      </div>
      <div className={styles.ButtonBar}>
        <button
          className={`${styles.AddNoteBtn} btn`}
          onClick={handleAddNoteClick}
        >
          <span className="material-symbols-sharp">add_circle</span>
          Add Note
        </button>
        <button
          className={`${styles.AddToDoBtn} btn`}
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
const NoteDialog = forwardRef<HTMLDialogElement, DialogProps>((props, ref) => {
  const [inputState, setInputState] = useState<NoteType>(props.note);

  useEffect(() => {
    setInputState(props.note);
  }, [props.note]);

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputState(Object.assign({}, inputState, { name: e.target.value }));
    props.dispatch(UpdateNoteName({ id: inputState.id, name: e.target.value }));
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
    let value: Array<ContentType> = inputState.content.map((content) =>
      content.id === id ? editedContent : content
    );
    setInputState(Object.assign({}, inputState, { content: value }));
    props.dispatch(
      UpdateNoteContent({
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
      UpdateNoteContent({
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
    props.dispatch(AddNoteItem({ id: inputState.id, contentId: newId }));
  };

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let id = e.currentTarget.getAttribute("data-id") || "";
    let value = inputState.content.filter((content) => content.id !== id);
    setInputState(Object.assign({}, inputState, { content: value }));
    props.dispatch(
      DeleteNoteContent({
        id: inputState.id,
        contentId: id,
      })
    );
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      props.dispatch(DeleteNote(inputState.id));
      props.closeDialog(e);
    }
  };

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.closeDialog(e);
  };

  return (
    <dialog className="customScroll" ref={ref}>
      <div className={styles.DialogHeader}>Note Editor</div>
      <div className={styles.DialogForm}>
        <input
          className={styles.NoteName}
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
          ></textarea>
        ) : (
          <div className={styles.List}>
            {inputState.content.map((content) => {
              return (
                <div className={styles.ListItem} key={content.id}>
                  <button
                    className={styles.CheckBtn}
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
                    className={styles.ListInput}
                    name="content"
                    data-id={content.id}
                    value={content.value}
                    onChange={handleContentChange}
                  />
                  <button
                    className={styles.RemoveBtn}
                    data-id={content.id}
                    onClick={handleRemoveClick}
                  >
                    <span className="material-symbols-sharp">cancel</span>
                  </button>
                </div>
              );
            })}
            <div className={`${styles.ListItem} ${styles.AddItem}`}>
              <span className="material-symbols-sharp">add</span>
              <button className={styles.AddItem} onClick={handleAddItemClick}>
                Add Item...
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.DialogFooter}>
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
