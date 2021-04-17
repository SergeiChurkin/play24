package ru.corndev.api.domain;

import javax.persistence.*;

@Entity
public class FriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long requestFromId;

    private Long requestToId;

    private int status;

    public FriendRequest() {
    }

    public Long getRequestFromId() {
        return requestFromId;
    }

    public void setRequestFromId(Long requestFromId) {
        this.requestFromId = requestFromId;
    }

    public Long getRequestToId() {
        return requestToId;
    }

    public void setRequestToId(Long requestToId) {
        this.requestToId = requestToId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
