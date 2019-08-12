-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: manasport
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `match`
--

DROP TABLE IF EXISTS `match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `match` (
  `MatchId` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(45) DEFAULT NULL,
  `localTeamId` int(11) NOT NULL,
  `awayTeamId` int(11) NOT NULL,
  `localteam_score` tinyint(4) DEFAULT NULL,
  `awayteam_score` tinyint(4) DEFAULT NULL,
  `matchday` int(11) DEFAULT NULL,
  `TournamentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`MatchId`),
  KEY `FK_match_tournament_idx` (`TournamentId`),
  KEY `FK_match_teamLocal_idx` (`localTeamId`),
  KEY `FK_match_teamAway_idx` (`awayTeamId`),
  CONSTRAINT `FK_match_teamAway` FOREIGN KEY (`awayTeamId`) REFERENCES `team` (`TeamId`),
  CONSTRAINT `FK_match_teamLocal` FOREIGN KEY (`localTeamId`) REFERENCES `team` (`TeamId`),
  CONSTRAINT `FK_match_tournament` FOREIGN KEY (`TournamentId`) REFERENCES `tournament` (`TournamentId`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match`
--

LOCK TABLES `match` WRITE;
/*!40000 ALTER TABLE `match` DISABLE KEYS */;
INSERT INTO `match` VALUES (1,'3/8/2019',1,2,2,0,1,1),(2,'3/8/2019',3,4,0,3,1,1),(3,'3/8/2019',5,6,1,1,1,1),(4,'3/8/2019',7,8,0,0,1,1),(5,'3/8/2019',9,10,1,0,1,1),(6,'3/8/2019',11,12,2,1,1,1),(7,'3/8/2019',13,14,4,2,1,1),(8,'3/8/2019',15,16,0,1,1,1),(9,'3/8/2019',17,18,1,1,1,1),(10,'3/8/2019',20,21,2,3,1,1),(27,'10/8/2019',4,1,0,0,2,1),(28,'10/8/2019',2,3,1,1,2,1),(29,'10/8/2019',8,5,2,4,2,1),(30,'10/8/2019',6,7,4,2,2,1),(31,'10/8/2019',12,9,2,3,2,1),(32,'10/8/2019',10,11,1,2,2,1),(33,'10/8/2019',16,13,0,2,2,1),(34,'10/8/2019',14,15,3,1,2,1),(35,'10/8/2019',21,17,1,0,2,1),(36,'10/8/2019',18,20,1,1,2,1),(37,'15/8/2019',1,21,NULL,NULL,3,1),(38,'15/8/2019',2,20,NULL,NULL,3,1),(39,'15/8/2019',3,18,NULL,NULL,3,1),(40,'15/8/2019',4,17,NULL,NULL,3,1),(41,'15/8/2019',5,16,NULL,NULL,3,1),(42,'15/8/2019',9,15,NULL,NULL,3,1),(43,'15/8/2019',7,14,NULL,NULL,3,1),(44,'15/8/2019',10,13,NULL,NULL,3,1),(45,'15/8/2019',6,12,NULL,NULL,3,1),(46,'15/8/2019',8,11,NULL,NULL,3,1);
/*!40000 ALTER TABLE `match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `player` (
  `PlayerId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `age` tinyint(4) DEFAULT NULL,
  `position` varchar(10) NOT NULL,
  `goals` smallint(6) NOT NULL DEFAULT '0',
  `image` varchar(300) DEFAULT NULL,
  `TeamId` int(11) NOT NULL,
  PRIMARY KEY (`PlayerId`),
  KEY `fk_player_team_idx` (`TeamId`),
  CONSTRAINT `fk_player_team` FOREIGN KEY (`TeamId`) REFERENCES `team` (`TeamId`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'Juan Luis','Moreno Calderon',19,'Delantero',56,NULL,1),(11,'Manuel','Martín Rodriguez',25,'Portero',0,NULL,2),(12,'Raul','Bonachera',35,'ExtremoIzq',7,NULL,3),(22,'Ronaldinho','Gaucho',34,'ExtremoIzq',23,NULL,4),(23,'Leo','Messi',32,'Delantero',35,NULL,5),(24,'Victor','Mejia',17,'Central',4,NULL,6),(26,'Cristiano','Ronaldo',41,'ExtremoIzq',3,NULL,7),(27,'Luis','Suarez',34,'Delantero',21,NULL,8),(28,'Carles','Puyol',45,'Central',10,NULL,9),(29,'Rodrigo','Sarmiento Calderon',29,'Delantero',34,NULL,10),(39,'Victor','Valdes',41,'Portero',0,NULL,11),(40,'Fernando','Torres',23,'Delantero',32,NULL,12),(41,'Iker ','Casillas',44,'Portero',0,NULL,13),(42,'Juan ','Carlos Valerón',24,'Medio',21,NULL,14),(43,'David ','Villa',45,'Delantero',42,NULL,15),(44,'Joaquín ','Sanchez',45,'ExtremoDer',21,NULL,16),(45,'Fernando','Portillo',31,'Delantero',2,NULL,17),(57,'Cristina','Nunez Parra',26,'Delantero',23,NULL,1),(88,'Fernando','Pacheco',26,'Portero',0,NULL,1),(139,'Antonio ','Sivera',21,'Delantero',8,NULL,1),(140,'Saúl','García',25,'ExtremoIzq',6,NULL,1),(141,'Rafa','Navarro',26,'Central',1,NULL,1),(142,'Oliver','Verdon',31,'Delantero',23,NULL,1),(143,'Tachi','García',38,'ExtremoDer',14,NULL,1),(144,'Rubén','Duarte',25,'Portero',0,NULL,1),(145,'Rodrigo','Ely',18,'ExtremoIzq',11,NULL,1),(146,'Victor','Laguardia',19,'Medio',2,NULL,1),(147,'Guillermo','Maripán',20,'Central',1,NULL,1),(148,'XImo','Navarro',25,'Delantero',0,NULL,1),(149,'Adrian','Marin',29,'Central',0,NULL,1),(150,'Martín','Aguirregabiria',30,'ExtremoDer',0,NULL,1),(151,'Nando','García',31,'LateralIzq',0,NULL,1),(152,'Aleix','Vidal',28,'Delantero',12,NULL,1),(153,'Jeando','Fuchs',35,'LateralDer',1,NULL,1),(154,'Pere','Pons',34,'Medio',2,NULL,2),(155,'Javier','Muñoz',24,'Medio',1,NULL,2),(156,'Tomás','Pina',19,'LateralDer',0,NULL,2),(157,'Burgui','Vidal',18,'Delantero',14,NULL,2),(158,'Dani','Torres',20,'Central',0,NULL,2),(159,'Mubarak','García',21,'Medio',8,NULL,2),(160,'Joselu','Wakaso',20,'Central',0,NULL,2),(161,'John','Guidetti',29,'LateralIzq',0,NULL,2),(162,'Patrick','Twusami',17,'Portero',0,NULL,2),(163,'Ermedin','Demirovic',19,'Medio',1,NULL,2);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `team` (
  `TeamId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `locality` varchar(40) DEFAULT NULL,
  `badge` varchar(300) DEFAULT NULL,
  `coach` varchar(45) DEFAULT NULL,
  `coach2` varchar(45) DEFAULT NULL,
  `contactEmail` varchar(45) DEFAULT NULL,
  `contactPhone` varchar(45) DEFAULT NULL,
  `TournamentId` int(11) NOT NULL,
  PRIMARY KEY (`TeamId`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `FK_team_tournament_idx` (`TournamentId`),
  CONSTRAINT `FK_team_tournament` FOREIGN KEY (`TournamentId`) REFERENCES `tournament` (`TournamentId`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'Malaga CF','Málaga','/images/badges-teams/malaga.png','Antonio Ponze','Manuel Azaña','malaga@email.com','7301066250',1),(2,'Sevilla FC','Sevilla','/images/badges-teams/sevilla.png','Victor fernández','Paco Jémez','sevilla@email.com','7832044380',1),(3,'Betis','Sevilla','/images/badges-teams/betis.png','Lucas Alcaraz',NULL,'betis@email.com','7833663539',1),(4,'Eibar','Gipuzkoa','/images/badges-teams/eibar.png','Pepe Mel','José Murcia','eibar@email.com','7616432318',1),(5,'Valencia CF','Valencia','/images/badges-teams/valencia.png','Alberto Jimenez','Enrique Martín',NULL,'6415322304',1),(6,'Villarreal CF','Castellón','/images/badges-teams/villarreal.png','Jagoba Arrasate',NULL,'villarreal@email.com','7616432318',1),(7,'Real Madrid','Madrid','/images/badges-teams/realmadrid.png','Zinedine Zidane','Antonio Pérez','realmadrid@email.com','6353614316',1),(8,'Atletico de Madrid','Madrid','/images/badges-teams/atletico.png','Cholo Simeone','Mono Burgos','atleticodemadrid@email.com','6875069054',1),(9,'RC Celta','Vigo','/images/badges-teams/celta.png','Manuel Benitez',NULL,'celta@email.com','6320620280',1),(10,'Athletic Club','Bilbao','/images/badges-teams/bilbao.png','Santiago Abascal','Santiago Solari','bilbao@email.com','8638617271',1),(11,'Huesca','Huesca','/images/badges-teams/huesca.png','Pedro Sanchez','Luciano Spalletti','huesca@email.com','8569962960',1),(12,'Rayo Vallecano','Madrid','/images/badges-teams/rayo.png','Juan Luis Nuñez','Gennaro Gattuso',NULL,'6508238332',1),(13,'Getafe','Madrid','/images/badges-teams/getafe.png','Rafael Garrido','Arsène Wenger','getafe@email.com','8907228012',1),(14,'Levante','Valencia','/images/badges-teams/levante.png','Javier Espejo','Claude Puel','levante@email.com','626298754',1),(15,'Espanyol','Barcelona','/images/badges-teams/espanyol.png',NULL,NULL,'espanyol@email.com','7609970065',1),(16,'Alavés','Álava','/images/badges-teams/alaves.png','Rodrigo Sarmiento',NULL,NULL,'7922482363',1),(17,'Leganés','Madrid','/images/badges-teams/leganes.png','Javier Nuñez','Franck Passi','leganes@email.com','6660886097',1),(18,'Valladolid','Valladolid','/images/badges-teams/valladolid.png','Antonio Belmonte','Huub Stevens','valladolid@email.com','8939149646',1),(20,'Girona','Girona','/images/badges-teams/girona.png','Sergio Beltrán','Rudi García','girona@email.com','7267973586',1),(21,'FC Barcelona','Barcelona','/images/badges-teams/barcelona.png','Juan José Carrillo','Quique Setién','barcelona@email.com','7114715589',1),(27,'Albacete','Albacete',NULL,'Alvaro Cervera',NULL,'albacete@email.com','793867970',2),(28,'Alcorcón','Madrid',NULL,'Pacheta Gutierrez','Natxo González','alcorcon@email.com','7948778850',2),(29,'Cádiz','Cádiz',NULL,'Bolo Martín',NULL,NULL,'6213721816',2),(30,'Almeria','Almeria',NULL,'Luis Miguel Ramis','Imanol Idiákez','almeria@email.com','6466015233',2),(31,'Deportivo','La Coruña',NULL,'Iván Ania',NULL,'deportivo@email.com','8960382017',2),(32,'Elche','Alicante',NULL,NULL,NULL,NULL,'7817925426',2),(33,'Extremadura','Badajoz',NULL,'José Alberto Crespo','Marcelino García','extremadura@email.com','7953473014',2),(34,'Fuengalabrada','Madrid',NULL,'Manuel Mosquera','Mere Pérez',NULL,'6333942975',2),(35,'Las Palmas','Las Palmas',NULL,'Victor Sanchez',NULL,'laspalmas@email.com','6157213107',2),(36,'Lugo','Lugo',NULL,'Eloy Jiménez',NULL,'lugo@email.com','817523538',2),(37,'Mirandés','Burgos',NULL,'Sergi Egea','Michel Ochoa','mirandes@email.com','8975921898',2),(38,'Granada','Granada',NULL,'Juan Carlos Unzué',NULL,NULL,'8667089247',2),(39,'Numancia','Soria',NULL,NULL,NULL,'numancia@email.com','8239675241',2),(40,'Ponferradina','León',NULL,'Fran Fernández','Rubén Baraja','ponferradina@email.com','6161551781',2),(41,'Racing','Santander',NULL,'Mauricio Pochettino','Anquela López','racing@email.com','8259365124',2),(42,'Real Oviedo','Oviedo',NULL,'Pedro Emanuel',NULL,NULL,'8199026711',2),(43,'Real Sporting','Gijón',NULL,'Jose Carlos Martín','Manuel Pellegrini','sporting@email.com','6893249408',2),(44,'Real Zaragoza','Zaragoza',NULL,'Luis Antonio Sarmiento','José Luis Mendilibar',NULL,'8934401788',2),(45,'Tenerife','Tenerife',NULL,'Miguel Ángel López',NULL,'tenerife@email.com','8362759689',2),(46,'Osasuna','Pamplona',NULL,'José Jiménez Crespo',NULL,NULL,'8563652573',2);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament`
--

DROP TABLE IF EXISTS `tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tournament` (
  `TournamentId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `sport` varchar(45) NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  `createdate` varchar(45) NOT NULL,
  `disabled` tinyint(4) NOT NULL DEFAULT '0',
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`TournamentId`),
  KEY `FK_tournament_user_idx` (`UserId`),
  CONSTRAINT `FK_tournament_user` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament`
--

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;
INSERT INTO `tournament` VALUES (1,'Primera División','league','Fútbol','Fútbol 11','5/08/2019',0,1),(2,'Segunda División','league','Fútbol','Fútbol 11','5/08/2019',0,1),(3,'liga_prueba3','league','Fútbol','Fútbol 11','5/08/2019',0,1),(4,'liga_prueba4','league','Fútbol','Fútbol 11','5/08/2019',0,1),(5,'liga_prueba5','league','Fútbol','Fútbol 11','5/08/2019',0,1),(6,'copa_prueba1','playoff','Fútbol','Fútbol 11','5/08/2019',0,1),(7,'copa_prueba2','playoff','Fútbol','Fútbol 11','5/08/2019',0,1),(8,'copa_prueba3','playoff','Fútbol','Fútbol 11','5/08/2019',0,1),(9,'copa_prueba4','playoff','Fútbol','Fútbol 11','5/08/2019',0,1),(10,'copa_prueba5','playoff','Fútbol','Fútbol 11','5/08/2019',0,1);
/*!40000 ALTER TABLE `tournament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(40) DEFAULT NULL,
  `password` varchar(500) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `avatar` varchar(300) DEFAULT NULL,
  `isMaster` varchar(45) NOT NULL DEFAULT '0',
  `birthDate` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'juanlu@email.com','juanlu90','Juan Luis','Moreno Calderon','0fe9e47ce4428e3c1b9f712fb18bf738',1,'/images/profile/img-profile-8.png','1',NULL),(2,'cristina@email.com','cristina92','Cristina','Nuñez Parra','0c74ac34d6652b2da30488d4f38496d8',0,'/images/profile/img-profile-4.png','0',NULL),(16,'prueba@prueba.com','pelaez martin','Prueba','prueba','c893bad68927b457dbed39460e6afd62',0,NULL,'0',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-12 20:02:04
