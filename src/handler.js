//import nanoid dari package nya
const { nanoid } = require ('nanoid');
const notes = require("./notes");

//menyimpan note 
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    
    //cara menggunakan method nanoid
    const id = nanoid(16);

    //menambahkan propoerti CreateAt dan UpdateAt
    //karena kasus nya menambah catatan baru, jadi seharusnya nilai nya sama
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    //VarNotes merupakan nama variable di module notes.js
    notes.push(newNote);

    //cara mengecheck apa "newNote sudah masuk ke dalam array notes"
    const isSuccess = notes.filter((note)=> note.id === id).length > 0;
    if (isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data:{
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response ({
        status: 'fail',
        message: 'Catatan gagal di tambahkan',
    });
    response.code(500);
    return response;
};

//menampilkan data setelah disimpan
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});


//menampilkan detail data
const getNoteByIdHandler = (request, h) => {
    //pertama dapatkan dahulu nilai id dari "request.params"
    const { id } = request.params;
    //setelah dapat id,kemudian dapatkan objek note dengan id tersebut
    //dari object array notes.gunakan method array filter()
    const note = notes.filter((n) => n.id === id)[0];
    //pastikan dulu objek note tidak bernilai undefined. Bila undefined
    //kembalikan dengan respons gagal
    if (note !== undefined){
        return{
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan', 
    });
    response.code(404);
    return response;
};

//fungsi untuk mengubah data
const editNoteByIdHandler = (request, h) => {
    //dapatkan nilai id nya
    const { id } = request.params;
    //dapatkan data notes terbaru yang dikirim oleh client
    //melalui body request
    const { title, tags, body } = request.payload;
    /*tentu kita perlu perbarui juga nilai dari properti updatedAt. 
    Jadi, dapatkan nilai terbaru dengan menggunakan 
    new Date().toISOString(). */
    const updatedAt = new Date ().toISOString();
    /*saatnya mengubah catatan lama dengan data terbaru. Kita akan 
    mengubahnya dengan memanfaatkan indexing array, 
    silakan gunakan teknik lain bila menurut Anda lebih baik yah
    Pertama, dapatkan dulu index array pada objek catatan sesuai 
    id yang ditentukan. Untuk melakukannya, gunakanlah method array 
    "findIndex()"". */
    const index = notes.findIndex((note) => note.id === id);
    /*bila "note" dengan "id" ditemukan, maka index akan bernilai array
    index dari objek catatan yang dicari, jika tidak ketemu maka nilai index -1 */
    if (index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        const response = h.response ({
            status: 'success',
            message: 'Catatan berhasil di perbaharui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message : 'Gagal memperbaharui catatan',
    });
    response.code(404);
    return response;   
};

//fungsi untuk menghapus data / note
const deleteNoteByIdHandler = (request, h) => {
    //dapatkan dulu nilai id yang dikirim melalui path parameters.
    const { id } = request.params;
    //dapatkan index dari objek catatan sesuai dengan id yang didapat
    const index = notes.findIndex((note) => note.id === id);
    /*Lakukan pengecekan terhadap nilai index, pastikan nilainya tidak 
    -1 bila hendak menghapus catatan. Nah, untuk menghapus data pada array 
    ber9dasarkan index, gunakan method "array splice()".*/
    if (index !== -1){
        notes.splice(index,1);
        const response = h.response({
            status: 'success',
            message: 'Catatan Berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    //Bila index bernilai -1, maka kembalikan handler 
    //dengan respons gagal.
    const respons = h.respons({
        status: 'fail',
        message: 'Catatan gagal dihapus.id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { addNoteHandler, getAllNotesHandler,
    getNoteByIdHandler, editNoteByIdHandler, 
    deleteNoteByIdHandler };
    //
/*
untuk mengekspor fungsi handler ini, kita gunakan 
objek literals yah. Ini bertujuan untuk memudahkan 
ekspor lebih  dari satu nilai pada satu berkas JavaScript.
*/