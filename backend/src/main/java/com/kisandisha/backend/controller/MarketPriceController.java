package com.kisandisha.backend.controller;

import com.kisandisha.backend.MarketPrice;
import com.kisandisha.backend.repository.MarketPriceRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/markets")
@CrossOrigin(origins = "*")
public class MarketPriceController {

    private final MarketPriceRepository repository;

    public MarketPriceController(MarketPriceRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Map<String, Object>> getAllMarkets() {
        return repository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @GetMapping("/history")
    public List<Map<String, Object>> getPriceHistory(
            @RequestParam String commodity,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String district) {

        List<MarketPrice> data =
                repository.findByCommodityContainingIgnoreCase(commodity);

        if (district != null && !district.isBlank()) {
            List<MarketPrice> districtData = data.stream()
                    .filter(m -> m.getDistrict() != null &&
                            m.getDistrict().equalsIgnoreCase(district))
                    .toList();

            if (!districtData.isEmpty()) {
                return districtData.stream()
                        .map(this::toResponse)
                        .toList();
            }
        }

        if (state != null && !state.isBlank()) {
            List<MarketPrice> stateData = data.stream()
                    .filter(m -> m.getState() != null &&
                            m.getState().equalsIgnoreCase(state))
                    .toList();

            if (!stateData.isEmpty()) {
                return stateData.stream()
                        .map(this::toResponse)
                        .toList();
            }
        }

        return data.stream()
                .map(this::toResponse)
                .toList();
    }

    private Map<String, Object> toResponse(MarketPrice m) {
        return Map.of(
                "id", m.getId(),
                "state", m.getState(),
                "district", m.getDistrict(),
                "market", m.getMarket(),
                "commodity", m.getCommodity(),
                "variety", m.getVariety(),
                "grade", m.getGrade(),
                "minPrice", m.getMinPrice(),
                "maxPrice", m.getMaxPrice(),
                "modalPrice", m.getModalPrice()
        );
    }
}