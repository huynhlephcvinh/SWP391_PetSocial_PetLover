package com.petlover.petsocial.repository;

import com.petlover.petsocial.model.entity.Exchange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ExchangeRepository extends JpaRepository<Exchange, Long> {

}
