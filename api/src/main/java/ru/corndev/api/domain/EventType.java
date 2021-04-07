package ru.corndev.api.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
public class EventType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Заполните название типа мероприятия")
    @Column(unique=true)
    private String typeName;

    @OneToMany(mappedBy = "eventType")
    @JsonIgnore
    private Set<Event> events = new HashSet<>();

    public EventType() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    @Override
    public String toString() {
        return "EventType{" +
                "id=" + id +
                ", typeName='" + typeName + '\'' +
                '}';
    }
}
