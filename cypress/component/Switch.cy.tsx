import stylex from '@stylexjs/stylex';
import { ThemeProvider } from '~/components/Theme';
import '~/styles/main.css';

import { Switch } from '~/components/Switch';

const styles = stylex.create({
  host: {
    display: 'flex',
    padding: '1rem',
  },
});

describe('Uncontrolled Switch', () => {
  it('should be toggled-off by default', () => {
    cy.mount(
      <ThemeProvider sx={styles.host}>
        <Switch />
      </ThemeProvider>,
    );

    cy.get('[data-cy=switch]').should('not.be.checked');
  });

  it('should have a default state', () => {
    cy.mount(
      <ThemeProvider sx={styles.host}>
        <Switch defaultChecked />
      </ThemeProvider>,
    );

    cy.get('[data-cy=switch]').should('be.checked');
  });

  it('should have a default value', () => {
    cy.mount(
      <ThemeProvider sx={styles.host}>
        <Switch defaultValue='banana' />
      </ThemeProvider>,
    );

    cy.get('[data-cy=switch]').should('have.value', 'banana');
  });

  it('should toggle state', () => {
    cy.mount(
      <ThemeProvider sx={styles.host}>
        <Switch />
      </ThemeProvider>,
    );

    cy.get('[data-cy=switch]').click();
    cy.get('[data-cy=switch]').should('be.checked');
  });
});

describe('Controlled Switch', () => {
  it('should have a controlled state', () => {
    cy.mount(
      <ThemeProvider sx={styles.host}>
        <Switch checked />
      </ThemeProvider>,
    );

    cy.get('[data-cy=switch]').should('be.checked');
  });

  it('should have a controlled value', () => {
    cy.mount(
      <ThemeProvider sx={styles.host}>
        <Switch value='banana' />
      </ThemeProvider>,
    );

    cy.get('[data-cy=switch]').should('have.value', 'banana');
  });

  it('should trigger event on state change', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(
      <ThemeProvider sx={styles.host}>
        <Switch checked={false} onChange={onChange} />
      </ThemeProvider>,
    );

    cy.get('[data-cy=switch]').click();
    cy.get('[data-cy=switch]').should('not.be.checked');
  });
});
