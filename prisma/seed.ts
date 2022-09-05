import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const category = await prisma.category.createMany({
    data: [
      {
        name: 'Action',
        slug: 'action'
      },
      {
        name: 'Racing',
        slug: 'racing'
      },
      {
        name: 'Platformer',
        slug: 'platformer'
      }
    ]
  })

  const game = await prisma.game.createMany({
    data: [
      {
        categorySlug: 'action',
        coverImg: 'HK.jpg',
        slug: 'hollow_knight',
        title: 'Hollow Knight',
        releaseDate: new Date('2018-06-12')
      },
      {
        categorySlug: 'racing',
        coverImg: 'MK8.jpg',
        slug: 'mario_kart_8_deluxe',
        title: 'Mario Kart™ 8 Deluxe',
        releaseDate: new Date('2017-04-28')
      },
      {
        categorySlug: 'platformer',
        coverImg: 'O.jpg',
        slug: 'super_mario_odyssey',
        releaseDate: new Date('2017-10-27'),
        title: 'Super Mario Odyssey™'
      },
      {
        categorySlug: 'action',
        coverImg: 'KBSA.jpg',
        slug: 'kirby_star_allies',
        releaseDate: new Date('2018-03-16'),
        title: 'Kirby™ Star Allies'
      }
    ]
  })
}

main().then(async () => {
  await prisma.$disconnect()
})
