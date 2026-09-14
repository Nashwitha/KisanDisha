
package com.kisandisha.backend.service;

import com.kisandisha.backend.MarketPrice;
import com.kisandisha.backend.repository.MarketPriceRepository;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class MarketPriceService {

    private final MarketPriceRepository repository;

    public MarketPriceService(MarketPriceRepository repository) {
        this.repository = repository;
    }

    public void loadCsvData() {
        if (repository.count() > 0) {
    System.out.println("Market data already exists. Skipping CSV load.");
    return;
}

        try {
            InputStream inputStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream("data/market_prices.csv");

            if (inputStream == null) {
                throw new RuntimeException("market_prices.csv not found");
            }

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(inputStream, StandardCharsets.UTF_8)
            );

            String line;
            boolean firstLine = true;

            List<MarketPrice> records = new ArrayList<>();

            while ((line = reader.readLine()) != null) {

                if (firstLine) {
                    firstLine = false;
                    continue;
                }

                String[] values = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);

                if (values.length < 10) {
                    continue;
                }

                MarketPrice marketPrice = new MarketPrice();

                marketPrice.setState(values[0]);
                marketPrice.setDistrict(values[1]);
                marketPrice.setMarket(values[2]);
                marketPrice.setCommodity(values[3]);
                marketPrice.setVariety(values[4]);
                marketPrice.setGrade(values[5]);
                marketPrice.setArrivalDate(values[6]);

                marketPrice.setMinPrice(parsePrice(values[7]));
                marketPrice.setMaxPrice(parsePrice(values[8]));
                marketPrice.setModalPrice(parsePrice(values[9]));

                records.add(marketPrice);
            }

            repository.saveAll(records);

            System.out.println("CSV data loaded successfully: " + records.size() + " records");

        } catch (Exception e) {
            throw new RuntimeException("Error loading CSV data", e);
        }
    }

    private Double parsePrice(String value) {

        if (value == null || value.trim().isEmpty()) {
            return null;
        }

        return Double.parseDouble(value.trim());
    }
}

