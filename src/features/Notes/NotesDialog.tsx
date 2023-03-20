/******************************************************************

           Name: NoteDialog
    Description: Dialog box for editing notes
    Return Type: JSX.Element
          Props: note: noteType,
                 closeDialog: event: React.MouseEvent<HTMLButtonElement> => void,
                 dispatch: Redux event dispatcher
  Redux Actions: deleteNote(id: string),
                 updateNoteName(id: string, name: string),
                 updateNoteContent(id: string, contentId: string, checked: boolean, value: string),
                 addNoteItem(id: string, contentId: string),
                 deleteNoteContent(id: string, contentId: string)
Redux Selectors: (none)

******************************************************************/

import React, { forwardRef, useState, useEffect } from "react";

//Styles
import styles from "./NotesDialog.module.css";

//Redux Imports
import type { AppDispatch } from "../../app/store";
import {
  //types
  noteType,
  contentType,

  //actions
  deleteNote,
  updateNoteName,
  updateNoteContent,
  addNoteItem,
  deleteNoteContent,
} from "./NotesSlice";

//Types
type dialogProps = {
  note: noteType;
  closeDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dispatch: AppDispatch;
};

export const NoteDialog = forwardRef<HTMLDialogElement, dialogProps>(
  (props, ref) => {
    const [inputState, setInputState] = useState<noteType>(props.note);

    //update from from props (parent passes redux state)
    useEffect(() => {
      setInputState(props.note);
    }, [props.note]);

    const handleNameChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setInputState(Object.assign({}, inputState, { name: e.target.value }));
      props.dispatch(
        updateNoteName({ id: inputState.id, name: e.target.value })
      );
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
  }
);
