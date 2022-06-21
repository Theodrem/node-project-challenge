-- MySQL Script generated by MySQL Workbench
-- Tue Jun 21 10:45:33 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema challenge-db-dev
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema challenge-db-dev
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `challenge-db-dev` DEFAULT CHARACTER SET utf8 ;
USE `challenge-db-dev` ;

-- -----------------------------------------------------
-- Table `challenge-db-dev`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challenge-db-dev`.`user` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `score` INT NOT NULL DEFAULT 0,
  `ROLE` VARCHAR(30) NOT NULL,
  UNIQUE INDEX (`email` ASC) VISIBLE,
  PRIMARY KEY (`userId`));


-- -----------------------------------------------------
-- Table `challenge-db-dev`.`Instance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `challenge-db-dev`.`Instance` (
  `id_instance` INT NOT NULL AUTO_INCREMENT,
  `ssh_key` VARCHAR(300) NOT NULL,
  `ip_adress` VARCHAR(45) NOT NULL,
  `username` VARCHAR(200) NOT NULL,
  `is_connected` TINYINT NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id_instance`, `user_id`),
  INDEX `fk_Instance_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Instance_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `challenge-db-dev`.`user` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

USE `challenge-db-dev`;

DELIMITER $$
USE `challenge-db-dev`$$
create trigger before_insert_user
before insert
on user for each row set newUser.email = lower(trim(newUser.email))$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
