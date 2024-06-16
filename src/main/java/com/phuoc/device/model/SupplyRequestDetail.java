package com.phuoc.device.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "SupplyRequestDetail")
public class SupplyRequestDetail {
    @Id
    private String _id;
    private String supplyRequest;
    private String device;
    private int requestedQuantity;
    private String reason;
    private int approvedQuantity;
}
