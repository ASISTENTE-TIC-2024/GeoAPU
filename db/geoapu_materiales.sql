-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: geoapu
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `materiales`
--

DROP TABLE IF EXISTS `materiales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materiales` (
  `id_materiales` int NOT NULL AUTO_INCREMENT,
  `foto_materiales` varchar(255) DEFAULT NULL,
  `descripcion_materiales` varchar(255) DEFAULT NULL,
  `tipo_moneda_materiales` varchar(10) DEFAULT NULL,
  `unidad_medida_materiales` varchar(50) DEFAULT NULL,
  `valor_unitario_materiales` decimal(10,2) DEFAULT NULL,
  `fabricacion_materiales` varchar(50) DEFAULT NULL,
  `margen_materiales` decimal(10,2) DEFAULT NULL,
  `porcentaje_margen_materiales` int DEFAULT NULL,
  `costo_unitario_materiales` decimal(10,2) DEFAULT NULL,
  `dimension_materiales` varchar(50) DEFAULT NULL,
  `unidad_materiales` varchar(50) DEFAULT NULL,
  `precio_producto_materiales` decimal(10,2) DEFAULT NULL,
  `proveedor_materiales` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_materiales`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materiales`
--

LOCK TABLES `materiales` WRITE;
/*!40000 ALTER TABLE `materiales` DISABLE KEYS */;
INSERT INTO `materiales` VALUES (22,'../images/foto_material-1729541081751.jpg','Platina 1 1/2\" x 3/16\"','COP','m',24144.00,'',0.00,0,4500.00,'1','m',4500.00,'Compras'),(26,'../images/foto_material-1729541429224.jpeg','Neopreno 1 1/2\" X 1/4\"','COP','m',3970.00,'2024-10-21',13800.00,0,46000.00,'1','2',46000.00,'2'),(27,'../images/foto_material-1729541742519.jpeg','CETSEAL','COP','m',2682.00,'2024-10-21',12.00,0,12121.00,'1','2',23123.00,'2'),(28,'../images/foto_material-1729620645004.jpeg','Cordón de extrusión','USD','kg',11.00,'2024-10-22',1.00,0,11.00,'1','kg',11.00,'ODOO'),(29,'../images/foto_material-1729621784241.jpeg','Chazo expansivo dee 3/8\" x 3\"','COP','und',2025.00,'',525.00,0,1500.00,'1','und',1500.00,''),(30,'../images/foto_material-1729622033216.jpeg','Combustible','COP','gal',15500.00,'',0.00,0,11700.00,'1','gl',12500.00,'E/S'),(37,'../images/foto_material-1729622483428.jpeg','Perfil de PVC 5cm x 1 m','COP','m',0.00,'2024-10-22',0.00,0,0.00,'0','0',0.00,'0'),(38,'../images/foto_material-1729622660335.jpeg','Chazo de PVC 1/4\"x 1 1/2\"','COP','und',0.00,'2024-10-22',0.00,0,0.00,'0','und',0.00,'0'),(39,'../images/foto_material-1729623176256.jpeg','Cinta Band it de 3/8\"','COP','m',2500.00,'2024-10-22',500.00,0,2000.00,'1','m',2000.00,'0'),(40,'../images/foto_material-1729625631792.jpeg','Hilo de poliéster para coser geotextil','COP','m',9.45,'2024-10-22',2.18,0,2000.00,'1','m',8000.00,'ODOO'),(41,'../images/foto_material-1729626167489.jpg','RETROEXCAVADORA SOBRE ORUGA KOMATSU PC200-8','COP','hora',180000.00,'2024-01-10',0.00,0,0.00,'0','0',0.00,'0'),(42,'../images/foto_material-1729626348604.jpeg','VOLQUETA DOBLE TROQUE 16 TONELADAS','COP','dia',900000.00,'2024-01-10',0.00,0,0.00,'0','0',0.00,'0');
/*!40000 ALTER TABLE `materiales` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-29  9:18:08
