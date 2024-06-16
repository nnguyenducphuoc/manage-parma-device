package com.phuoc.device.controller;

import com.phuoc.device.model.SupplyRequest;
import com.phuoc.device.service.SupplyRequestService;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class SupplyRequestController {

    private final SupplyRequestService supplyRequestService;
    private final MongoTemplate mongoTemplate;

    public SupplyRequestController(SupplyRequestService supplyRequestService, MongoTemplate mongoTemplate) {
        this.supplyRequestService = supplyRequestService;
        this.mongoTemplate = mongoTemplate;
    }

    @PostMapping("/addSupplyRequest")
    public SupplyRequest addSupplyRequest(@RequestBody SupplyRequest supplyRequest) {
        return supplyRequestService.addSupplyRequest(supplyRequest);
    }

    @GetMapping("/getAllSupplyRequest")
    public List<SupplyRequest> getAllSupplyRequest() {
        return supplyRequestService.getAllSupplyRequests();
    }

    @GetMapping("/rejectSupplyRequestByRequestId/{requestId}")
    public SupplyRequest updateSupplyRequestByRequestId(@PathVariable String requestId) {
        String newStatus = "Từ chối";
        // Tìm supply request dựa trên requestId
        return getSupplyRequest(requestId, newStatus);
    }

    @GetMapping("/approveSupplyRequestByRequestId/{requestId}")
    public SupplyRequest approveSupplyRequestByRequestId(@PathVariable String requestId) {
        String newStatus = "Đã duyệt";
        // Tìm supply request dựa trên requestId
        return getSupplyRequest(requestId, newStatus);
    }

    @GetMapping("/confirmSupplyRequestByRequestId/{requestId}")
    public SupplyRequest confirmSupplyRequestByRequestId(@PathVariable String requestId) {
        String newStatus = "Đã xác nhận";
        // Tìm supply request dựa trên requestId
        return getSupplyRequest(requestId, newStatus);
    }

    private SupplyRequest getSupplyRequest(@PathVariable String requestId, String newStatus) {
        SupplyRequest supplyRequest = fillSupplyRequest(requestId);

        if (supplyRequest != null) {
            // Cập nhật trường status
            Query query = new Query(Criteria.where("requestId").is(requestId));
            Update update = new Update().set("status", newStatus);

            // Thực hiện cập nhật
            mongoTemplate.updateFirst(query, update, SupplyRequest.class);
        }

        return fillSupplyRequest(requestId);
    }

    private SupplyRequest fillSupplyRequest(String requestId) {
        return supplyRequestService.findSupplyRequestByRequestId(requestId);
    }
}
