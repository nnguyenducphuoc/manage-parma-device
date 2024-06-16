package com.phuoc.device.repository;

import com.phuoc.device.model.SupplyRequestDetail;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SupplyRequestDetailRepository extends MongoRepository<SupplyRequestDetail, String> {
    List<SupplyRequestDetail> findBySupplyRequest(String supplyRequest);
    List<SupplyRequestDetail> findAllBySupplyRequest(String supplyRequest);
}
