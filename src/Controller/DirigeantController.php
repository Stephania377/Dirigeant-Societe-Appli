<?php

namespace App\Controller;

use App\Entity\Dirigeant;
use App\Repository\DirigeantRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DirigeantController extends AbstractController
{
    /**
     * @Route("/api/dirigeant" , methods={"GET"})
    */
    public function getAllDirigeant(DirigeantRepository $dirigeant)
    {
        return $this->json($dirigeant->findAll(), 200, [],["groups" => "get:all-dirigeant"]);
    }

    /**
     * @Route("/api/dirigeant" , methods={"POST"})
     */
    public function postDirigeant(Request $request, SerializerInterface $serialiser, EntityManagerInterface $em)
    {
        $jsonRecu = $request->getContent();
        $dirigeant = $serialiser->deserialize($jsonRecu, Dirigeant::class, 'json');
        if(!$dirigeant->getPrenom() || !$dirigeant->getNom() || !$dirigeant->getEmail() || !$dirigeant->getGenre() ){
            return $this->json(array(['error' => "something is wrong"]), 500, []);
        }
        $em->persist($dirigeant);
        $em->flush();
        return $this->json($dirigeant, 200, [],["groups" => "post:one-dirigeant"]);
    }
}
