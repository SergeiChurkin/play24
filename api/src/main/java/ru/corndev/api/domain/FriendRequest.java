package ru.corndev.api.domain;

import javax.persistence.*;

@Entity
public class FriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long requestFromUserId;

    private Long requestToUserId;

    private int status;

    public FriendRequest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRequestFromUserId() {
        return requestFromUserId;
    }

    public void setRequestFromUserId(Long requestFromUserId) {
        this.requestFromUserId = requestFromUserId;
    }

    public Long getRequestToUserId() {
        return requestToUserId;
    }

    public void setRequestToUserId(Long requestToUserId) {
        this.requestToUserId = requestToUserId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
