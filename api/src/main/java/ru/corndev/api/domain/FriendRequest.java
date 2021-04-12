package ru.corndev.api.domain;

import javax.persistence.*;

@Entity
public class FriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private User requestFrom;

    private User requestTo;

    private int status = 0;

    public FriendRequest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getRequestFrom() {
        return requestFrom;
    }

    public void setRequestFrom(User requestFrom) {
        this.requestFrom = requestFrom;
    }

    public User getRequestTo() {
        return requestTo;
    }

    public void setRequestTo(User requestTo) {
        this.requestTo = requestTo;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
