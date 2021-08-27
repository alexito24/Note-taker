const fs = require('fs');
const path = require('path');

module.exports = app => {

    // Setup notes variable
    fs.readFile("db/db.json", "utf8", (err, data) => {

        if (err) return err;

        let notes = JSON.parse(data);

        // Setup the /api/notes routes
        app.get("/api/notes", function(req, res) {

            res.json(notes);
        });

        app.post("/api/notes", (req, res) => {
            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log(`Added new note: ${newNote.title}`);
        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", (req,res) => {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id "+req.params.id);
        });

        // Display notes.html when /notes is accessed
        app.get('/notes', (req,res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // Display index.html when all other routes are accessed
        app.get('*', (req,res) =>{
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}