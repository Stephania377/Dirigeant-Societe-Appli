<?php

namespace App\Controller;

use App\Entity\Dirigeant;
use App\Entity\Societe;
use App\Entity\Ville;
use App\Repository\CodePostalRepository;
use App\Repository\SocieteRepository;
use App\Repository\DirigeantRepository;
use App\Repository\TypeSocieteRepository;
use App\Repository\VilleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;

class IndexController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="index", priority="-1", defaults={"reactRouting": null}, requirements={"reactRouting"=".+"})
    */
    public function index(): Response
    {
        return $this->render('index/index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }
}
