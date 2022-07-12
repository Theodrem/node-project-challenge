/*
Script de création de la base de données de test.
A noter, on utilise une stratégie avec DROP et IF NOT EXISTS afin de rendre 
notre script réutilisable dans le future, même si la base existe déjà
*/
create database IF NOT EXISTS challenge_dev;

/* Créer l'utilisateur API */
create user IF NOT EXISTS 'api-dev'@'%.%.%.%' identified by 'api-dev-password';
grant select, update, insert, delete on challenge_dev.* to 'api-dev'@'%.%.%.%';
flush privileges;

-- MySQL Script generated by MySQL Workbench
-- Wed Jun 22 13:06:54 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema challenge_dev
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema challenge_dev
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `challenge_dev` DEFAULT CHARACTER SET utf8 ;
USE `challenge_dev` ;

-- -----------------------------------------------------
-- Table `challenge_dev`.`promotion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challenge_dev`.`promotion` (
  `id_promotion` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_promotion`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `challenge_dev`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challenge_dev`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `ROLE` VARCHAR(30) NOT NULL DEFAULT 'ROLE_USER',
  `promotion_id` INT NULL,
  UNIQUE INDEX (`email` ASC) VISIBLE,
  PRIMARY KEY (`id_user`),
  INDEX `fk_user_promotion1_idx` (`promotion_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_promotion1`
    FOREIGN KEY (`promotion_id`)
    REFERENCES `challenge_dev`.`promotion` (`id_promotion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `challenge_dev`.`instance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challenge_dev`.`instance` (
  `id_instance` INT NOT NULL AUTO_INCREMENT,
  `ssh_key` VARCHAR(300) NOT NULL,
  `ip_adress` VARCHAR(45) NOT NULL,
  `username` VARCHAR(200) NOT NULL,
  `is_connected` TINYINT NOT NULL DEFAULT 0,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_instance`, `id_user`),
  INDEX `fk_Instance_user_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_Instance_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `challenge_dev`.`user` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `challenge_dev`.`challenge`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challenge_dev`.`challenge` (
  `id_challenge` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `expiration_date` DATETIME NULL,
  `id_test` INT NULL,
  PRIMARY KEY (`id_challenge`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `challenge_dev`.`challenge_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challenge_dev`.`challenge_user` (
  `id_challenge` INT NOT NULL,
  `id_user` INT NOT NULL,
  `score` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_challenge`, `id_user`),
  INDEX `fk_challenge_has_user_user1_idx` (`id_user` ASC) VISIBLE,
  INDEX `fk_challenge_has_user_challenge1_idx` (`id_challenge` ASC) VISIBLE,
  CONSTRAINT `fk_challenge_has_user_challenge1`
    FOREIGN KEY (`id_challenge`)
    REFERENCES `challenge_dev`.`challenge` (`id_challenge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_challenge_has_user_user1`
    FOREIGN KEY (`id_user`)
    REFERENCES `challenge_dev`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `challenge_dev`.`challenge_promotion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challenge_dev`.`challenge_promotion` (
  `id_challenge` INT NOT NULL,
  `id_promotion` INT NOT NULL,
  PRIMARY KEY (`id_challenge`, `id_promotion`),
  INDEX `fk_challenge_has_promotion_promotion1_idx` (`id_promotion` ASC) VISIBLE,
  INDEX `fk_challenge_has_promotion_challenge1_idx` (`id_challenge` ASC) VISIBLE,
  CONSTRAINT `fk_challenge_has_promotion_challenge1`
    FOREIGN KEY (`id_challenge`)
    REFERENCES `challenge_dev`.`challenge` (`id_challenge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_challenge_has_promotion_promotion1`
    FOREIGN KEY (`id_promotion`)
    REFERENCES `challenge_dev`.`promotion` (`id_promotion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `challenge_dev`;


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

