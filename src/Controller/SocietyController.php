<?php

namespace App\Controller;

use App\Entity\Societe;
use App\Repository\VilleRepository;
use App\Repository\SocieteRepository;
use App\Repository\CodePostalRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TypeSocieteRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SocietyController extends AbstractController
{


    /**
     * @Route("/api/code/{idCodePostal}" , methods={"GET"})
     */
    public function getVille(int $idCodePostal, CodePostalRepository $codePostalRepository /*Request $request, SerializerInterface $serialiser, EntityManagerInterface $em*/)
    {
        $villes = $codePostalRepository->find($idCodePostal)->getVille();
        // dd($idCodePostal);
        return $this->json($villes, 200, [], ["groups" => "get:ville-on-code"]);
    }


    /**
     * @Route("/api/type-societe", methods={"GET"})
     */
    public function getAllTypeSociete(TypeSocieteRepository $typeSociete)
    {
        return $this->json($typeSociete->findAll(), 200, [], ["groups" => "get:all-type-society"]);
    }

    /**
     * @Route("/api/typeAndSociete", methods={"GET"})
     */
    public function getTypePlusSociete(TypeSocieteRepository $typeSociete)
    {
        return $this->json($typeSociete->findAll(), 200, [], ["groups" => "get:typeAndSociety"]);
    }

    /**
     * @Route("/api/get-society-via-ville", methods={"GET"})
     */
    public function getSocietyViaVille(VilleRepository $VilleRepository)
    {
        return $this->json($VilleRepository->findAll(), 200, [], ["groups" => "get:society-via-ville"]);
    }

    /**
     * @Route("/api/code" , methods={"GET"})
     */
    public function getAllCodePostal(CodePostalRepository $codePostalRepository)
    {
        return $this->json($codePostalRepository->findAll(), 200, [], ["groups" => "get:all-code"]);
    }


    /**
     * @Route("/api/societe" , methods={"GET"})
     */
    public function getAllSociete(SocieteRepository $societe)
    {
        return $this->json($societe->findAll(), 200, [], ["groups" => "get:all-society"]);
    }

    /**
     * @Route("/api/societe" , methods={"POST"})
     */
    public function postSociete(Request $request, VilleRepository $VilleRepository, TypeSocieteRepository $typeSociete, SerializerInterface $serialiser, EntityManagerInterface $em)
    {
        $jsonRecu = $request->getContent();
        $donnee = json_decode($jsonRecu, true);

        $societe = new Societe();
        $societe->setNom($donnee['nom'])
            ->setDescription($donnee['description'])
            ->setVille($VilleRepository->find($donnee['ville']));
        foreach ($donnee['type'] as $key => $value) {
            $societe->addTypeSociete($typeSociete->find($value));
        }
        $em->persist($societe);
        $em->flush();
        return $this->json($societe, 200, [], ["groups" => "post:society"]);
    }
}
