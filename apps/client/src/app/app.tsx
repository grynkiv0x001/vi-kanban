import { Footer } from "@/components/footer";
import { KeyboardWrapper } from "@/components/keyboard-wrapper";

import { ProjectList } from "@/views/project-list";

import * as styles from './app.styles.ts';

export const App = () => {
  return (
    <KeyboardWrapper>
      <section css={styles.app}>
        <ProjectList />
        <Footer />
      </section>
    </KeyboardWrapper>
  );
};
