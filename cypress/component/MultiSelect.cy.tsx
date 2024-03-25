import { ThemeProvider } from '@/components/utils/Theme';
import { theme } from '@/themes/base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleWhole, faCarrot } from '@fortawesome/free-solid-svg-icons';
import '@/styles/main.css';

import { MultiSelect } from '@/components/atoms/Select';

describe('MultiSelect', () => {
  it('should select a single option', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiSelect>
          <MultiSelect.Option value='apple'>Apple</MultiSelect.Option>
          <MultiSelect.Option value='carrot'>Carrot</MultiSelect.Option>
        </MultiSelect>
      </ThemeProvider>,
    );

    cy.get('[data-cy=field]').click();
    cy.get('[data-cy=option-carrot]').click();
    cy.get('[data-cy=chip-apple]').should('not.exist');
    cy.get('[data-cy=chip-carrot]').should('exist');
    cy.get('[data-cy=chip-carrot]').should('have.text', 'Carrot');
  });

  it('should select an option and pick its leading icon', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiSelect>
          <MultiSelect.Option
            value='apple'
            leadingIcon={<FontAwesomeIcon icon={faAppleWhole} />}
          >
            Apple
          </MultiSelect.Option>
          <MultiSelect.Option
            value='carrot'
            leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
          >
            Carrot
          </MultiSelect.Option>
        </MultiSelect>
      </ThemeProvider>,
    );

    cy.get('[data-cy=field]').click();
    cy.get('[data-cy=option-carrot]').click();
    cy.get('[data-cy=chip-carrot] [data-icon=carrot]').should('exist');
  });

  it('should select multiple options', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiSelect>
          <MultiSelect.Option value='apple'>Apple</MultiSelect.Option>
          <MultiSelect.Option value='carrot'>Carrot</MultiSelect.Option>
        </MultiSelect>
      </ThemeProvider>,
    );

    cy.get('[data-cy=field]').click();

    cy.get('[data-cy=option-apple]').click();
    cy.get('[data-cy=chip-apple]').should('exist');

    cy.get('[data-cy=option-carrot]').click();
    cy.get('[data-cy=chip-carrot]').should('exist');
  });

  it('should delete an option by clicking on delete', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiSelect>
          <MultiSelect.Option value='apple'>Apple</MultiSelect.Option>
          <MultiSelect.Option value='carrot'>Carrot</MultiSelect.Option>
        </MultiSelect>
      </ThemeProvider>,
    );

    cy.get('[data-cy=field]').click();

    cy.get('[data-cy=option-apple]').click();
    cy.get('[data-cy=chip-apple] [data-cy=delete]').click();
    cy.get('[data-cy=chip-apple]').should('not.exist');
  });

  it('should delete an option by deselecting it', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiSelect>
          <MultiSelect.Option value='apple'>Apple</MultiSelect.Option>
          <MultiSelect.Option value='carrot'>Carrot</MultiSelect.Option>
        </MultiSelect>
      </ThemeProvider>,
    );

    cy.get('[data-cy=field]').click();

    cy.get('[data-cy=option-apple]').click();
    cy.get('[data-cy=option-apple]').click();
    cy.get('[data-cy=chip-apple]').should('not.exist');
  });

  it('should have a single default value', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiSelect defaultValue={['carrot']}>
          <MultiSelect.Option value='apple'>Apple</MultiSelect.Option>
          <MultiSelect.Option value='carrot'>Carrot</MultiSelect.Option>
        </MultiSelect>
      </ThemeProvider>,
    );

    cy.get('[data-cy=chip-apple]').should('not.exist');
    cy.get('[data-cy=chip-carrot]').should('exist');
  });

  it('should have multiple default values', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <MultiSelect defaultValue={['apple', 'carrot']}>
          <MultiSelect.Option value='apple'>Apple</MultiSelect.Option>
          <MultiSelect.Option value='carrot'>Carrot</MultiSelect.Option>
        </MultiSelect>
      </ThemeProvider>,
    );

    cy.get('[data-cy=chip-apple]').should('exist');
    cy.get('[data-cy=chip-carrot]').should('exist');
  });
});
