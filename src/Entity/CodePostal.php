<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CodePostalRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=CodePostalRepository::class)
 */
class CodePostal
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("get:all-society")
     * @Groups("post:society")
     * @Groups("get:all-code")
     */
    private $id;
    
    /**
     * @ORM\Column(type="string")
     * @Groups("get:all-society")
     * @Groups("post:society")
     * @Groups("get:all-code")
     * @Groups("get:society-via-ville")
     */
    private $code;

    /**
     * @ORM\OneToMany(targetEntity=Ville::class, mappedBy="codePostal", orphanRemoval=true)
     */
    private $ville;

    public function __construct()
    {
        $this->ville = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    /**
     * @return Collection|Ville[]
     */
    public function getVille(): Collection
    {
        return $this->ville;
    }

    public function addVille(Ville $ville): self
    {
        if (!$this->ville->contains($ville)) {
            $this->ville[] = $ville;
            $ville->setCodePostal($this);
        }
        return $this;
    }

    public function removeVille(Ville $ville): self
    {
        if ($this->ville->removeElement($ville)) {
            // set the owning side to null (unless already changed)
            if ($ville->getCodePostal() === $this) {
                $ville->setCodePostal(null);
            }
        }

        return $this;
    }
}
