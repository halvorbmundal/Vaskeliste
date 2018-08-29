package com.example.guttavaskbackend.objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;


@Data
@ToString(exclude = { "section" })
@Builder
@Entity
@DynamicUpdate
@Table(name = "cleaning_tasks")
public class CleaningTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    public long id;

    @Column
    public String name;

    @Column
    public boolean isComplete;

    @ManyToOne
    @JoinColumn(name = "section_id")
    @JsonIgnore
    public CleaningSection section;

}
