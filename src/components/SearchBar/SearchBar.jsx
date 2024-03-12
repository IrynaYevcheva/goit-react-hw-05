import styles from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          type="text"
          name="query"
          placeholder="Search movies by title"
          autoComplete="off"
          required
          autoFocus
        />
        <button className={styles.button}>Search</button>
      </form>
    </>
  );
};
