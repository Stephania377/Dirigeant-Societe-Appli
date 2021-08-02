<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\DirigeantRepository;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=DirigeantRepository::class)
 */
class Dirigeant
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("get:all-dirigeant")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("get:all-dirigeant")
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("get:all-dirigeant")
     * @Groups("post:one-dirigeant")
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("get:all-dirigeant")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("get:all-dirigeant")
     */
    private $genre;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getGenre(): ?string
    {
        return $this->genre;
    }

    public function setGenre(string $genre): self
    {
        $this->genre = $genre;

        return $this;
    }
}
