package ru.corndev.api.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinTable(name = "event_playground",
            joinColumns =
                    { @JoinColumn(name = "event_id", referencedColumnName = "id") },
            inverseJoinColumns =
                    { @JoinColumn(name = "playground_id", referencedColumnName = "id") })
    private Playground playground;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date createdDate;

    @PrePersist
    protected void onCreate(){
        this.createdDate = new Date();
    }

    public Event() {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
}
