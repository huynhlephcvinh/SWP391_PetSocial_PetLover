package com.petlover.petsocial.repository;

import com.petlover.petsocial.model.entity.Exchange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeRepository extends JpaRepository<Exchange, Integer> {
    public Exchange findById(int id);
    @Query(value = "Select * from exchange",nativeQuery = true)
    public List<Exchange> getAllExchange();
}
