import stylex from '@stylexjs/stylex';
import { ThemeProvider } from '@/components/utils/Theme';
import { theme } from '@/themes/base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleWhole, faCarrot } from '@fortawesome/free-solid-svg-icons';
import '@/styles/main.css';

import { MultiCombobox } from '@/components/atoms/Combobox';

const styles = stylex.create({
  host: {
    width: '80%',
  },
});

describe('MultiCombobox', () => {
  it('should select a single option', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiCombobox sx={styles.host}>
          <MultiCombobox.Option value='apple'>Apple</MultiCombobox.Option>
          <MultiCombobox.Option value='carrot'>Carrot</MultiCombobox.Option>
        </MultiCombobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=option-carrot]').click();

    cy.get('[data-cy=chip-carrot]').should('exist');
    cy.get('[data-cy=chip-carrot]').should('have.text', 'Carrot');
  });

  it('should select an option and pick its leading icon', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiCombobox sx={styles.host}>
          <MultiCombobox.Option
            value='apple'
            leadingIcon={<FontAwesomeIcon icon={faAppleWhole} />}
          >
            Apple
          </MultiCombobox.Option>
          <MultiCombobox.Option
            value='carrot'
            leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
          >
            Carrot
          </MultiCombobox.Option>
        </MultiCombobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();

    cy.get('[data-cy=option-carrot]').click();
    cy.get('[data-cy=chip-carrot] [data-icon=carrot]').should('exist');
  });

  it('should select multiple options', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiCombobox sx={styles.host}>
          <MultiCombobox.Option value='apple'>Apple</MultiCombobox.Option>
          <MultiCombobox.Option value='carrot'>Carrot</MultiCombobox.Option>
        </MultiCombobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();

    cy.get('[data-cy=option-apple]').click();
    cy.get('[data-cy=chip-apple]').should('exist');

    cy.get('[data-cy=option-carrot]').click();
    cy.get('[data-cy=chip-carrot]').should('exist');
  });

  it('should delete an option by clicking on delete', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiCombobox sx={styles.host}>
          <MultiCombobox.Option value='apple'>Apple</MultiCombobox.Option>
          <MultiCombobox.Option value='carrot'>Carrot</MultiCombobox.Option>
        </MultiCombobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();

    cy.get('[data-cy=option-apple]').click();
    cy.get('[data-cy=chip-apple] [data-cy=delete]').click();
    cy.get('[data-cy=chip-apple]').should('not.exist');
  });

  it('should delete an option by deselecting it', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiCombobox sx={styles.host}>
          <MultiCombobox.Option value='apple'>Apple</MultiCombobox.Option>
          <MultiCombobox.Option value='carrot'>Carrot</MultiCombobox.Option>
        </MultiCombobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();

    cy.get('[data-cy=option-apple]').click();
    cy.get('[data-cy=option-apple]').click();
    cy.get('[data-cy=chip-apple]').should('not.exist');
  });

  it('should have a single default value', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiCombobox sx={styles.host} defaultValue={['carrot']}>
          <MultiCombobox.Option value='apple'>Apple</MultiCombobox.Option>
          <MultiCombobox.Option value='carrot'>Carrot</MultiCombobox.Option>
        </MultiCombobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=chip-apple]').should('not.exist');
    cy.get('[data-cy=chip-carrot]').should('exist');
  });

  it('should have multiple default values', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiCombobox sx={styles.host} defaultValue={['apple', 'carrot']}>
          <MultiCombobox.Option value='apple'>Apple</MultiCombobox.Option>
          <MultiCombobox.Option value='carrot'>Carrot</MultiCombobox.Option>
        </MultiCombobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=chip-apple]').should('exist');
    cy.get('[data-cy=chip-carrot]').should('exist');
  });

  it('should stay empty on blur', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiCombobox sx={styles.host}>
          <MultiCombobox.Option value='apple'>Apple</MultiCombobox.Option>
          <MultiCombobox.Option value='carrot'>Carrot</MultiCombobox.Option>
        </MultiCombobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('body').click('bottomRight');

    cy.get('[data-cy=chip-carrot]').should('not.exist');
    cy.get('[data-cy=chip-apple]').should('not.exist');
  });
});
