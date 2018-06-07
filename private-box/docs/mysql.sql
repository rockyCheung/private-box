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
