import styles from './home-ui-provider.module.css';

/* eslint-disable-next-line */
export interface HomeUiProviderProps {}

export function HomeUiProvider(props: HomeUiProviderProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to HomeUiProvider!</h1>
    </div>
  );
}

export default HomeUiProvider;
