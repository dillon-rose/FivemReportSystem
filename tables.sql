CREATE TABLE IF NOT EXISTS `p_reports` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`creatorName` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`creatorHex` VARCHAR(15) NOT NULL COLLATE 'utf8mb4_general_ci',
	`offenderName` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`offenderHex` VARCHAR(15) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`createdAt` INT(11) NOT NULL,
	`status` ENUM('solving','unsolved','solved') NOT NULL DEFAULT 'unsolved' COLLATE 'utf8mb4_general_ci',
	`result` ENUM('ban','kick','warn','verbal','nothing','other') NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`solvedByDiscordId` VARCHAR(19) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`description` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;
CREATE TABLE IF NOT EXISTS `p_report_notes` (
	`reportId` INT(11) NULL DEFAULT NULL,
	`targetDiscord` VARCHAR(19) NOT NULL COLLATE 'utf8mb4_general_ci',
	`note` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`creatorDiscord` VARCHAR(19) NOT NULL COLLATE 'utf8mb4_general_ci',
	`rating` ENUM('POSITIVE','NEGATIVE','NEUTRAL') NOT NULL COLLATE 'utf8mb4_general_ci',
	`noteId` INT(11) NOT NULL AUTO_INCREMENT,
	`timestamp` INT(11) NULL DEFAULT current_timestamp(),
	PRIMARY KEY (`noteId`) USING BTREE,
	INDEX `P_report_notes_reportId_Fkey` (`reportId`) USING BTREE,
	CONSTRAINT `P_report_notes_reportId_Fkey` FOREIGN KEY (`reportId`) REFERENCES `p_reports` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;
CREATE TABLE IF NOT EXISTS `p_report_responses` (
	`reportId` INT(11) NOT NULL,
	`time` INT(11) NOT NULL,
	`staffDiscord` VARCHAR(19) NOT NULL COLLATE 'utf8mb4_general_ci',
	`isPrimary` TINYINT(1) NULL DEFAULT '0',
	INDEX `P_report_respponses_reportId_Fkey` (`reportId`) USING BTREE,
	CONSTRAINT `P_report_respponses_reportId_Fkey` FOREIGN KEY (`reportId`) REFERENCES `p_reports` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;
CREATE TABLE IF NOT EXISTS `p_staff_playtime` (
	`staffDiscord` VARCHAR(19) NOT NULL COLLATE 'utf8mb4_general_ci',
	`joinTime` INT(11) NOT NULL,
	`sessionLength` INT(11) NOT NULL
)
ENGINE=InnoDB
;
