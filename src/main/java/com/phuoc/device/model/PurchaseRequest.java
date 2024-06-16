package com.phuoc.device.model;

import com.mongodb.lang.NonNull;
import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "PurchaseRequest")
public class PurchaseRequest {
    @Id
    private String requestId;

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
