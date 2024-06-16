package com.phuoc.device.repository;

import com.phuoc.device.model.SupplyRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SupplyRequestRepository extends MongoRepository<SupplyRequest, String> {
    SupplyRequest findByRequestId(String requestId);
}
