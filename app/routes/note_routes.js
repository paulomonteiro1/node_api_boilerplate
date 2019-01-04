var ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db) {
    const database = db.db('notes');

    app.get('/note/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectId(id) };
        database.collection('note_collection').findOne(details, (err, result) => {
            if(err) res.send(err);
            else res.send(result);
        })
    });

    app.delete('/note/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectId(id) };
        database.collection('note_collection').remove(details, (err, result) => {
            if(err) res.send(err);
            else res.send('Note deleted');
        })
    });

    app.put('/note/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectId(id) };
        const note = { 'titulo': req.body.titulo, 'note': req.body.note};

        database.collection('note_collection').update(details, note,  (err, result) => {
            if(err) res.send(err);
            else res.send(result);
        })
    });

    app.post('/notes', (req, res) => {
        const note = { 'titulo': req.body.titulo, 'note': req.body.note};
        database.collection('note_collection').insert(note, (err, result) => {
           if(err) res.send(err);
           else res.send(result);
       })
    })
}