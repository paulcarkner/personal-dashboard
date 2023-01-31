import React, {
  useRef,
  forwardRef,
  useState,
  useEffect,
  MutableRefObject,
} from "react";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import type { AppDispatch } from "../../app/store";

import {
  //types
  NoteType,
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
    id: "a",
    name: "some name",
    type: "todo",
    category: "business",
    content: [
      { checked: true, value: "hello world" },
      { checked: false, value: "goodbye" },
    ],
  });

  function handleAddNoteClick() {
    const newId = crypto.randomUUID();
    const newNote: NoteType = {
      id: newId,
      name: "",
      type: "text",
      category: category,
      content: [{ checked: false, value: "" }],
    };
    dispatch(CreateNote(newNote));
    setDialogState(newNote);
    dialogRef.current?.showModal();
  }

  function handleAddToDoClick() {
    const newId = crypto.randomUUID();
    const newNote: NoteType = {
      id: newId,
      name: "",
      type: "todo",
      category: category,
      content: [{ checked: false, value: "" }],
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
                <div className={styles.Note} key={index}>
                  <div className={styles.NoteTitle}>{note.name}</div>
                  <div className={styles.NoteContent}>
                    {note.content[0].value}
                  </div>
                </div>
              );

            case "todo":
              return <div className={styles.Note} key={index}></div>;
          }
          return <div key={index}></div>;
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
    let index = parseInt("0" + e.target.getAttribute("data-index"), 10);
    let value: Array<{ checked: boolean; value: string }> =
      inputState.content.map((c, i) =>
        i === index ? { checked: c.checked, value: e.target.value } : c
      );
    setInputState(Object.assign({}, inputState, { content: value }));
    props.dispatch(
      UpdateNoteContent({
        id: inputState.id,
        contentIndex: index,
        checked: inputState.content[index].checked,
        value: value[index].value,
      })
    );
  };

  const handleCheckClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let index = parseInt("0" + e.currentTarget.getAttribute("data-index"), 10);
    let value = inputState.content.map((c, i) =>
      i === index ? { checked: !c.checked, value: c.value } : c
    );
    setInputState(Object.assign({}, inputState, { content: value }));
    props.dispatch(
      UpdateNoteContent({
        id: inputState.id,
        contentIndex: index,
        checked: value[index].checked,
        value: value[index].value,
      })
    );
  };

  const handleAddItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInputState(
      Object.assign({}, inputState, {
        content: [...inputState.content, { checked: false, value: "" }],
      })
    );
    props.dispatch(AddNoteItem({ id: inputState.id }));
  };

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    let index = parseInt("0" + e.currentTarget.getAttribute("data-index"), 10);
    let value = inputState.content;
    value.splice(index, 1);
    setInputState(Object.assign({}, inputState, { content: value }));
    props.dispatch(
      DeleteNoteContent({
        id: inputState.id,
        contentIndex: index,
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
            value={inputState.content[0].value}
            onChange={handleContentChange}
          ></textarea>
        ) : (
          <div className={styles.List}>
            {inputState.content.map((c, index) => {
              return (
                <div className={styles.ListItem} key={index}>
                  <button
                    className={styles.CheckBtn}
                    data-index={index}
                    onClick={handleCheckClick}
                  >
                    <span className="material-symbols-sharp">
                      {c.checked ? "check_box" : "check_box_outline_blank"}
                    </span>
                  </button>
                  <input
                    className={styles.ListInput}
                    name="content"
                    data-index={index}
                    value={c.value}
                    checked={c.checked}
                    onChange={handleContentChange}
                  />
                  <button
                    className={styles.RemoveBtn}
                    data-index={index}
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
