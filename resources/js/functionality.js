class Success_Error {
  constructor (type, error_title, error_body) {
    this.error_title = error_title;
    this.error_body = error_body;

    this.htmlElements = `<div class="status_notifier ${type}">
        <i class="material-icons">${type.trim() == 'success' ? 'check_circle_outline' : 'highlight_off'}</i>
        <div>
            <span>${error_title}</span>
            <span>${error_body}</span>
        </div>
    </div>`
  }

  show () {
    document.querySelector('body').insertAdjacentHTML('beforeend',this.htmlElements);
    setTimeout(() => {
        document.querySelector('.status_notifier').remove();
    }, 3000)
  }
}

function newNote(){
    document.getElementById('note_title').value = 'New Note';
    document.getElementById('note_body').value = '';
    currentNoteID = Date.now();
}

function editNote(noteId){
    // Remove Active Class
    document.querySelector('.active') != null ? document.querySelector('.active').classList.remove('active') : '';
        
    // Add Active Class 
    const selectedNote = document.querySelector(`[data-note_id="${noteId}"]`);
    selectedNote.classList.add('active');

    // Copy Note To Edit
    document.getElementById('note_title').value = library[noteId][0];
    document.getElementById('note_body').value = library[noteId][1];
    currentNoteID = noteId;
}

function saveNoteHandler(){
    // Data
    const noteData = {};
    noteData.noteId = currentNoteID;
    noteData.noteTitle = document.getElementById('note_title').value; 
    noteData.noteBody = document.getElementById('note_body').value;

    // Post Request
    postData(noteData).then((res) => {
        library[noteData.noteId] = [noteData.noteTitle, noteData.noteBody];
        load_library();
        saving_success.show(); 
    }).catch((err) => saving_error.show());
}

function deleteNoteHandler(){
    try {
        deleteData(currentNoteID);
        delete library[currentNoteID];
        load_library();
        deleting_success.show();
    } catch (err) {
        deleting_error.show();
    } 
}

function load_library() {
    let noteList = document.createElement('ul');

    if(library != null){
        for (let noteId in  library) {
            const note = document.createElement('li');
            note.setAttribute('data-note_id', noteId);
            note.textContent = library[noteId][0];
            noteList.appendChild(note);
            note.addEventListener('click', () => {editNote(note.dataset.note_id)});
        }
    }

    // Removing If Note List Present Already
    const book_shelf = document.querySelector('#book_shelf ul'); 
    book_shelf != null ? book_shelf.remove() : '';

    // Appending Notes List
    document.querySelector('#book_shelf').appendChild(noteList);

    // EventListener To Save, Delete And New Note
    document.getElementById('note_new').addEventListener('click', newNote);
    document.getElementById('note_save').addEventListener('click', saveNoteHandler);
    document.getElementById('note_remove').addEventListener('click', deleteNoteHandler);
    
    // Selecting Last List Item Or Selecting the Previous note
    try{ 
        const selector = currentNoteID != null ? `[data-note_id="${currentNoteID}"]` : ':last-child';
        document.querySelector(`#book_shelf ul li${selector}`).click();
    }  catch(err){ 
        newNote();
    }
}

const saving_success = new Success_Error('success', 'Success.', 'Saved Notes Successfully.');
const saving_error = new Success_Error('error', 'Error.', 'Error Saving Notes !!!');
const deleting_success = new Success_Error('success','Success','Deleted Note Successfully');
const deleting_error = new Success_Error('error','Error','Error Deleting Notes !!!');