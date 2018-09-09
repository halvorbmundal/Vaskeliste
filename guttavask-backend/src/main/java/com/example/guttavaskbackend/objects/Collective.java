package com.example.guttavaskbackend.objects;

import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

@Data
@Builder
@Entity
@DynamicUpdate
@Table(name = "housing_collectives")
public class Collective {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    public long id;

    @Column
    public String name;

    @Column(columnDefinition="int default 0")
    public int counter = 0;
}
