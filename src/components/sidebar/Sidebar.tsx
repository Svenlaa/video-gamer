import Link from 'next/link'
import { trpc } from '../../utils/trpc'
import Game from './game'

const Sidebar = () => {
  const recentGamesQuery = trpc.useQuery(['game.getRecent'])
  const categoryQuery = trpc.useQuery(['category.getAll'])

  if (!recentGamesQuery.isSuccess || !categoryQuery.isSuccess)
    return <p>Wait a moment</p>

  const { data: recentGames } = recentGamesQuery
  const { data: categories } = categoryQuery

  return (
    <div className="hidden md:block md:w-1/4">
      <div>
        <h2 className="mt-2 text-xl font-semibold uppercase">All categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="group">
              <h3 className="text-lg font-bold">{category.name}</h3>
              <ul className="hidden group-hover:block">
                {category.games.map((g) => (
                  <li key={g.id}>
                    <Link href={`/game/${g.slug}`}>
                      <a className="duration-150 hover:text-rose-500">
                        {g.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="mt-2 text-xl font-semibold uppercase">
          Recent Releases
        </h2>
        <ul>
          {recentGames.map((game) => (
            <Game
              key={game.id}
              title={game.title}
              slug={game.slug}
              imgUrl={game.coverImg}
              releaseDate={game.releaseDate.toLocaleDateString()}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

// await ssg.prefetchQuery('game.getRecent')
// await ssg.prefetchQuery('category.getAll')

export default Sidebar
