package com.phuoc.device.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "DeviceCategory")
public class DeviceCategory {
    private String categoryId;
    private String categoryName;
    private String description;
}
