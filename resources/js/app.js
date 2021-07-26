let library;
let currentNoteID;

// Getting Data
function getData(noteId){
    return new Promise((resolve, reject) => {
        const key = (noteId == undefined ? '/' : '/' + noteId); // ternary operator
        database.ref(key).on('value', function(response) {
            resolve(response.val());
        });
    });
}

// Posting Data
function postData(noteObj) {
    return new Promise((resolve, reject) => {
		if (noteObj.noteId && noteObj.noteTitle != undefined) {
			database.ref('/' + noteObj.noteId).set([noteObj.noteTitle, noteObj.noteBody], (err) => { err ? reject(err) : resolve();});
		} else {
			reject();
		}
    });
}

// Delete Data
function deleteData(noteId){
    return new Promise((resolve, reject) => {
      database.ref('/' + noteId).remove();
    });
}

// Initialization
function initApp() {
	getData().then((response) => {
	    library = response;
	    load_library();
	});
}

initApp();