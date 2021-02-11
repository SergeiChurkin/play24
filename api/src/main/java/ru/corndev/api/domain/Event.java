package ru.corndev.api.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long ownerId = 0L;

    @NotBlank(message = "Заполните название мероприятия")
    @Column(unique=true)
    private String eventName;

    private boolean repeated;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "event")
    private Playground playground;

    @ManyToMany(mappedBy = "events", fetch = FetchType.LAZY)
    private Set<User> users = new HashSet<>();

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Date createdDate;

    //@JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    @NotNull(message = "Выберите дату и время мероприятия")
    private Date eventDate;

    @PrePersist
    protected void onCreate(){
        this.createdDate = new Date();
    }

    public Event() {
    }

    public void addUser(User user){
        users.add(user);
        user.getEvents().add(this);
    }

    public void removeUser(User user){
        users.remove(user);
        user.getEvents().remove(this);
    }
    public void setOwner(User user){
        this.ownerId = user.getId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Playground getPlayground() {
        return playground;
    }

    public void setPlayground(Playground playground) {
        this.playground = playground;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public boolean isRepeated() {
        return repeated;
    }

    public void setRepeated(boolean repeated) {
        this.repeated = repeated;
    }

    public Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }
}
