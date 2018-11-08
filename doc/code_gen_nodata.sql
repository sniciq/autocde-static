-- MySQL dump 10.13  Distrib 5.6.20, for osx10.8 (x86_64)
--
-- Host: 127.0.0.1    Database: code_gen
-- ------------------------------------------------------
-- Server version	5.6.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acrole`
--

DROP TABLE IF EXISTS `acrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acrole` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '角色名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `acrole_user`
--

DROP TABLE IF EXISTS `acrole_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acrole_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` varchar(45) DEFAULT NULL,
  `userId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `acuser`
--

DROP TABLE IF EXISTS `acuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '名称',
  `email` varchar(45) DEFAULT NULL COMMENT '邮箱',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `telphone` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '状态，0:注册,1:验证通过,-1:删除',
  `signupDate` datetime DEFAULT NULL COMMENT '注册时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `acuser_log`
--

DROP TABLE IF EXISTS `acuser_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acuser_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `logType` int(11) DEFAULT NULL COMMENT '日志类型,1:登录,2:退出',
  `logDate` datetime DEFAULT NULL COMMENT '时间',
  `info` varchar(100) DEFAULT NULL COMMENT '信息',
  PRIMARY KEY (`id`),
  KEY `idx_acuser_log_userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1683 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `datatable`
--

DROP TABLE IF EXISTS `datatable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datatable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL COMMENT '表名',
  `projectId` int(11) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL COMMENT '备注说明',
  `encode` varchar(45) DEFAULT NULL COMMENT '编码',
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_ datatable_projectId` (`projectId`)
) ENGINE=InnoDB AUTO_INCREMENT=1339 DEFAULT CHARSET=utf8 COMMENT='数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `datatable_column`
--

DROP TABLE IF EXISTS `datatable_column`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datatable_column` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datatableId` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `nameCN` varchar(100) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `type` varchar(155) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `isPK` int(11) DEFAULT NULL COMMENT '是否主键\n1:主键',
  `isAI` int(11) DEFAULT NULL COMMENT '是否自增长\n1:自增长',
  PRIMARY KEY (`id`),
  KEY `idx_datatable_column_tableId` (`datatableId`)
) ENGINE=InnoDB AUTO_INCREMENT=12281 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emailnotic`
--

DROP TABLE IF EXISTS `emailnotic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emailnotic` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createUserId` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text,
  `lastSendTime` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '0:草稿, 1:已发布',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emailnotic_rcv`
--

DROP TABLE IF EXISTS `emailnotic_rcv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emailnotic_rcv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emailnoticId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '模块名称',
  `nameEN` varchar(255) DEFAULT NULL,
  `countSql` varchar(255) DEFAULT NULL,
  `limitSql` varchar(255) DEFAULT NULL,
  `projectId` int(11) DEFAULT NULL,
  `hasAdd` int(11) DEFAULT NULL,
  `hasDelete` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '类型，1：单表，2：联合查询',
  `groupName` varchar(100) DEFAULT NULL,
  `groupNameEN` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_module_projectId` (`projectId`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `module_table`
--

DROP TABLE IF EXISTS `module_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datatableId` int(11) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_module_table_tableId` (`datatableId`),
  KEY `idx_module_table_mid` (`moduleId`)
) ENGINE=InnoDB AUTO_INCREMENT=384 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `module_table_column`
--

DROP TABLE IF EXISTS `module_table_column`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module_table_column` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `moduleId` int(11) DEFAULT NULL,
  `columnId` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '类型，1：查询项目，2：列表展示',
  PRIMARY KEY (`id`),
  KEY `idx_module_table_column_mid` (`moduleId`),
  KEY `idx_module_table_column_cId` (`columnId`)
) ENGINE=InnoDB AUTO_INCREMENT=2303 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `module_table_relation`
--

DROP TABLE IF EXISTS `module_table_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module_table_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `relType` varchar(45) DEFAULT NULL COMMENT '''LEFT JOIN'',''WHERE'',''GROUP BY'',''ORDER BY'',''INNER JOIN'',''RIGHT JOIN''',
  `groupBy` int(11) DEFAULT NULL COMMENT 'datatable_column表的ID',
  `orderBy` int(11) DEFAULT NULL COMMENT 'datatable_column表的ID',
  `orderDir` varchar(45) DEFAULT NULL COMMENT 'ASC、DESC',
  `columnA` int(11) DEFAULT NULL COMMENT 'datatable_column表的ID',
  `columnB` int(11) DEFAULT NULL COMMENT 'datatable_column表的ID',
  `condtionType` varchar(45) DEFAULT NULL COMMENT '''='',''!='',''>'',''<''',
  `condtionValue` varchar(200) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_module_table_relation_mId` (`moduleId`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8 COMMENT='联合查询关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notebook`
--

DROP TABLE IF EXISTS `notebook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notebook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `infoId` int(11) DEFAULT NULL,
  `content` longtext,
  PRIMARY KEY (`id`),
  KEY `idx_notebook_infoId` (`infoId`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notebookFolder`
--

DROP TABLE IF EXISTS `notebookFolder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notebookFolder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `pId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_ notebookFolder_pId` (`pId`),
  KEY `idx_ notebookFolder_userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='笔记本目录';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notebookInfo`
--

DROP TABLE IF EXISTS `notebookInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notebookInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `lastModifyDate` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `tag` varchar(100) DEFAULT NULL,
  `folderId` int(11) DEFAULT NULL COMMENT '所在文件夹ID',
  PRIMARY KEY (`id`),
  KEY `idx_ notebookInfo_userId` (`userId`),
  KEY `idx_ notebookInfo_folderId` (`folderId`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createUser` int(11) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `lookLike` int(11) DEFAULT NULL COMMENT '1: EXTJS\n2. bootstrap',
  `baseAuth` int(11) DEFAULT NULL COMMENT '是否包含基础权限\n0:不包含\n1:包含',
  `projectType` int(11) DEFAULT NULL COMMENT '项目类型\n1:springMVC',
  `daoType` int(11) DEFAULT NULL COMMENT 'DSO类型\n1:MyBatis',
  `datebaseType` int(11) DEFAULT NULL COMMENT '数据库类型\n1:MySQL',
  `groupId` varchar(255) DEFAULT NULL,
  `artifactId` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pwd_rst_link`
--

DROP TABLE IF EXISTS `pwd_rst_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pwd_rst_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `vlCode` varchar(500) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '0：未使用\n1：已使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-03 14:31:30
