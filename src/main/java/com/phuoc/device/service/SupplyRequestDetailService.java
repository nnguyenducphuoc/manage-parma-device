package com.phuoc.device.service;

import com.phuoc.device.model.SupplyRequestDetail;
import com.phuoc.device.repository.SupplyRequestDetailRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class SupplyRequestDetailService {
    private final SupplyRequestDetailRepository supplyRequestDetailRepository;

    public SupplyRequestDetailService(SupplyRequestDetailRepository supplyRequestDetailRepository) {
        this.supplyRequestDetailRepository = supplyRequestDetailRepository;
    }

    public List<SupplyRequestDetail> findSupplyRequestDetailBySupplyRequest(String idRequest) {
        return supplyRequestDetailRepository.findBySupplyRequest(idRequest);
    }

    public void updateApprovedQuantities(Map<String, Integer> approvedQuantitiesMap, String id) {

        List<SupplyRequestDetail> currentSupplyRequests = supplyRequestDetailRepository.findAllBySupplyRequest(id);

        
        for (Map.Entry<String, Integer> entry : approvedQuantitiesMap.entrySet()) {
            String deviceId = entry.getKey();
            Integer newApprovedQuantity = entry.getValue();

            SupplyRequestDetail supplyRequestToUpdate = currentSupplyRequests.stream()
                    .filter(sr -> sr.getDevice().equals(deviceId))
                    .findFirst()
                    .orElse(null);

            if (supplyRequestToUpdate != null && supplyRequestToUpdate.getApprovedQuantity() != newApprovedQuantity) {

                supplyRequestToUpdate.setApprovedQuantity(newApprovedQuantity);

                supplyRequestDetailRepository.save(supplyRequestToUpdate);
            }
        }
    }
}
