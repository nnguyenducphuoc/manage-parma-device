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
@Document(collection = "Device")
public class Device {
    @Id
    private String _id;
    private String deviceId;
    private String name;
    private int quantity;
    private String origin;
    private String supplier;
    private DeviceCategory deviceCategory;
}
