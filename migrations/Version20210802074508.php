<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210802074508 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE code_postal (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE dirigeant (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, genre VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE societe (id INT AUTO_INCREMENT NOT NULL, ville_id INT NOT NULL, nom VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, INDEX IDX_19653DBDA73F0036 (ville_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE type_societe (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE type_societe_societe (type_societe_id INT NOT NULL, societe_id INT NOT NULL, INDEX IDX_2B97244AE1F4A326 (type_societe_id), INDEX IDX_2B97244AFCF77503 (societe_id), PRIMARY KEY(type_societe_id, societe_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE ville (id INT AUTO_INCREMENT NOT NULL, code_postal_id INT NOT NULL, nom VARCHAR(255) NOT NULL, INDEX IDX_43C3D9C3B2B59251 (code_postal_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE societe ADD CONSTRAINT FK_19653DBDA73F0036 FOREIGN KEY (ville_id) REFERENCES ville (id)');
        $this->addSql('ALTER TABLE type_societe_societe ADD CONSTRAINT FK_2B97244AE1F4A326 FOREIGN KEY (type_societe_id) REFERENCES type_societe (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE type_societe_societe ADD CONSTRAINT FK_2B97244AFCF77503 FOREIGN KEY (societe_id) REFERENCES societe (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE ville ADD CONSTRAINT FK_43C3D9C3B2B59251 FOREIGN KEY (code_postal_id) REFERENCES code_postal (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ville DROP FOREIGN KEY FK_43C3D9C3B2B59251');
        $this->addSql('ALTER TABLE type_societe_societe DROP FOREIGN KEY FK_2B97244AFCF77503');
        $this->addSql('ALTER TABLE type_societe_societe DROP FOREIGN KEY FK_2B97244AE1F4A326');
        $this->addSql('ALTER TABLE societe DROP FOREIGN KEY FK_19653DBDA73F0036');
        $this->addSql('DROP TABLE code_postal');
        $this->addSql('DROP TABLE dirigeant');
        $this->addSql('DROP TABLE societe');
        $this->addSql('DROP TABLE type_societe');
        $this->addSql('DROP TABLE type_societe_societe');
        $this->addSql('DROP TABLE ville');
    }
}
