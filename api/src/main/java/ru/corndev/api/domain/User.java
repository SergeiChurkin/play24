package ru.corndev.api.domain;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Введите Email в качестве имени пользователя")
    @NotBlank(message = "Заполните имя пользователя")
    @Column(unique=true)
    private String username;

    @NotBlank(message = "Введите номер телефона")
    @Column(unique=true)
    private String phone;
    @NotBlank(message = "Введите пароль")
    private String password;
    @Transient
    private String confirmPassword;

    private String nickname;

    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Event> events = new HashSet<>();

    public User() {
    }

/*    public void addEvent(Event event){
        events.add(event);
        //event.setOwner(this);
    }

    public void deleteEvent(Event event){
        events.remove(event);
        //event.setOwner(null);
    }*/

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

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


}
