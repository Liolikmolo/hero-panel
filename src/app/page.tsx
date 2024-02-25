import styles from './page.module.scss';
import HeroesList from '@/components/heroesList/HeroesList';
import HeroesAddForm from '@/components/heroesAddForm/HeroesAddForm';
import HeroesFilters from '@/components/heroesFilters/HeroesFilters';

export default function Home() {
  return (
    <main className={styles.app}>
      <div className={styles.content}>
        <HeroesList />
        <div className={styles.content__interactive}>
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
    </main>
  );
}
