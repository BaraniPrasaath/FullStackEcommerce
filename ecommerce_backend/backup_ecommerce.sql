-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: ecommerce_db
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_category`
--

DROP TABLE IF EXISTS `api_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_category` (
  `ct_name` varchar(100) NOT NULL,
  `ct_description` varchar(255) NOT NULL,
  `ct_date` datetime(6) NOT NULL,
  `ct_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ct_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_category`
--

LOCK TABLES `api_category` WRITE;
/*!40000 ALTER TABLE `api_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_product`
--

DROP TABLE IF EXISTS `api_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_product` (
  `pdt_name` varchar(150) NOT NULL,
  `pdt_mrp` decimal(10,2) NOT NULL,
  `pdt_dis_price` decimal(10,2) DEFAULT NULL,
  `pdt_qty` int NOT NULL,
  `ct_id` bigint NOT NULL,
  `pdt_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`pdt_id`),
  KEY `api_product_ct_id_fc5f9fba_fk_api_category_id` (`ct_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_product`
--

LOCK TABLES `api_product` WRITE;
/*!40000 ALTER TABLE `api_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add product',7,'add_product'),(26,'Can change product',7,'change_product'),(27,'Can delete product',7,'delete_product'),(28,'Can view product',7,'view_product'),(29,'Can add category',8,'add_category'),(30,'Can change category',8,'change_category'),(31,'Can delete category',8,'delete_category'),(32,'Can view category',8,'view_category'),(33,'Can add user',9,'add_customuser'),(34,'Can change user',9,'change_customuser'),(35,'Can delete user',9,'delete_customuser'),(36,'Can view user',9,'view_customuser');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `salt` varchar(64) DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$1000000$0iTwS3gvLPAQsvOfdIMOsO$mKp/Vdr0KmIVr6Tn/qxAebJbaIHkZCk208/4VQi37Tg=',NULL,0,'test_user','','','',0,1,'2025-10-30 08:00:03.823543',''),(2,'pbkdf2_sha256$1000000$tMTwTmBmfsqJAUYTp4DbTp$BKvaBpXfRNVxuHHirKDGs+G7Fwo8tvu7hjx8oidayc4=',NULL,0,'test_user1','','','',0,1,'2025-10-30 09:55:41.609369',''),(3,'pbkdf2_sha256$1000000$AUopMFlepZScSWkPNVxSJA$ds4PGGovlFzLwDq4p8I41IBNZw9Y9HwoDV1hZobF+ew=',NULL,0,'barani_prasaath','','','',0,1,'2025-10-30 10:33:29.026980',''),(4,'pbkdf2_sha256$1000000$nuOMZr0MGN9m25OpF7KmRs$+7/y2uRVsBbKf8JXvwFgCG6PKzw0lEWRDWhfGtsaK00=',NULL,0,'baran_prasaath','','','',0,1,'2025-10-30 10:34:00.874210',''),(5,'pbkdf2_sha256$1000000$sIvljV3j6K3eLv5pkP6xfc$86lXpjLUDUulTOjsg2tNBsa1PVygYO6tJQyqCTHYEWg=',NULL,0,'sanjay','','','',0,1,'2025-10-30 17:05:30.519753',''),(6,'pbkdf2_sha256$1000000$6aD3iwt3fKgEHDbsb4Y5zW$fTyvxp8q8X9SgduW4XKV4UsZ025ydqn6kUrfTYE84NE=',NULL,1,'dell','','','barani@gmail.com',1,1,'2025-10-30 17:53:51.085419',''),(7,'pbkdf2_sha256$1000000$Wfzx74FEx8QNUHKET6D0qy$i1ogUj32egwmmBoAc306r5UWIk73I7QVQFQLBO09D1c=',NULL,0,'testing_user','','','',0,1,'2025-10-30 19:07:46.463096',''),(8,'pbkdf2_sha256$1000000$4w1YinEC7E7c3Ta25jIhio$WaxlsPV7Z0S2G2vZTZOQ4p/DTSsnCNEG/+Y7BpYVZOU=',NULL,0,'barani_','','','',0,1,'2025-10-31 06:52:00.476332',''),(9,'pbkdf2_sha256$1000000$OrgXfAWeHkzajacASJOA8T$yQIBK1WmhEWlU8BGPjuYG1srAy+AzUjWbc/NhyAvSgA=',NULL,0,'vishnu','','','',0,1,'2025-11-01 17:19:27.060840',''),(10,'pbkdf2_sha256$1000000$iCKtiws6pIxYD8uUqxXn1j$2HhAwWC3mm4ZnPY9iN09k2cjwH41DgTetm1S9uVw9lI=',NULL,0,'barani_d@gmail.com','Barani','D','barani_d@gmail.com',0,1,'2025-11-02 14:41:07.941836',''),(11,'b6475dab421108d788b68940a22779e7986e5a6a92b706cf6a3c9a04d0d6753f',NULL,0,'vijayj@example.com','Vijay','J','vijayj@example.com',0,1,'2025-11-02 18:31:40.296498','b41d9c55e0ea46e2d141fb2f476a5e22');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `ct_id` int NOT NULL AUTO_INCREMENT,
  `ct_name` varchar(100) NOT NULL,
  `ct_description` varchar(255) DEFAULT NULL,
  `ct_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ct_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Toys','Fun and creative toys for all age groups','2025-10-30 13:02:09'),(2,'Electronics','Latest gadgets and home electronic appliances available here','2025-10-30 13:02:09'),(3,'Garments','Trendy and comfortable clothes for men and women','2025-10-30 13:02:09'),(4,'Sports','All essential sports gear and equipment for fitness lovers','2025-10-30 13:02:09'),(5,'Furniture','Modern and durable furniture for home and office use','2025-10-30 13:02:09'),(6,'Fashion','Exclusive accessories and fashion items for all occasions','2025-10-30 13:02:09'),(7,'Books','Wide collection of books from various popular genres','2025-10-30 13:02:09'),(8,'Media','Music, movies, and entertainment-related digital products','2025-10-30 13:02:09'),(9,'Mobiles','Smartphones from top brands with latest technology features','2025-10-30 13:02:09'),(10,'Smart Devices','Smart home and wearable devices for daily convenience','2025-10-30 13:02:09');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(8,'api','category'),(9,'api','customuser'),(7,'api','product'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-11-02 19:29:03.042402');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `pdt_id` int NOT NULL AUTO_INCREMENT,
  `pdt_name` varchar(150) NOT NULL,
  `pdt_mrp` decimal(10,2) NOT NULL,
  `pdt_dis_price` decimal(10,2) DEFAULT NULL,
  `pdt_qty` int DEFAULT '0',
  `ct_id` int DEFAULT NULL,
  PRIMARY KEY (`pdt_id`),
  KEY `ct_id` (`ct_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`ct_id`) REFERENCES `categories` (`ct_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=321 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (21,'Remote Control Car',1200.00,999.00,25,1),(22,'Building Blocks Set',850.00,699.00,40,1),(23,'Doll House',1500.00,1299.00,15,1),(24,'Puzzle Game',499.00,399.00,50,1),(25,'Toy Train Set',1100.00,899.00,30,1),(26,'Soft Teddy Bear',700.00,550.00,45,1),(27,'Action Figure',950.00,799.00,25,1),(28,'Lego Classic Kit',2200.00,1999.00,20,1),(29,'Mini Drone',3500.00,2999.00,10,1),(30,'Toy Kitchen Set',1300.00,1150.00,18,1),(31,'Baby Rattle Set',350.00,299.00,60,1),(32,'Rubber Duck Set',250.00,199.00,70,1),(33,'Toy Guitar',800.00,699.00,25,1),(34,'Coloring Kit',400.00,349.00,55,1),(35,'Magic Cube',250.00,199.00,80,1),(36,'Water Gun',500.00,450.00,45,1),(37,'Toy Helicopter',1800.00,1599.00,15,1),(38,'Musical Toy Piano',1250.00,1100.00,20,1),(39,'Toy Robot',2000.00,1799.00,12,1),(40,'Stuffed Animal Set',950.00,850.00,25,1),(41,'Bluetooth Speaker',2500.00,1999.00,30,2),(42,'Wireless Headphones',3500.00,2999.00,25,2),(43,'Smart LED TV',45000.00,39999.00,10,2),(44,'Laptop',65000.00,59999.00,8,2),(45,'Tablet',22000.00,19999.00,12,2),(46,'Power Bank',1500.00,1299.00,40,2),(47,'USB Flash Drive 64GB',800.00,699.00,60,2),(48,'External Hard Drive 1TB',6000.00,5499.00,20,2),(49,'Smart Watch',12000.00,9999.00,18,2),(50,'Bluetooth Mouse',900.00,750.00,45,2),(51,'Wireless Keyboard',1500.00,1300.00,30,2),(52,'Projector',18000.00,15999.00,10,2),(53,'Soundbar',22000.00,19999.00,12,2),(54,'Microwave Oven',15000.00,13499.00,15,2),(55,'Electric Kettle',2000.00,1750.00,30,2),(56,'Air Purifier',13000.00,11500.00,8,2),(57,'Camera DSLR',55000.00,49999.00,6,2),(58,'Game Console',48000.00,44999.00,7,2),(59,'VR Headset',25000.00,21999.00,5,2),(60,'Smart Plug',1200.00,999.00,35,2),(61,'Men T-Shirt',800.00,650.00,50,3),(62,'Women Top',900.00,749.00,45,3),(63,'Jeans',1800.00,1599.00,35,3),(64,'Jacket',3500.00,2999.00,25,3),(65,'Sweater',2500.00,2199.00,30,3),(66,'Formal Shirt',1200.00,999.00,40,3),(67,'Kurta Set',2200.00,1999.00,25,3),(68,'Saree',4000.00,3499.00,20,3),(69,'Skirt',1200.00,999.00,35,3),(70,'Track Pants',1000.00,850.00,40,3),(71,'Shorts',700.00,599.00,50,3),(72,'Blazer',5000.00,4599.00,10,3),(73,'Trousers',1600.00,1399.00,30,3),(74,'Hoodie',2000.00,1799.00,20,3),(75,'Cap',500.00,399.00,60,3),(76,'Scarf',700.00,599.00,40,3),(77,'Socks',300.00,250.00,80,3),(78,'Shoes',3500.00,2999.00,25,3),(79,'Sandals',1200.00,999.00,35,3),(80,'Belt',600.00,499.00,45,3),(81,'Football',1500.00,1299.00,40,4),(82,'Cricket Bat',3500.00,2999.00,20,4),(83,'Tennis Racket',4000.00,3599.00,15,4),(84,'Badminton Set',2200.00,1999.00,25,4),(85,'Basketball',1800.00,1599.00,30,4),(86,'Gym Gloves',800.00,699.00,45,4),(87,'Skipping Rope',300.00,249.00,60,4),(88,'Yoga Mat',1200.00,999.00,35,4),(89,'Water Bottle',400.00,350.00,80,4),(90,'Knee Guard',600.00,499.00,40,4),(91,'Dumbbell Set',5000.00,4499.00,20,4),(92,'Resistance Band',800.00,699.00,50,4),(93,'Cycling Helmet',2500.00,2299.00,25,4),(94,'Shuttlecock Pack',350.00,299.00,70,4),(95,'Sweat Band',200.00,150.00,90,4),(96,'Cricket Ball',400.00,350.00,60,4),(97,'Running Shoes',4500.00,3999.00,25,4),(98,'Golf Cap',600.00,499.00,35,4),(99,'Hand Gripper',350.00,299.00,55,4),(100,'Wristband',300.00,250.00,65,4),(101,'Office Chair',7500.00,6999.00,20,5),(102,'Study Table',6500.00,5999.00,15,5),(103,'Sofa Set',45000.00,39999.00,8,5),(104,'Dining Table',38000.00,34999.00,10,5),(105,'Bed King Size',55000.00,49999.00,6,5),(106,'Bookshelf',12000.00,10999.00,12,5),(107,'Wardrobe',32000.00,28999.00,7,5),(108,'Coffee Table',8000.00,7499.00,10,5),(109,'TV Stand',9500.00,8999.00,10,5),(110,'Shoe Rack',6000.00,5499.00,20,5),(111,'Computer Table',10000.00,9499.00,12,5),(112,'Recliner Chair',20000.00,17999.00,5,5),(113,'Bedside Table',5500.00,4999.00,15,5),(114,'Wall Shelf',4500.00,3999.00,20,5),(115,'Study Chair',5000.00,4499.00,25,5),(116,'Mirror Frame',3500.00,2999.00,30,5),(117,'Kitchen Cabinet',15000.00,13999.00,8,5),(118,'Kids Study Table',8000.00,7499.00,10,5),(119,'Plastic Chair',900.00,799.00,40,5),(120,'Dining Bench',8500.00,7999.00,12,5),(121,'Leather Wallet',1500.00,1299.00,35,6),(122,'Handbag',4000.00,3499.00,25,6),(123,'Watch',7000.00,6499.00,20,6),(124,'Sunglasses',2500.00,2199.00,30,6),(125,'Perfume',3000.00,2699.00,25,6),(126,'Earrings',1200.00,999.00,50,6),(127,'Bracelet',800.00,699.00,60,6),(128,'Ring',1500.00,1299.00,40,6),(129,'Necklace',3500.00,2999.00,25,6),(130,'Tie',700.00,599.00,45,6),(131,'Belt',600.00,499.00,40,6),(132,'Cufflinks',900.00,799.00,30,6),(133,'Makeup Kit',2500.00,2299.00,35,6),(134,'Hair Dryer',3000.00,2699.00,20,6),(135,'Nail Polish Set',800.00,699.00,60,6),(136,'Scarf',700.00,599.00,40,6),(137,'Cap',500.00,399.00,50,6),(138,'Watch Chain',1000.00,899.00,45,6),(139,'Fashion Shoes',4000.00,3499.00,25,6),(140,'Travel Bag',5500.00,4999.00,15,6),(141,'The Great Gatsby',500.00,450.00,40,7),(142,'1984',450.00,400.00,50,7),(143,'To Kill a Mockingbird',550.00,499.00,35,7),(144,'Moby Dick',600.00,549.00,25,7),(145,'Pride and Prejudice',500.00,449.00,40,7),(146,'War and Peace',800.00,749.00,20,7),(147,'Harry Potter',700.00,649.00,50,7),(148,'Lord of the Rings',900.00,849.00,30,7),(149,'The Alchemist',600.00,549.00,45,7),(150,'Atomic Habits',700.00,650.00,35,7),(151,'Deep Work',650.00,599.00,30,7),(152,'Think and Grow Rich',500.00,450.00,40,7),(153,'Rich Dad Poor Dad',550.00,499.00,40,7),(154,'The Power of Habit',700.00,650.00,30,7),(155,'Sapiens',900.00,849.00,25,7),(156,'Educated',800.00,749.00,25,7),(157,'Becoming',850.00,799.00,20,7),(158,'The Monk Who Sold His Ferrari',600.00,549.00,45,7),(159,'The Secret',700.00,649.00,30,7),(160,'The Psychology of Money',800.00,749.00,35,7),(161,'Music CD Collection',1500.00,1299.00,20,8),(162,'Movie DVD Set',2000.00,1799.00,25,8),(163,'Vinyl Record Player',15000.00,13999.00,10,8),(164,'Bluetooth Speaker Set',2500.00,2199.00,30,8),(165,'Podcast Microphone',8000.00,7499.00,15,8),(166,'Studio Headphones',12000.00,10999.00,12,8),(167,'Pop Album',700.00,649.00,50,8),(168,'Jazz Vinyl',900.00,849.00,30,8),(169,'Rock Hits Collection',1000.00,899.00,25,8),(170,'USB Music Drive',1200.00,999.00,40,8),(171,'Movie Poster Set',600.00,499.00,60,8),(172,'Headset Mic Combo',4500.00,3999.00,20,8),(173,'Sound Mixer',18000.00,16999.00,8,8),(174,'Studio Light Set',12000.00,10999.00,10,8),(175,'Tripod Stand',3000.00,2799.00,25,8),(176,'Camera Gimbal',22000.00,19999.00,7,8),(177,'Microphone Stand',2500.00,2299.00,20,8),(178,'Recording Software Key',8000.00,7499.00,15,8),(179,'Editing Console',35000.00,32999.00,6,8),(180,'Light Reflector Kit',5000.00,4499.00,10,8),(181,'iPhone 15',90000.00,86999.00,10,9),(182,'Samsung Galaxy S24',85000.00,81999.00,10,9),(183,'OnePlus 12',70000.00,66999.00,12,9),(184,'Google Pixel 8',80000.00,75999.00,8,9),(185,'Redmi Note 13',25000.00,22999.00,25,9),(186,'Realme GT 5',30000.00,27999.00,20,9),(187,'iQOO Neo 9',28000.00,25999.00,20,9),(188,'Motorola Edge 50',40000.00,37999.00,10,9),(189,'Vivo V30',35000.00,32999.00,15,9),(190,'OPPO Reno 11',42000.00,39999.00,12,9),(191,'Nokia G60',28000.00,25999.00,15,9),(192,'Infinix Zero 30',24000.00,21999.00,20,9),(193,'Lava Agni 3',18000.00,16999.00,30,9),(194,'Asus ROG Phone',85000.00,81999.00,8,9),(195,'Sony Xperia 5',70000.00,66999.00,10,9),(196,'Poco F6',30000.00,27999.00,18,9),(197,'Nothing Phone 2',42000.00,39999.00,12,9),(198,'Tecno Phantom',25000.00,22999.00,20,9),(199,'Honor 90',35000.00,32999.00,15,9),(200,'Samsung M15',18000.00,16999.00,25,9),(201,'Smart Bulb',1200.00,999.00,50,10),(202,'Smart Plug',1500.00,1299.00,40,10),(203,'Smart Door Lock',18000.00,15999.00,10,10),(204,'Smart Thermostat',22000.00,19999.00,8,10),(205,'Smart Security Camera',10000.00,8999.00,15,10),(206,'Smart Switch',2500.00,2299.00,30,10),(207,'Smart Fan',15000.00,13999.00,10,10),(208,'Smart Refrigerator',75000.00,69999.00,5,10),(209,'Smart Washing Machine',60000.00,55999.00,6,10),(210,'Smart AC',65000.00,61999.00,6,10),(211,'Smart Light Strip',2000.00,1799.00,40,10),(212,'Smart Doorbell',8000.00,7499.00,12,10),(213,'Smart Speaker',6000.00,5499.00,20,10),(214,'Smart Display',12000.00,10999.00,10,10),(215,'Smart Clock',5000.00,4499.00,25,10),(216,'Smart Smoke Detector',9000.00,8499.00,8,10),(217,'Smart Robot Vacuum',35000.00,32999.00,5,10),(218,'Smart Water Purifier',25000.00,22999.00,6,10),(219,'Smart TV Box',8000.00,7499.00,15,10),(220,'Smart Door Sensor',3500.00,2999.00,25,10),(221,'Turbo Racer Remote Car',2200.00,1999.00,30,1),(222,'Mini Construction Blocks Kit',950.00,849.00,40,1),(223,'Deluxe Dollhouse Playset',1800.00,1599.00,20,1),(224,'Adventure Puzzle Challenge Box',650.00,549.00,50,1),(225,'Wooden Train Track Set',1400.00,1250.00,25,1),(226,'Cuddly Giant Teddy Bear',1200.00,999.00,60,1),(227,'Action Hero Ultimate Pack',1000.00,849.00,35,1),(228,'Classic Building Blocks Tower',2000.00,1799.00,30,1),(229,'Mini Camera Drone Pro',4500.00,3999.00,12,1),(230,'Play Kitchen Cooking Set',1350.00,1150.00,18,1),(231,'Compact Bluetooth Speaker',2600.00,2199.00,40,2),(232,'Noise Canceling Headphones Pro',4200.00,3799.00,30,2),(233,'4K Smart LED Television',52000.00,45999.00,8,2),(234,'Ultra Slim Laptop 14inch',68000.00,62999.00,7,2),(235,'Android Tablet Plus',21000.00,18999.00,10,2),(236,'Fast Charging Power Bank',1800.00,1499.00,60,2),(237,'64GB USB Flash Drive Pro',900.00,749.00,80,2),(238,'Portable External HDD 1TB',6200.00,5499.00,25,2),(239,'Smartwatch Series X',14000.00,11999.00,20,2),(240,'Wireless Ergonomic Mouse',1100.00,899.00,50,2),(241,'Casual Cotton Shirt Blue',1200.00,999.00,60,3),(242,'Checked Formal Shirt Classic',1800.00,1599.00,40,3),(243,'Striped Polo T-Shirt',900.00,799.00,70,3),(244,'Plain Cotton Tee Pack',700.00,599.00,100,3),(245,'Formal Button Down Shirt',2200.00,1999.00,30,3),(246,'Slim Fit Jeans Stretch',2100.00,1799.00,35,3),(247,'Lightweight Summer Jacket',3200.00,2799.00,25,3),(248,'Comfort Hoodie Zip Up',2000.00,1799.00,30,3),(249,'Classic Leather Belt',700.00,599.00,60,3),(250,'Casual Chino Trousers',1600.00,1399.00,40,3),(251,'Official Cricket Bat Pro',3500.00,2999.00,20,4),(252,'Professional Cricket Ball',450.00,399.00,80,4),(253,'Yoga Comfort Mat',1200.00,999.00,70,4),(254,'Adjustable Dumbbell Set',5200.00,4599.00,25,4),(255,'Pro Tennis Racket Plus',4200.00,3799.00,15,4),(256,'Basketball Match Grade',2000.00,1699.00,40,4),(257,'Running Shoes Lightweight',4500.00,3999.00,25,4),(258,'Resistance Training Bands',800.00,699.00,60,4),(259,'Cycling Helmet VentPro',2800.00,2499.00,30,4),(260,'Portable Gym Skipping Rope',300.00,249.00,90,4),(261,'Modern Office Chair',8000.00,6999.00,20,5),(262,'Solid Wood Study Table',7200.00,6499.00,15,5),(263,'Comfort Sofa Two Seater',36000.00,32999.00,8,5),(264,'Extendable Dining Table',38000.00,34999.00,6,5),(265,'King Size Bed Frame',52000.00,47999.00,5,5),(266,'Bookshelf Storage Unit',12000.00,10999.00,12,5),(267,'Wooden Wardrobe Classic',31000.00,28999.00,7,5),(268,'Glass Coffee Table',9000.00,7999.00,10,5),(269,'TV Entertainment Unit',9500.00,8999.00,10,5),(270,'Steel Shoe Rack Organizer',3000.00,2699.00,20,5),(271,'Heavy Duty Boots Leather',4200.00,3799.00,30,6),(272,'Casual Loafers Slip On',3200.00,2799.00,40,6),(273,'Formal Leather Oxford Shoe',5200.00,4699.00,25,6),(274,'Casual Canvas Shoe Pair',1700.00,1499.00,60,6),(275,'Checked Casual Shirt',1400.00,1199.00,50,6),(276,'Plain Cotton Shirt Regular',1100.00,999.00,80,6),(277,'Striped Casual Shirt Modern',1300.00,1099.00,60,6),(278,'Button Down Dress Shirt',1600.00,1399.00,45,6),(279,'Polo T-Shirt Performance',900.00,799.00,100,6),(280,'Fashion Slip On Loafers',3000.00,2699.00,35,6),(281,'Classic Novel Box Set',1200.00,999.00,40,7),(282,'Modern Self Help Collection',900.00,799.00,70,7),(283,'Historical Fiction Hardcover',1100.00,949.00,30,7),(284,'Pocket Travel Guidebook',700.00,599.00,80,7),(285,'Cookbook Gourmet Recipes',1500.00,1299.00,25,7),(286,'Children Storybook Set',650.00,549.00,90,7),(287,'Business Leadership Guide',1250.00,1099.00,35,7),(288,'Poetry Collection Deluxe',800.00,699.00,50,7),(289,'Thriller Mystery Hardcover',950.00,849.00,60,7),(290,'Educational Textbook Series',2200.00,1999.00,20,7),(291,'BluRay Movie Collector Set',2400.00,1999.00,25,8),(292,'Vinyl Record Premium Player',14000.00,12999.00,10,8),(293,'Wireless Podcast Microphone Pro',8500.00,7499.00,15,8),(294,'Studio Headphones OverEar',11500.00,9999.00,12,8),(295,'Collector Vinyl Record Set',1700.00,1499.00,40,8),(296,'Movie DVD Special Edition',2200.00,1799.00,30,8),(297,'Portable Music System',3200.00,2799.00,25,8),(298,'Audio Mixer Pro Console',18000.00,15999.00,8,8),(299,'Recording Studio Lights Kit',12500.00,10999.00,10,8),(300,'Podcasting Starter Bundle',7500.00,6499.00,18,8),(301,'Flagship Smartphone Ultra',88000.00,81999.00,10,9),(302,'Midrange Smartphone Pro',35000.00,31999.00,18,9),(303,'Budget Smartphone Value',16000.00,13999.00,30,9),(304,'Smartphone Camera Lens Kit',3500.00,2999.00,45,9),(305,'Fast Charging Wall Adapter',900.00,799.00,70,9),(306,'Wireless Earbuds Pro',7500.00,6499.00,40,9),(307,'Clear Screen Protector Pack',400.00,350.00,150,9),(308,'Mobile Power Bank 20000',2200.00,1999.00,60,9),(309,'Phone Protective Back Case',600.00,499.00,120,9),(310,'Smartphone Gimbal Stabilizer',8500.00,7499.00,15,9),(311,'Smart Speaker Home Hub',6000.00,5499.00,35,10),(312,'Smart Light Strip Set',1800.00,1499.00,60,10),(313,'Smart Doorbell Camera',9500.00,8499.00,20,10),(314,'Smart Thermostat Controller',22000.00,19999.00,8,10),(315,'WiFi Smart Plug Twin Pack',1600.00,1399.00,80,10),(316,'Robot Vacuum Cleaner Pro',32000.00,29999.00,6,10),(317,'Smart Water Purifier',26000.00,23999.00,10,10),(318,'Smart Smoke Detector',9000.00,7999.00,20,10),(319,'Smart Garden Sensor Kit',4500.00,3999.00,25,10),(320,'Smart Home Camera Dome',8000.00,6999.00,30,10);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-03  1:01:57
