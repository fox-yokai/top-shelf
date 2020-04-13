-- Drops the db if it exists currently --
DROP DATABASE IF EXISTS topshelf_db;
-- Creates the topshelf_db database --
CREATE DATABASE topshelf_db;

CREATE TABLE IF NOT EXISTS `Users` (
`id` INTEGER NOT NULL auto_increment , 
`email` VARCHAR(255) NOT NULL UNIQUE, 
`password` VARCHAR(255) NOT NULL, 
`createdAt` DATETIME NOT NULL, 
`updatedAt` DATETIME NOT NULL, 
PRIMARY KEY (`id`))

CREATE TABLE IF NOT EXISTS `Wines` (
`id` INTEGER NOT NULL auto_increment , 
`name` VARCHAR(255) NOT NULL, 
`variety` VARCHAR(255) NOT NULL, 
`location` VARCHAR(255), 
`Color` VARCHAR(255) NOT NULL, 
`winery` VARCHAR(255), 
`year` INTEGER, 
`numBottles` INTEGER, 
`createdAt` DATETIME NOT NULL, 
`updatedAt` DATETIME NOT NULL, 
PRIMARY KEY (`id`))