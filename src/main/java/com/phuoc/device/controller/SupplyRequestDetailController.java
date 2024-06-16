package com.phuoc.device.controller;

import com.phuoc.device.model.SupplyRequestDetail;
import com.phuoc.device.service.SupplyRequestDetailService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class SupplyRequestDetailController {
    private final SupplyRequestDetailService supplyRequestDetailService;

    public SupplyRequestDetailController(SupplyRequestDetailService supplyRequestDetailService) {
        this.supplyRequestDetailService = supplyRequestDetailService;
    }

    @GetMapping("/supply-request-details/{id}")
    public List<SupplyRequestDetail> getSupplyRequestDetail(@PathVariable String id) {
        return supplyRequestDetailService.findSupplyRequestDetailBySupplyRequest(id);
    }

    @PostMapping("/update-approved-quantities/{id}")
    public void updateApprovedQuantities(@RequestBody Map<String, Integer> approvedQuantitiesMap, @PathVariable String id) {
        supplyRequestDetailService.updateApprovedQuantities(approvedQuantitiesMap, id);
    }
}
