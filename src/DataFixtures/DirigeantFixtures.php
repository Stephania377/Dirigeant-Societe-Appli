<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Dirigeant;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class DirigeantFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $faker = Factory::create("FR_fr");
        $genre = array ('homme','femme');
        for ($i=0; $i < 20 ; $i++) { 
            $aleatoire = $faker->numberBetween(0, 1);
            $dirigeant = new Dirigeant();
            $dirigeant->setNom($faker->name)
            ->setPrenom($faker->lastName)
            ->setEmail($faker->freeEmail)
            ->setGenre($genre[$aleatoire]);
            $manager->persist($dirigeant);
        }
        $manager->flush();
    }
}
