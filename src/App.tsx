import "./App.css";

import { useState } from "react";

const App = () => {
  
  type Note = {
    id: number;
    title: string;
    content: string;
  };
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Note #1",
      content: "Content of Note 1"
    },
    {
      id: 2,
      title: "Note #2",
      content: "Content of Note 2"
    },
    {
      id: 3,
      title: "Note #3",
      content: "Content of Note 3"
    },
    {
      id: 4,
      title: "Note #4",
      content: "Content of Note 4"
    },
    {
      id: 5,
      title: "Note #5",
      content: "Content of Note 5"
    },
    {
      id: 6,
      title: "Note #6",
      content: "Content of Note 6"
    }
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  
  const noteItems = notes.map(note => {
    return (
      <div 
        key={note.id} 
        className="note-item"
        onClick={() => handleNoteClick(note)}
      >
        <div className="notes-header">
          <button onClick={(event) => deleteNote(event, note.id)}>x</button>            
        </div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    );
  });  
    
  const handleAddButton = (event: React.FormEvent) => {
    event.preventDefault();
  
    const newNote: Note  = {
      id: notes.length + 1,
      title: title,
      content: content,
    };
  
    setNotes([newNote, ...notes]);
  
    setTitle('');
    setContent('');
  };
  
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdatNote = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedNote) {
      return;
    }
    
    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };
    
    const updatedNotesList = notes.map(note => (
      note.id === selectedNote.id ? updatedNote : note 
    ));
    
    setNotes(updatedNotesList);
    setTitle('');
    setContent('');
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setSelectedNote(null);
  };
  
  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    const updatedNote = notes.filter(note => note.id !==  noteId);

    setNotes(updatedNote);
  }


  return (
    <div className="app-container">
      <form 
        onSubmit={(event) => (selectedNote ? handleUpdatNote(event) : handleAddButton(event))}  
        className="note-form"
      >
        <input 
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}  
          placeholder="Title" 
          required 
        />
        <textarea 
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content" 
          rows={10} 
          required
        >
        </textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
        <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {noteItems}
      </div>
    </div>
  );
}

export default App;