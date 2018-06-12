CREATE SCHEMA `pribox` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `pribox`.`pribox_users` (
  `id` INT NOT NULL,
  `login_name` VARCHAR(45) NULL COMMENT 'user’s login name',
  `pass` VARCHAR(45) NULL COMMENT 'user’s login password',
  `seed` VARCHAR(45) NULL COMMENT 'the user’s password hash factor',
  `private_key` VARCHAR(200) NULL COMMENT 'user’s private key',
  `creat_time` DATETIME NULL COMMENT 'user’s account created time',
  `login_times` INT NULL COMMENT 'user’s times for login this sys',
  `last_login_time` DATETIME NULL COMMENT 'last login this sys time',
  `status` INT NULL COMMENT '0:able 1:disable',
  PRIMARY KEY (`id`))
COMMENT = 'users information table';

ALTER TABLE `pribox`.`pribox_users`
CHANGE COLUMN `seed` `sign` VARCHAR(100) NULL DEFAULT NULL COMMENT 'the user’s password hash factor' ,
CHANGE COLUMN `private_key` `private_key` BINARY(64) NULL DEFAULT NULL COMMENT 'user’s private key' ,
ADD COLUMN `public_key` VARCHAR(100) NULL AFTER `status`;

ALTER TABLE `pribox`.`pribox_users`
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ,
ADD UNIQUE INDEX `id_UNIQUE` (`id` ASC);

CREATE TABLE `pribox`.`pribox_secacc` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `account` VARCHAR(45) NULL COMMENT 'user’s account',
  `password` VARCHAR(45) NULL COMMENT 'user’s password',
  `platform_name` VARCHAR(100) NULL COMMENT 'platform’s name',
  `platform_url` VARCHAR(200) NULL,
  `remark` VARCHAR(200) NULL,
  `previous_block` VARCHAR(100) NULL,
  `sign` VARCHAR(100) NULL,
  `creat_time` DATETIME NULL,
  `user_email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
COMMENT = 'user’s account and password';

ALTER TABLE `pribox`.`pribox_secacc`
CHANGE COLUMN `creat_time` `creat_time` DATETIME GENERATED ALWAYS AS (CURRENT_TIMESTAMP) ;
