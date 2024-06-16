package com.phuoc.device.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "User")
public class User {
    @Id
    private String userId;
    private String password;
    private String name;
    private String email;
    private Date birthDate;
    private int identityCard;
    private String address;
    private String status;
    private Position position;
    private Department department;

}
