import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import api from '../services/api';
import BookForm from './BookForm'; 

import { Box, Typography, IconButton, Modal, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const mockData = [
  { id: 1, title: "O Senhor dos Anéis", author: "J.R.R. Tolkien", year: 1954, isbn: "978-3-16-148410-0" },
  { id: 2, title: "1984", author: "George Orwell", year: 1949, isbn: "978-0-452-28423-4" },
  { id: 3, title: "Duna", author: "Frank Herbert", year: 1965, isbn: "978-0-441-01359-3" },
];

// Estilo para o Modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BookList() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    // Quando o backend estiver pronto, esta chamada irá funcionar
    api.get('/books')
      .then(response => {
        setBooks(response.data.length > 0 ? response.data : mockData);
      })
      .catch(() => {
        setBooks(mockData); // Se falhar, usa os dados de exemplo
      });
  }, []);

  // --- FUNÇÕES DE MANIPULAÇÃO ---
  const handleOpenModal = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingBook(null);
    setIsModalOpen(false);
  };

  const handleAddNewBook = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const handleSaveBook = (bookData) => {
    const isEditing = bookData.hasOwnProperty('id');
    const request = isEditing 
      ? api.put(`/books/${bookData.id}`, bookData) 
      : api.post('/books', bookData);

    request
      .then(response => {
        if (isEditing) {
          setBooks(books.map(book => (book.id === bookData.id ? response.data : book)));
        } else {
          setBooks([...books, response.data]);
        }
      })
      .catch(error => console.error("Erro ao salvar o livro!", error))
      .finally(() => handleCloseModal());
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem a certeza de que deseja apagar este livro?")) {
      api.delete(`/books/${id}`)
        .then(() => {
          setBooks(books.filter(book => book.id !== id));
        })
        .catch(error => console.error("Erro ao apagar o livro!", error));
    }
  };

  // --- DEFINIÇÃO DAS COLUNAS ---
  // Precisa de estar DENTRO do componente para aceder às funções 'handle'
  const columns = [
    { field: 'title', headerName: 'Título', flex: 1 },
    { field: 'author', headerName: 'Autor', width: 200 },
    { field: 'year', headerName: 'Ano', width: 100 },
    { field: 'isbn', headerName: 'ISBN', width: 150 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenModal(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <Box sx={{ height: 400, width: '90%', margin: '2rem auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Catálogo de Livros
        </Typography>
        <Button variant="contained" onClick={handleAddNewBook}>
          Adicionar Novo Livro
        </Button>
      </Box>

      <DataGrid rows={books} columns={columns} />

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <BookForm
            initialData={editingBook}
            onSave={handleSaveBook}
            onCancel={handleCloseModal}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default BookList;