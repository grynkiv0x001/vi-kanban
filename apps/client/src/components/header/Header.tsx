import * as styles from './header.styles';

export const Header = () => {
  return (
    <header css={styles.header}>
      <nav>
        <a href="/">Logo</a>
      </nav>
      {/* TODO: Project name here (editable input) 👇 */}
      {/*<input type="text"/>*/}
      <input type="text" name="search" />
      <nav>
        <a href="#">Create</a>
        <a href="#">Settings</a>
        <a href="#">Account</a>
      </nav>
    </header>
  );
};
