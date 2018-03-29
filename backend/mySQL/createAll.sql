-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
 FLUSH PRIVILEGES;
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `VigilantDB` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `VigilantDB` DEFAULT CHARACTER SET utf8 ;
USE `VigilantDB` ;

-- -----------------------------------------------------
-- Table `mydb`.`Crime Data`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `VigilantDB`.`CrimeData` ;

CREATE TABLE IF NOT EXISTS `VigilantDB`.`CrimeData` (
  `crime_ID` INT NOT NULL,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `district` VARCHAR(45) NOT NULL,
  `weapon` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `neighborhood` VARCHAR(45) NULL,
  `premise` VARCHAR(45) NULL,
  `inside_outside` VARCHAR(45) NULL,
  `latitude` DOUBLE NULL,
  `longitude` DOUBLE NULL,
  PRIMARY KEY (`crime_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`GlobalFilters`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `VigilantDB`.`GlobalFilters` ;

CREATE TABLE IF NOT EXISTS `VigilantDB`.`GlobalFilters` (
  `global_filter_ID` INT NOT NULL,
  `date` DATE NULL,
  `time` TIME NULL,
  `description` VARCHAR(45) NULL,
  `district` VARCHAR(45) NULL,
  `weapon` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `neighborhood` VARCHAR(45) NULL,
  `premise` VARCHAR(45) NULL,
  `inside_outside` VARCHAR(45) NULL,
  `latitude` DOUBLE NULL,
  `longitude` DOUBLE NULL,
  PRIMARY KEY (`global_filter_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `VigilantDB`.`Users` ;

CREATE TABLE IF NOT EXISTS `VigilantDB`.`Users` (
  `user_ID` INT NOT NULL,
  `global_filter_ID` INT NOT NULL,
  `password` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  PRIMARY KEY (`user_ID`, `global_filter_ID`),
  INDEX `fk_Users_Global_Filters1_idx` (`global_filter_ID` ASC),
  UNIQUE INDEX `global_filter_ID_UNIQUE` (`global_filter_ID` ASC),
  CONSTRAINT `fk_Users_Global_Filters1`
    FOREIGN KEY (`global_filter_ID`)
    REFERENCES `VigilantDB`.`GlobalFilters` (`global_filter_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`LocalFilters`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `VigilantDB`.`LocalFilters` ;

CREATE TABLE IF NOT EXISTS `VigilantDB`.`LocalFilters` (
  `local_filter_ID` INT NOT NULL,
  `fk_user_ID` INT NOT NULL,
  `date` DATE NULL,
  `time` TIME NULL,
  `description` VARCHAR(45) NULL,
  `district` VARCHAR(45) NULL,
  `weapon` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `neighborhood` VARCHAR(45) NULL,
  `premise` VARCHAR(45) NULL,
  `inside_outside` VARCHAR(45) NULL,
  `latitude` DOUBLE NULL,
  `longitude` DOUBLE NULL,
  PRIMARY KEY (`local_filter_ID`),
  INDEX `fk_LocalFilters_Users1_idx` (`fk_user_ID` ASC),
  CONSTRAINT `fk_user_ID`
    FOREIGN KEY (`fk_user_ID`)
    REFERENCES `VigilantDB`.`Users` (`user_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
