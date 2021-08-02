<?php

namespace App\Entity;

use App\Entity\TypeSociete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\SocieteRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=SocieteRepository::class)
 */
class Societe
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("get:all-society")
     * @Groups("post:society")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("get:all-society")
     * @Groups("post:society")
     * @Groups("get:typeAndSociety")
     * @Groups("get:society-via-ville")
     */
    private $nom;

    /**
     * @ORM\Column(type="text")
     * @Groups("get:all-society")
     * @Groups("post:society")
     */
    private $description;
    
    /**
     * @ORM\ManyToMany(targetEntity=TypeSociete::class, mappedBy="societe")
     * @Groups("get:all-society")
     * @Groups("post:society")
    */
    private $typeSocietes;

    /**
     * @ORM\ManyToOne(targetEntity=Ville::class, inversedBy="societes")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("get:all-society")
     * @Groups("post:society")
     */
    private $ville;


    public function __construct()
    {
        $this->typeSocietes = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|TypeSociete[]
     */
    public function getTypeSocietes(): Collection
    {
        return $this->typeSocietes;
    }

    public function addTypeSociete(TypeSociete $typeSociete): self
    {
        if (!$this->typeSocietes->contains($typeSociete)) {
            $this->typeSocietes[] = $typeSociete;
            $typeSociete->addSociete($this);
        }

        return $this;
    }

    public function removeTypeSociete(TypeSociete $typeSociete): self
    {
        if ($this->typeSocietes->removeElement($typeSociete)) {
            $typeSociete->removeSociete($this);
        }

        return $this;
    }

    public function getVille(): ?Ville
    {
        return $this->ville;
    }

    public function setVille(?Ville $ville): self
    {
        $this->ville = $ville;

        return $this;
    }
}
