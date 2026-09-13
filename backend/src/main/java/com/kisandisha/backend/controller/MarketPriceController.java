package com.kisandisha.backend.controller;

import com.kisandisha.backend.MarketPrice;
import com.kisandisha.backend.repository.MarketPriceRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/markets")
@CrossOrigin(origins = "http://localhost:5175")
public class MarketPriceController {

    private final MarketPriceRepository repository;

    public MarketPriceController(MarketPriceRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MarketPrice> getAllMarkets() {
        return repository.findAll();
    }

    @GetMapping("/history")
    public List<MarketPrice> getPriceHistory(
            @RequestParam String commodity) {

        return repository.findByCommodityContainingIgnoreCase(commodity);
    }
}