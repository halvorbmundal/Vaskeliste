package com.example.guttavaskbackend.objects;

import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Builder
@Entity
@DynamicUpdate
@Table(name = "Users")
public class ApplicationUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id;

    @Column
    public String username;

    @Column
    public String email;

    @Column
    private String password;

    @Column
    private boolean isCollectiveAdmin;

    @Column boolean isAcceptedInCollective;

    @ManyToOne
    @JoinColumn
    public Collective collective;
}
