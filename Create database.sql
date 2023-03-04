-- Create database
CREATE DATABASE kbc;

-- Create books table
CREATE TABLE `kbc`.`events`
(
    `id` int NOT NULL auto_increment,
    `title` varchar(250),
    `descriptions` varchar(250),
    `startDate` varchar(250),
    `endDate` varchar(250),
    `firstName` varchar(250),
    `lastName` varchar(250),
    `category` varchar(250),
    `uid` varchar(250),
    `created_at` timestamp, PRIMARY KEY (id)
);