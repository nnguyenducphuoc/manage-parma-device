package com.phuoc.device.repository;

import com.phuoc.device.model.Device;
import com.phuoc.device.model.SupplyRequest;
import com.phuoc.device.model.SupplyRequestDetail;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DeviceRepository extends MongoRepository<Device, String> {
    Device findByDeviceId(String deviceId);
}
