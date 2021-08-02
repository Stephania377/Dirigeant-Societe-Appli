<?php

namespace App\DataFixtures;

use App\Entity\CodePostal;
use Faker\Factory;
use App\Entity\Ville;
use App\Entity\Societe;
use App\Entity\TypeSociete;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class SocieteFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create("FR_fr");
        $society = array('SARL', 'EURL', 'SELARL', 'SA', 'SAS', 'SNC', 'SCP');
        //creation des 6 type de societe
        for ($i = 0; $i < 6; $i++) {
            $typeSociete = new TypeSociete();
            $typeSociete->setNom($society[$i]);
            //on cree 1 a 3 code postal
            for ($l = 0; $l < $faker->numberBetween(1, 3); $l++) {
                $codePostal = new CodePostal();
                $codePostal->setCode($faker->postcode);

                //pour chaque type de societe on creer 14 ville
                for ($j = 0; $j < 7; $j++) {
                    $ville = new Ville();
                    $ville->setNom($faker->city);
                    $ville->setCodePostal($codePostal);

                    //on cree societe 1 a 3
                    for ($k = 0; $k < $faker->numberBetween(1, 3); $k++) {
                        $societe = new Societe();
                        $societe->setNom($faker->company);
                        $societe->setDescription($faker->sentence($nbWords = 6, $variableNbWords = true))
                            ->setVille($ville);
                            for ($m=0; $m < $faker->numberBetween(1, 3) ; $m++) { 
                                $societe->addTypeSociete($typeSociete);
                            }
                        $manager->persist($societe);
                    }
                    $manager->persist($ville);
                }
                $manager->persist($codePostal);
            }
            $manager->persist($typeSociete);
        }
        $manager->flush();
    }
}
