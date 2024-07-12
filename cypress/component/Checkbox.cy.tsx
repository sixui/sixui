import stylex from '@stylexjs/stylex';
import { ThemeProvider } from '@/components/utils/Theme';
import { theme } from '@/themes/base';
import '@/styles/main.css';

import { Checkbox } from '@/components/atoms/Checkbox';

const styles = stylex.create({
  host: {
    display: 'flex',
    padding: '1rem',
  },
});

describe('Uncontrolled Checkbox', () => {
  it('should be unchecked by default', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Checkbox />
      </ThemeProvider>,
    );

    cy.get('[data-cy=checkbox]').should('not.be.checked');
  });

  it('should have a default state', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Checkbox defaultChecked />
      </ThemeProvider>,
    );

    cy.get('[data-cy=checkbox]').should('be.checked');
  });

  it('should have a default value', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Checkbox defaultValue='banana' />
      </ThemeProvider>,
    );

    cy.get('[data-cy=checkbox]').should('have.value', 'banana');
  });

  it('should switch to checked state', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Checkbox />
      </ThemeProvider>,
    );

    cy.get('[data-cy=checkbox]').click();
    cy.get('[data-cy=checkbox]').should('be.checked');
  });
});

describe('Controlled Checkbox', () => {
  it('should have a controlled state', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Checkbox checked />
      </ThemeProvider>,
    );

    cy.get('[data-cy=checkbox]').should('be.checked');
  });

  it('should have a controlled value', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Checkbox value='banana' />
      </ThemeProvider>,
    );

    cy.get('[data-cy=checkbox]').should('have.value', 'banana');
  });

  it('should trigger event on state change', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Checkbox checked={false} onChange={onChange} />
      </ThemeProvider>,
    );

    cy.get('[data-cy=checkbox]').click();
    cy.get('[data-cy=checkbox]').should('not.be.checked');
  });
});
