package com.phuoc.device.controller;

import com.phuoc.device.model.Device;
import com.phuoc.device.service.DeviceService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class DeviceController {
    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping("/devices/{id}")
    public Device getDeviceById(@PathVariable String id) {
        return deviceService.getDevice(id);
    }

    @PostMapping("/update-device-quantities")
    public void updateDeviceQuantities(@RequestBody Map<String, Integer> approvedQuantitiesMap) {
        deviceService.updateDeviceQuantities(approvedQuantitiesMap);
    }
}
