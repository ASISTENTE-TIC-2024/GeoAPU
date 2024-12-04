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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `foto_usuario` varchar(50) DEFAULT NULL,
  `nombre_usuario` varchar(45) NOT NULL,
  `correo_usuario` varchar(90) NOT NULL,
  `contrasena_usuario` varchar(255) NOT NULL,
  `rol_usuario` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'../images/foto_usuario-1728580504519.jpeg','Jesus Daniel Cuadro','asistentetic@geopolimerossas.com','$2b$10$IlXolAeepP2RDkkbwBTb5O/44aUzruPJlk536gLcAcnd4okTmlOSS','1'),(2,'../images/foto_usuario-1728580465832.jpeg','German Hincapie','german.hincapie@geopolimerossas.com','$2b$10$2v4z4kM10NEvMQvab.4Q8ewP/QxBKpsa8bYDg5rN0spYD55xYD/3G','2'),(3,'../images/foto_usuario-1728580143132.jpeg','Luis Niño','luis.nino@geopolimerossas.com','$2b$10$Bh6pDhpMRO/6djT3IerH6eO3npcp7wPdUtED0OYxGUx1.8vwVC63i','1'),(4,'../images/foto_usuario-1727728424242.jpeg','Luz Mary Perez Quinchia','dir.comercial@geopolimerossas.com','$2b$10$sKdplMXW8PDYfuxgORPl0uInfQJ2rFhu.2YVnQUo0XSOII53Z1/ZO','1'),(5,'../images/foto_usuario-1727728472471.jpeg','Michelly Vargas','ingenieratecnica@geopolimerossas.com','$2b$10$2/v2.wYbNn/HTqDX9DaSI.YCWt4yrkLETEbHjBh59IciC7tiHuKnW','2'),(7,'../images/foto_usuario-1727728796804.jpeg','Juan Pablo Pedroza Ojeda','juan.pedroza@geopolimerossas.com','$2b$10$h39s7YLXSwjuMmBLQVkLmu9aBd2ikRLCKLEwTIED0QSx2kPTfV6Yi','2'),(8,'../images/foto_usuario-1727728838088.jpeg','Juan Carlos Soto','topografo@geopolimerossas.com','$2b$10$rKvnheYKKDLypiMltXbgJ.J9O2SZYsZJjBLHOQyGQsJSiAspc53f6','3'),(9,'../images/foto_usuario-1729086685442.jpeg','Alexander Lancheros','alexander.lancheros@geopolimerossas.com','$2b$10$I0Nq1SJaqZZy8yMpSe284O3dIXVU5yhVp5qma6B2brUx.F3xrsbhm','2'),(10,'../images/foto_usuario-1727728884599.jpeg','Jhonatan Ruales','proyectos@geopolimerossas.com','$2b$10$UrnHS3eXW2SGWtlj1LkoO.RE9L3Z9t6lKALIQjf8Hk79eJsiQ9UkO','3'),(11,'../images/foto_usuario-1727728920080.jpeg','Marco Rodríguez','gerencia@geopolimerossas.com','$2b$10$NrD4c7N3aD51N4bi5Qo.Bu9Ymg0C.VjEkvoBvINzdSxiFmNDWri8i','1'),(12,'../images/foto_usuario-1727728956397.jpeg','Alejandra Tamayo','compras@geopolimerossas.com','$2b$10$jZwhCZDbinZ2qfVdTJOu8O8Lgf381qzOFn.HA2JtQz70G9snkXfX6','4'),(13,'../images/foto_usuario-1727728975875.jpeg','Juana Susatama','gestionhumana@geopolimerossas.com','$2b$10$ejLB8VcLixEyoNgly.qjM.XJoQunbGCRWP8LIyuR1yEw2rri7DUuq','5'),(14,'../images/foto_usuario-1727729003504.jpeg','Luz Mary Pelaez','control@geopolimerossas.com','$2b$10$0USM/U7LCveRElAdOlTipOYmlZj7eOuDbIu6ieSfR7n1vjhMPPQ3S','1');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
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
