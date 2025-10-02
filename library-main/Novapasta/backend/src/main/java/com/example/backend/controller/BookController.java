package com.example.backend.controller;

import com.example.backend.model.Book;
import com.example.backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService service;

    // GET todos os livros
    @GetMapping
    public ResponseEntity<List<Book>> list() {
        List<Book> books = service.findAll();
        return ResponseEntity.ok(books);
    }

    // GET livro por id
    @GetMapping("/{id}")
    public ResponseEntity<Book> one(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST criar livro
    @PostMapping
    public ResponseEntity<Book> create(@RequestBody Book b) {
        Book savedBook = service.save(b);
        return ResponseEntity.ok(savedBook);
    }

    // PUT atualizar livro
    @PutMapping("/{id}")
    public ResponseEntity<Book> update(@PathVariable Long id, @RequestBody Book b) {
        return service.update(id, b)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE livro
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
