const { addNoteHandler, getAllNotesHandler,
    getNoteByIdHandler,editNoteByIdHandler,
    deleteNoteByIdHandler } = require('./handler');
// 
const routes = [
    {
        //fungsi route untuk menyimpan data
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },

    {
        //fungsi route untuk menampilkan data
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    
    {
        //fungsi route untuk menampilkan detail data / note
        method: 'GET',
        path:'/notes/{id}',
        handler: getNoteByIdHandler,
    },

    {
        //fungsi mengubah/edit data / note
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },

    {
        //menghapus notes
        method : 'DELETE',
        path: '/notes/{id}',
        handler : deleteNoteByIdHandler,
    }
    
    
];
module.exports = routes;