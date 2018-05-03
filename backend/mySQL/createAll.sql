-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
 FLUSH PRIVILEGES;
-- -----------------------------------------------------
-- Schema VigilantDB
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `VigilantDB` ;

-- -----------------------------------------------------
-- Schema VigilantDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `VigilantDB` DEFAULT CHARACTER SET utf8 ;
USE `VigilantDB` ;

-- -----------------------------------------------------
-- Table `VigilantDB`.`CrimeData`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `VigilantDB`.`CrimeData` ;

CREATE TABLE IF NOT EXISTS `VigilantDB`.`CrimeData` (
  `crime_ID` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `time` TIME NULL,
  `day` VARCHAR(5) NULL,
  `code` VARCHAR(10) NULL,
  `description` VARCHAR(45) NULL,
  `district` VARCHAR(45) NULL,
  `post` VARCHAR(10) NULL,
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
-- Table `VigilantDB`.`GlobalFilters`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `VigilantDB`.`GlobalFilters` ;

CREATE TABLE IF NOT EXISTS `VigilantDB`.`GlobalFilters` (
  `global_filter_ID` INT NOT NULL AUTO_INCREMENT,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `start_time` TIME NULL,
  `end_time` TIME NULL,
  `code` VARCHAR(300) NULL,
  `day` VARCHAR(50) NULL,
  `inside_outside` VARCHAR(10) NULL,
  `district` VARCHAR(160) NULL,
  `weapon` VARCHAR(50) NULL,
  `start_lat` FLOAT NULL,
  `end_lat` FLOAT NULL,
  `start_lon` FLOAT NULL,
  `end_lon` FLOAT NULL,
  PRIMARY KEY (`global_filter_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `VigilantDB`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `VigilantDB`.`Users` ;

CREATE TABLE IF NOT EXISTS `VigilantDB`.`Users` (
  `user_ID` INT NOT NULL,
  `global_filter_ID` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
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
-- Table `VigilantDB`.`LocalVisualization`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `VigilantDB`.`LocalVisualization` ;

CREATE TABLE IF NOT EXISTS `VigilantDB`.`LocalVisualization` (
  `local_filter_ID` INT NOT NULL AUTO_INCREMENT,
  `fk_user_ID` INT NOT NULL,
  `name` VARCHAR(100) NULL,
  `type` VARCHAR(20) NULL,
  `visible` TINYINT NULL,
  `field` VARCHAR(15) NULL,
  `use_global` TINYINT NULL,
  `date_hidden` DATE NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `start_time` TIME NULL,
  `end_time` TIME NULL,
  `day` VARCHAR(40) NULL,
  `code` VARCHAR(300) NULL,
  `inside_outside` VARCHAR(10) NULL,
  `weapon` VARCHAR(50) NULL,
  `district` VARCHAR(160) NULL,
  `start_lat` FLOAT NULL,
  `end_lat` FLOAT NULL,
  `start_lon` FLOAT NULL,
  `end_lon` FLOAT NULL,
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

-- -----------------------------------------------------
-- Hard Code Predefined Values
-- -----------------------------------------------------
INSERT INTO GlobalFilters (global_filter_ID)
VALUES ( 1);

INSERT INTO Users ( user_ID, global_filter_ID,  username)
VALUES(1,1,'user');

INSERT INTO LocalVisualization (fk_user_id, name, type, visible, field, use_global)
VALUES (1, 'Distribution of Crimes by Day of Week', 'bar', 1, 'days', 1);

INSERT INTO LocalVisualization (fk_user_id, name, type, visible, field, use_global)
VALUES (1, 'Trend of Crimes Over Times of Day', 'line', 1, 'times', 1);

INSERT INTO LocalVisualization (fk_user_id, name, type, visible, field, use_global)
VALUES (1, 'Weapon Distribution', 'bar', 1, 'weapons', 1);

INSERT INTO LocalVisualization (fk_user_id, name, type, visible, field, use_global)
VALUES (1, 'Trend of Crimes Over Dates', 'line', 1, 'dates', 1);

INSERT INTO LocalVisualization (fk_user_id, name, type, visible, field, use_global)
VALUES (1, 'Distribution of Crimes by Description', 'bar', 1, 'descriptions', 1);

INSERT INTO LocalVisualization (fk_user_id, name, type, visible, field, use_global)
VALUES (1, 'Distribution of Crimes by District', 'bar', 1, 'districts', 1);
