import stylex from '@stylexjs/stylex';
import { ThemeProvider } from '@/components/utils/Theme';
import { theme } from '@/themes/base';
import '@/styles/main.css';

import { TextField } from '@/components/atoms/TextField';

const styles = stylex.create({
  host: {
    width: '80%',
  },
});

describe('TextField', () => {
  it('should have default value', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <TextField sx={styles.host} defaultValue='Hello World!' />
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').should('have.value', 'Hello World!');
  });

  it('should set value if uncontrolled', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <TextField sx={styles.host} onChange={onChange} />
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=input]').type('Hello World!');
    cy.get('[data-cy=input]').should('have.value', 'Hello World!');
    cy.get('@onChange').should('have.been.called');
  });

  it('should not set value if controlled without onChange handler', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <TextField sx={styles.host} onChange={onChange} value='Hello World!' />
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=input]').should('have.value', 'Hello World!');
    cy.get('[data-cy=input]').type('Hello Earth!');
    cy.get('[data-cy=input]').should('have.value', 'Hello World!');
    cy.get('@onChange').should('have.been.called');
  });

  it('should clear value if uncontrolled', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <TextField sx={styles.host} onChange={onChange} clearable />
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=input]').type('Hello World!');
    cy.get('[data-cy=input]').should('have.value', 'Hello World!');
    cy.get('[data-cy=clearButton]').click();
    cy.get('[data-cy=input]').should('have.value', '');
    cy.get('@onChange').should('have.been.called');
  });

  it('should not clear value if controlled without onChange handler', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <TextField
          sx={styles.host}
          value='Hello World!'
          onChange={onChange}
          clearable
        />
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=input]').type('Hello World!');
    cy.get('[data-cy=input]').should('have.value', 'Hello World!');
    cy.get('[data-cy=clearButton]').click();
    cy.get('[data-cy=input]').should('have.value', 'Hello World!');
    cy.get('@onChange').should('have.been.called');
  });
});
