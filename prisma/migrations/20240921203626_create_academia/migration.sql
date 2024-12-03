-- CreateTable
CREATE TABLE `Treino` (
    `id_treino` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `duracao` INTEGER NOT NULL,
    `intensidade` INTEGER NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Treino_id_treino_key`(`id_treino`),
    PRIMARY KEY (`id_treino`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id_status` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agendamento` (
    `id_agendamento` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(191) NOT NULL,
    `id_treino` INTEGER NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `horario` VARCHAR(191) NOT NULL,
    `id_status` INTEGER NOT NULL,

    UNIQUE INDEX `Agendamento_id_agendamento_key`(`id_agendamento`),
    PRIMARY KEY (`id_agendamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `Status`(`id_status`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_id_treino_fkey` FOREIGN KEY (`id_treino`) REFERENCES `Treino`(`id_treino`) ON DELETE RESTRICT ON UPDATE CASCADE;
