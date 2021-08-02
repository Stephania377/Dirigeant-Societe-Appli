<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\VilleRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=VilleRepository::class)
 */
class Ville
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("get:all-society")
     * @Groups("post:society")
     * @Groups("get:ville-on-code")
     * @Groups("get:society-via-ville")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("get:all-society")
     * @Groups("post:society")
     * @Groups("get:ville-on-code")
     * @Groups("get:society-via-ville")
     */
    private $nom;

    /**
     * @ORM\ManyToOne(targetEntity=CodePostal::class, inversedBy="ville")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("get:all-society")
     * @Groups("post:society")
     * @Groups("get:society-via-ville")
     */
    private $codePostal;

    /**
     * @ORM\OneToMany(targetEntity=Societe::class, mappedBy="ville", orphanRemoval=true)
     * @Groups("get:society-via-ville")
     */
    private $societes;

    public function __construct()
    {
        $this->societes = new ArrayCollection();
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

    public function getCodePostal(): ?CodePostal
    {
        return $this->codePostal;
    }

    public function setCodePostal(?CodePostal $codePostal): self
    {
        $this->codePostal = $codePostal;

        return $this;
    }

    /**
     * @return Collection|Societe[]
     */
    public function getSocietes(): Collection
    {
        return $this->societes;
    }

    public function addSociete(Societe $societe): self
    {
        if (!$this->societes->contains($societe)) {
            $this->societes[] = $societe;
            $societe->setVille($this);
        }

        return $this;
    }

    public function removeSociete(Societe $societe): self
    {
        if ($this->societes->removeElement($societe)) {
            // set the owning side to null (unless already changed)
            if ($societe->getVille() === $this) {
                $societe->setVille(null);
            }
        }

        return $this;
    }
}
