package ru.corndev.api.domain;


import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;


@Entity
public class Playground {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Введите название площадки")
    @Column(unique=true)
    private String playgroundName;

    private String playgroundDescription;

    private Long ownerId;
    @JsonFormat(pattern = "dd-MM-yyyy")
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
