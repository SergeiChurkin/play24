package ru.corndev.api.domain;


import javax.persistence.*;
import java.util.Date;


@Entity
public class Playground {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String playgroundName;

    private String playgroundDescription;

    private Long ownerId;

    private Date createdDate;

    @PrePersist
    protected void onCreate(){
        this.createdDate = new Date();
    }

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

    public String getPlaygroundDescription() {
        return playgroundDescription;
    }

    public void setPlaygroundDescription(String playgroundDescription) {
        this.playgroundDescription = playgroundDescription;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
}
