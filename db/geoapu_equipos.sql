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
-- Table structure for table `equipos`
--

DROP TABLE IF EXISTS `equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos` (
  `id_equipos` int NOT NULL AUTO_INCREMENT,
  `foto_equipos` varchar(255) NOT NULL,
  `descripcion_equipos` varchar(100) DEFAULT NULL,
  `marca_equipos` varchar(100) DEFAULT NULL,
  `tipo_equipos` varchar(100) DEFAULT NULL,
  `tarifa_dia_equipos` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_equipos`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos`
--

LOCK TABLES `equipos` WRITE;
/*!40000 ALTER TABLE `equipos` DISABLE KEYS */;
INSERT INTO `equipos` VALUES (1,'../images/foto_equipo-1729778904482.jpeg','Termo Selladora','LEISTER','Termofusión',120000.00),(3,'../images/foto_equipo-1729778975207.jpg','EXTRUSORA','LEISTER','Termofusión',120000.00),(4,'../images/foto_equipo-1729790276383.avif','TRIAC','LEISTER','Termofusión',35000.00),(5,'../images/foto_equipo-1729790425869.webp','PLANTA ELECTRICA','KAMA','Termofusión',80000.00),(6,'../images/foto_equipo-1729790504457.jpg','PULIDORA','DEWALT','Manual',25000.00),(7,'../images/foto_equipo-1729790802310.avif','Equipos de prueba','LEISTER','Termofusión',100000.00),(8,'../images/foto_equipo-1729790874135.avif','TALADRO','HILTI','Perforación',35000.00),(9,'../images/foto_equipo-1729791032618.webp','MAQUINA DE COSER','SINGER','Cosido',35000.00),(10,'../images/foto_equipo-1729791110346.webp','Camión','Nissan','Movilización',250000.00),(11,'../images/foto_equipo-1729791226829.jpg','Camioneta','Nissan','Movilización',150000.00),(12,'../images/foto_equipo-1729791309262.jpg','Motobomba','','',130000.00),(13,'../images/foto_equipo-1729800499329.jpeg','PULIDORA DE CERAMICA','PAJARITO','',10000.00);
/*!40000 ALTER TABLE `equipos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-29  9:18:09
