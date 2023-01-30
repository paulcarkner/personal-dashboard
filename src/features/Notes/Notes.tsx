import React, { useRef, forwardRef, useState, MutableRefObject } from "react";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  //types
  NoteType,
  NotesStateType,

  //actions
  CreateNote,
  DeleteNote,
  UpdateNoteName,
  UpdateNoteContent,
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
    content: ["hello world", "goodbye"],
  });

  function handleAddNoteClick() {
    //setDialogState(notes.filter((note) => note.id === e.target.value));
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
              return <div></div>;

            case "todo":
              return <div></div>;
          }
          return <div></div>;
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
        <button className={`${styles.AddToDoBtn} btn`} onClick={() => {}}>
          <span className="material-symbols-sharp">add_circle</span>
          Add Checklist
        </button>
      </div>
      <NoteDialog
        ref={dialogRef}
        note={dialogState}
        closeDialog={handleCloseDialog}
      />
    </div>
  );
};

//Dialog Component
const NoteDialog = forwardRef<HTMLDialogElement, DialogProps>((props, ref) => {
  const [inputState, setInputState] = useState<NoteType>(props.note);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value: string | string[] = e.target.value;
    if (e.target.name === "content") {
      let index = parseInt("0" + e.target.getAttribute("data-index"), 10);
      value = inputState.content.map((c, i) =>
        i === index ? e.target.value : c
      );
    }
    setInputState(Object.assign({}, inputState, { [e.target.name]: value }));
  };

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.closeDialog(e);
  };
  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.closeDialog(e);
  };

  return (
    <dialog className="customScroll" ref={ref}>
      <div className={styles.DialogHeader}>Note Editor</div>
      <div className={styles.DialogForm}>
        <input
          className={styles.NoteName}
          value={inputState.name}
          onChange={handleInputChange}
          name="name"
        />
        {inputState.type === "text" ? (
          <textarea
            name="content"
            key={0}
            value={inputState.content[0]}
            onChange={handleInputChange}
          ></textarea>
        ) : (
          <div className={styles.List}>
            {inputState.content.map((c, index) => {
              return (
                <div className={styles.ListItem}>
                  <span className="material-symbols-sharp">check_box</span>
                  <input
                    className={styles.ListInput}
                    name="content"
                    key={index}
                    data-index={index}
                    value={c}
                    onChange={handleInputChange}
                  />
                </div>
              );
            })}
            <div className={`${styles.ListItem} ${styles.AddItem}`}>
              <span className="material-symbols-sharp">add</span>
              <div>Add Item...</div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.DialogFooter}>
        <button className="btn" onClick={handleSaveClick}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
    </dialog>
  );
});
