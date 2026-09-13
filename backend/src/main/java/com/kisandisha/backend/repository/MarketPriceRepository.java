package com.kisandisha.backend.repository;

import com.kisandisha.backend.MarketPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MarketPriceRepository extends JpaRepository<MarketPrice, Long> {

    List<MarketPrice> findByCommodityContainingIgnoreCase(String commodity);

    List<MarketPrice> findByDistrictContainingIgnoreCase(String district);

    List<MarketPrice> findByStateContainingIgnoreCase(String state);
}