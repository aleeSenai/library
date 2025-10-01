import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

// O 'initialData' será os dados do livro que queremos editar.
// O 'onSave' será a função a ser chamada quando clicarmos em "Salvar".
// O 'onCancel' será a função para fechar o formulário.
function BookForm({ initialData, onSave, onCancel }) {
  // 'formData' é o estado que vai guardar os valores dos campos do formulário
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    isbn: ''
  });

  // Este useEffect preenche o formulário com os dados do livro quando ele é aberto para edição
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Função para atualizar o estado sempre que um campo de texto muda
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para lidar com o clique no botão "Salvar"
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que a página recarregue
    onSave(formData); // Chama a função onSave que veio das props
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3, backgroundColor: 'white', borderRadius: 2 }}
    >
      <Typography variant="h6">
        {initialData ? 'Editar Livro' : 'Adicionar Novo Livro'}
      </Typography>
      <TextField
        name="title"
        label="Título"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <TextField
        name="author"
        label="Autor"
        value={formData.author}
        onChange={handleChange}
        required
      />
      <TextField
        name="year"
        label="Ano"
        type="number"
        value={formData.year}
        onChange={handleChange}
        required
      />
      <TextField
        name="isbn"
        label="ISBN"
        value={formData.isbn}
        onChange={handleChange}
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
        <Button onClick={onCancel} variant="outlined">Cancelar</Button>
        <Button type="submit" variant="contained">Salvar</Button>
      </Box>
    </Box>
  );
}

export default BookForm;