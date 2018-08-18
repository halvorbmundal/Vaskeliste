package com.example.guttavaskbackend.objects;

import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

@Data
@Builder
@Entity
@DynamicUpdate
@Table(name = "cleaning_sections")
public class CleaningSection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    public long id;

    @Column
    public String name;

    @ManyToOne
    @JoinColumn(nullable=false)
    public Collective collective;

    @ManyToOne
    @JoinColumn
    public ApplicationUser responsibleUser;
}