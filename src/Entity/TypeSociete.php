<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\TypeSocieteRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TypeSocieteRepository::class)
 */
class TypeSociete
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("post:society")
     * @Groups("get:all-type-society")
     * @Groups("get:all-society")
     * @Groups("get:typeAndSociety")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("post:society")
     * @Groups("get:all-type-society")
     * @Groups("get:all-society")
     * @Groups("get:typeAndSociety")
     */
    private $nom;

    /**
     * @ORM\ManyToMany(targetEntity=Societe::class, inversedBy="typeSocietes")
     * @Groups("get:typeAndSociety")
     */
    private $societe;

    public function __construct()
    {
        $this->societe = new ArrayCollection();
    }

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

    /**
     * @return Collection|Societe[]
     */
    public function getSociete(): Collection
    {
        return $this->societe;
    }

    public function addSociete(Societe $societe): self
    {
        if (!$this->societe->contains($societe)) {
            $this->societe[] = $societe;
        }

        return $this;
    }

    public function removeSociete(Societe $societe): self
    {
        $this->societe->removeElement($societe);

        return $this;
    }
}
