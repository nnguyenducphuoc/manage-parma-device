package com.phuoc.device.service;

import com.phuoc.device.model.Device;
import com.phuoc.device.model.SupplyRequestDetail;
import com.phuoc.device.repository.DeviceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DeviceService {
    private final DeviceRepository deviceRepository;


    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public Device getDevice(String deviceId) {
        return deviceRepository.findByDeviceId(deviceId);
    }

    public void updateDeviceQuantities(Map<String, Integer> approvedQuantitiesMap) {

        List<Device> currentSupplyRequests = deviceRepository.findAll();


        for (Map.Entry<String, Integer> entry : approvedQuantitiesMap.entrySet()) {
            String deviceId = entry.getKey();
            Integer newApprovedQuantity = entry.getValue();

            Device supplyRequestToUpdate = currentSupplyRequests.stream()
                    .filter(sr -> sr.getDeviceId().equals(deviceId))
                    .findFirst()
                    .orElse(null);

            if (supplyRequestToUpdate != null && supplyRequestToUpdate.getQuantity() >= newApprovedQuantity) {

                supplyRequestToUpdate.setQuantity(supplyRequestToUpdate.getQuantity()-newApprovedQuantity);

                deviceRepository.save(supplyRequestToUpdate);
            }
        }
    }
}
