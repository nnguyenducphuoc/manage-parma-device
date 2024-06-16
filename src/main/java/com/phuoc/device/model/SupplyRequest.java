package com.phuoc.device.model;

import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "SupplyRequest")
public class SupplyRequest {
    @Id
    private String requestId;

    private Department department;

    private User createdBy;

    @Nullable
    private User approvedBy;

    @Nullable
    private User acknowledgedBy;

    private Date createdDate;
    @Nullable
    private Date approvedDate;
    @Nullable
    private Date acknowledgedDate;
    private String status;


}
