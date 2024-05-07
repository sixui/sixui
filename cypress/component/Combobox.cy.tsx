import stylex from '@stylexjs/stylex';
import { ThemeProvider } from '@/components/utils/Theme';
import { theme } from '@/themes/base';
import '@/styles/main.css';

import { Combobox } from '@/components/atoms/Combobox';

const styles = stylex.create({
  host: {
    width: '80%',
  },
});

describe('Combobox', () => {
  it('should open on click on field', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host}>
          <Combobox.Option value='apple'>Apple</Combobox.Option>
          <Combobox.Option value='carrot'>Carrot</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=options]').should('not.exist');

    cy.get('[data-cy=field]').click();
    cy.get('[data-cy=options]').should('exist').should('be.visible');

    cy.get('[data-cy=option-apple]').should('exist');
    cy.get('[data-cy=option-carrot]').should('exist');
  });

  it('should open on click on input', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host}>
          <Combobox.Option value='apple'>Apple</Combobox.Option>
          <Combobox.Option value='carrot'>Carrot</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=options]').should('not.exist');

    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=options]').should('exist').should('be.visible');

    cy.get('[data-cy=option-apple]').should('exist');
    cy.get('[data-cy=option-carrot]').should('exist');
  });

  it('should use portal', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Combobox sx={styles.host}>
            <Combobox.Option value='apple'>Apple</Combobox.Option>
            <Combobox.Option value='carrot'>Carrot</Combobox.Option>
          </Combobox>
        </div>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=options]').should('be.visible');
    cy.get('[data-cy=option-apple]').should('be.visible');
    cy.get('[data-cy=option-carrot]').should('be.visible');
  });

  it('should close on click outside', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host}>
          <Combobox.Option value='apple'>Apple</Combobox.Option>
          <Combobox.Option value='carrot'>Carrot</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=options]').should('exist');

    cy.get('body').click('bottomRight');
    cy.get('[data-cy=options]').should('not.exist');
    cy.get('[data-cy=input]').should('not.have.focus');
  });

  it('should select the first option if empty on blur', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host}>
          <Combobox.Option value='apple'>Apple</Combobox.Option>
          <Combobox.Option value='carrot'>Carrot</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('body').click('bottomRight');

    cy.get('[data-cy=input]').should('have.value', 'Apple');
  });

  it('should select an option', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host}>
          <Combobox.Option value='apple'>Apple</Combobox.Option>
          <Combobox.Option value='carrot'>Carrot</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=option-carrot]').click();
    cy.get('[data-cy=input]').should('have.value', 'Carrot');

    cy.get('[data-cy=input]').should('have.focus');
    cy.get('[data-cy=options]').should('not.exist');
  });

  it('should select an empty option', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host}>
          <Combobox.Option value=''>Empty</Combobox.Option>
          <Combobox.Option value='apple'>Apple</Combobox.Option>
          <Combobox.Option value='carrot'>Carrot</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').should('be.empty');
    cy.get('[data-cy=input]').click();

    cy.get('[data-cy=option-]').click();
    cy.get('[data-cy=input]').should('have.value', 'Empty');
  });

  it('should have a default value', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host} defaultValue='carrot'>
          <Combobox.Option value='apple'>Apple</Combobox.Option>
          <Combobox.Option value='carrot'>Carrot</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').should('have.value', 'Carrot');
  });

  it('should use the option label', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host} defaultValue='carrot'>
          <Combobox.Option value='apple' label='golden' />
          <Combobox.Option value='carrot' label='touchon' />
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').should('have.value', 'touchon');
  });

  it('should limit options', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox
          sx={styles.host}
          limit={2}
          moreOption={({ total, hidden }) => (
            <Combobox.Option value='more'>
              Hidden: {hidden}/{total}
            </Combobox.Option>
          )}
        >
          <Combobox.Option value='1'>Option 1</Combobox.Option>
          <Combobox.Option value='2'>Option 2</Combobox.Option>
          <Combobox.Option value='3'>Option 3</Combobox.Option>
          <Combobox.Option value='4'>Option 4</Combobox.Option>
          <Combobox.Option value='5'>Option 5</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();

    cy.get('[data-cy=option-1]').should('exist');
    cy.get('[data-cy=option-2]').should('exist');
    cy.get('[data-cy=option-more]').should('have.text', 'Hidden: 3/5');

    cy.get('[data-cy=option-3]').should('not.exist');
    cy.get('[data-cy=option-4]').should('not.exist');
    cy.get('[data-cy=option-5]').should('not.exist');
  });

  it('should be able to select a hidden option as default value', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox
          sx={styles.host}
          defaultValue='5'
          limit={2}
          moreOption={({ total, hidden }) => (
            <Combobox.Option value='more'>
              Hidden: {hidden}/{total}
            </Combobox.Option>
          )}
        >
          <Combobox.Option value='1'>Option 1</Combobox.Option>
          <Combobox.Option value='2'>Option 2</Combobox.Option>
          <Combobox.Option value='3'>Option 3</Combobox.Option>
          <Combobox.Option value='4'>Option 4</Combobox.Option>
          <Combobox.Option value='5'>Option 5</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').should('have.value', 'Option 5');
    cy.get('[data-cy=input]').click();

    cy.get('[data-cy=option-1]').should('exist');
    cy.get('[data-cy=option-5]').should('exist');
    cy.get('[data-cy=option-more]').should('have.text', 'Hidden: 3/5');

    cy.get('[data-cy=option-2]').should('not.exist');
    cy.get('[data-cy=option-3]').should('not.exist');
    cy.get('[data-cy=option-4]').should('not.exist');
  });

  it('should filter options', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host}>
          <Combobox.Option value='apple'>Apple</Combobox.Option>
          <Combobox.Option value='carrot'>Carrot</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=input]').type('App');
    cy.get('[data-cy=option-apple]').should('exist');
    cy.get('[data-cy=option-carrot]').should('not.exist');

    cy.get('[data-cy=input]').clear();
    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=input]').type('Carr');
    cy.get('[data-cy=option-apple]').should('not.exist');
    cy.get('[data-cy=option-carrot]').should('exist');

    cy.get('[data-cy=input]').clear();
    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=input]').type('A');
    cy.get('[data-cy=option-apple]').should('exist');
    cy.get('[data-cy=option-carrot]').should('exist');

    cy.get('[data-cy=input]').clear();
    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=input]').type('Applot');
    cy.get('[data-cy=option-apple]').should('not.exist');
    cy.get('[data-cy=option-carrot]').should('not.exist');
    cy.get('[data-cy=option-carrot]').should('not.exist');
    cy.get('[data-cy=no-options]').should('exist');
  });

  it('should reset filter on blur', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host} nullable>
          <Combobox.Option value='apple'>Apple</Combobox.Option>
          <Combobox.Option value='carrot'>Carrot</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=input]').type('abcdefg');
    cy.get('body').click('bottomRight');
    cy.get('[data-cy=input]').click();

    cy.get('[data-cy=option-apple]').should('exist');
    cy.get('[data-cy=option-carrot]').should('exist');
  });
});

describe('Nullable Combobox', () => {
  it('should have empty option', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host} nullable />
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('[data-cy=option-]').should('exist');
  });

  it('should stay empty on blur', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host} nullable>
          <Combobox.Option value='apple'>Apple</Combobox.Option>
          <Combobox.Option value='carrot'>Carrot</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').click();
    cy.get('body').click('bottomRight');

    cy.get('[data-cy=input]').should('have.value', '');
  });

  it('should clear default value', () => {
    cy.mount(
      <ThemeProvider value={{ theme }}>
        <Combobox sx={styles.host} defaultValue='carrot' nullable>
          <Combobox.Option value='apple'>Apple</Combobox.Option>
          <Combobox.Option value='carrot'>Carrot</Combobox.Option>
        </Combobox>
      </ThemeProvider>,
    );

    cy.get('[data-cy=input]').should('have.value', 'Carrot');
    cy.get('[data-cy=input]').clear();
    cy.get('body').click('bottomRight');

    cy.get('[data-cy=input]').should('have.value', '');
  });
});
