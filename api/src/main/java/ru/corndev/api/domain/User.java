package ru.corndev.api.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Заполните имя пользователя")
    @Column(unique=true)
    private String username;

    @NotBlank(message = "Введите номер телефона")
    @Column(unique=true)
    private String phone;

    @NotBlank(message = "Введите E-mail")
    @Column(unique=true)
    private String email;

    private String password;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Event> events;

    public User() {
    }

    public void addEvent( Event event){
        events.add(event);
        event.setOwner(this);
    }

    public void deleteEvent(Event event){
        events.remove(event);
        event.setOwner(null);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
