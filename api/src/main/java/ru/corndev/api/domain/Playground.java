package ru.corndev.api.domain;


import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;


@Entity
@Table(name = "playgrounds")
public class Playground {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Введите название площадки")
    @Column(unique=true)
    private String playgroundName;

    @NotBlank(message = "Необходимо указать адрес")
    private String address;

    @OneToOne(mappedBy = "playground")
    private Event event;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinTable(name = "playground_coordinates",
            joinColumns =
                    { @JoinColumn(name = "playground_id", referencedColumnName = "id") },
            inverseJoinColumns =
                    { @JoinColumn(name = "coordinate_id", referencedColumnName = "id") })
    private Coordinate coordinates;


    public Playground() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlaygroundName() {
        return playgroundName;
    }

    public void setPlaygroundName(String playgroundName) {
        this.playgroundName = playgroundName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Coordinate getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Coordinate coordinates) {
        this.coordinates = coordinates;
    }
}
