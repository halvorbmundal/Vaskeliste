package com.example.guttavaskbackend.objects;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

@Data
@Getter
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
    @JoinColumn(nullable=false)
    public CleaningSection section;

}
