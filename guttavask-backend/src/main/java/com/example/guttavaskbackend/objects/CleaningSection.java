package com.example.guttavaskbackend.objects;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@Data
@ToString(exclude = { "cleaningTasks" })
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

    @OneToMany(
            mappedBy = "section",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    public List<CleaningTask> cleaningTasks;
}