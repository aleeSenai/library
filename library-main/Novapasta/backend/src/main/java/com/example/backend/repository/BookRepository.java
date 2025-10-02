package com.example.backend.repository;

import com.example.backend.model.Book;
// import com.example.backend.service.BookService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {}
