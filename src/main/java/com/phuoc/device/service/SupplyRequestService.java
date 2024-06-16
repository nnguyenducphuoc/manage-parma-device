package com.phuoc.device.service;

import com.phuoc.device.model.SupplyRequest;
import com.phuoc.device.repository.SupplyRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplyRequestService {
    private final SupplyRequestRepository supplyRequestRepository;

    public SupplyRequestService(SupplyRequestRepository supplyRequestRepository) {
        this.supplyRequestRepository = supplyRequestRepository;
    }

    public SupplyRequest addSupplyRequest(SupplyRequest supplyRequest) {
        return supplyRequestRepository.save(supplyRequest);
    }

    public List<SupplyRequest> getAllSupplyRequests() {
        return supplyRequestRepository.findAll();
    }

    public SupplyRequest findSupplyRequestByRequestId(String requestId) {
        return supplyRequestRepository.findByRequestId(requestId);
    }
}
