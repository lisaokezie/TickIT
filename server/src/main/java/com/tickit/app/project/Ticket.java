package com.tickit.app.project;

import com.tickit.app.security.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Ticket {

    public static final String PROPERTY_CREATED_BY = "createdBy";
    public static final String PROPERTY_ASSIGNEE = "assignee";
    public static final String PROPERTY_STATUS = "status";
    public static final String PROPERTY_PROJECT = "project";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    private String description;

    private long dueDate;

    @ManyToOne(targetEntity = User.class)
    private User createdBy;

    @ManyToOne(targetEntity = User.class)
    private User assignee;

    @NotNull
    @ManyToOne(targetEntity = Project.class, optional = false)
    @Cascade(CascadeType.DELETE)
    private Project project;

    @NotNull
    @ManyToOne(targetEntity = Status.class, optional = false)
    @Cascade(CascadeType.DELETE)
    private Status status;

    @CreationTimestamp
    private LocalDateTime creationDate;

    @UpdateTimestamp
    private LocalDateTime modificationDate;
}
