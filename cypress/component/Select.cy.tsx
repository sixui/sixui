import stylex from '@stylexjs/stylex';
import { ThemeProvider } from '@/components/utils/Theme';
import { theme } from '@/themes/base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleWhole, faCarrot } from '@fortawesome/free-solid-svg-icons';
import '@/styles/main.css';

import { Select } from '@/components/atoms/Select';

const styles = stylex.create({
  host: {
    display: 'flex',
    padding: '1rem',
  },
});

describe('Select', () => {
  it('should open on click inside', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Select>
          <Select.Option value='apple'>Apple</Select.Option>
          <Select.Option value='carrot'>Carrot</Select.Option>
        </Select>
      </ThemeProvider>,
    );

    cy.get('[data-cy=selectOptions]').should('not.exist');

    cy.get('[data-cy=field]').click();
    cy.get('[data-cy=selectOptions]').should('exist').should('be.visible');
    cy.get('[data-cy=selectOption-apple]').should('exist');
    cy.get('[data-cy=selectOption-carrot]').should('exist');
  });

  it('should use portal', () => {
    cy.mount(
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <ThemeProvider sx={styles.host} theme={theme}>
          <Select>
            <Select.Option value='apple'>Apple</Select.Option>
            <Select.Option value='carrot'>Carrot</Select.Option>
          </Select>
        </ThemeProvider>
        ,
      </div>,
    );

    cy.get('[data-cy=field]').click();
    cy.get('[data-cy=selectOptions]').should('be.visible');
    cy.get('[data-cy=selectOption-apple]').should('be.visible');
    cy.get('[data-cy=selectOption-carrot]').should('be.visible');
  });

  it('should close on click outside', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Select>
          <Select.Option value='apple'>Apple</Select.Option>
          <Select.Option value='carrot'>Carrot</Select.Option>
        </Select>
      </ThemeProvider>,
    );

    cy.get('[data-cy=field]').click();
    cy.get('[data-cy=selectOptions]').should('exist');

    cy.get('body').click();
    cy.get('[data-cy=selectOptions]').should('not.exist');
    cy.get('[data-cy=field]').should('have.focus');

    cy.get('body').click();
    cy.get('[data-cy=field]').should('not.have.focus');
  });

  it('should select an option', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Select>
          <Select.Option value='apple'>Apple</Select.Option>
          <Select.Option value='carrot'>Carrot</Select.Option>
        </Select>
      </ThemeProvider>,
    );

    cy.get('[data-cy=value]').should('not.exist');

    cy.get('[data-cy=field]').click();
    cy.get('[data-cy=selectOption-carrot]').click();
    cy.get('[data-cy=value]').should('have.text', 'Carrot');

    cy.get('[data-cy=field]').should('have.focus');
    cy.get('[data-cy=selectOptions]').should('not.exist');
  });

  it('should select an empty option', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Select>
          <Select.Option value=''>Empty</Select.Option>
          <Select.Option value='apple'>Apple</Select.Option>
          <Select.Option value='carrot'>Carrot</Select.Option>
        </Select>
      </ThemeProvider>,
    );

    cy.get('[data-cy=value]').should('not.exist');
    cy.get('[data-cy=field]').click();

    cy.get('[data-cy=selectOption-]').click();
    cy.get('[data-cy=value]').should('have.text', 'Empty');
  });

  it('should select an option and pick its leading icon', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Select>
          <Select.Option
            value='apple'
            leadingIcon={<FontAwesomeIcon icon={faAppleWhole} />}
          >
            Apple
          </Select.Option>
          <Select.Option
            value='carrot'
            leadingIcon={<FontAwesomeIcon icon={faCarrot} />}
          >
            Carrot
          </Select.Option>
        </Select>
      </ThemeProvider>,
    );

    cy.get('[data-cy=value]').should('not.exist');
    cy.get('[data-cy=field]').click();

    cy.get('[data-cy=selectOption-carrot]').click();
    cy.get('[data-cy=field] [data-icon=carrot]').should('exist');
  });

  it('should have a default value', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Select defaultValue='carrot'>
          <Select.Option value='apple'>Apple</Select.Option>
          <Select.Option value='carrot'>Carrot</Select.Option>
        </Select>
      </ThemeProvider>,
    );

    cy.get('[data-cy=value]').should('have.text', 'Carrot');
  });

  it('should use the option label', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Select defaultValue='carrot'>
          <Select.Option value='apple' label='golden' />
          <Select.Option value='carrot' label='touchon' />
        </Select>
      </ThemeProvider>,
    );

    cy.get('[data-cy=value]').should('have.text', 'touchon');
  });

  it('should limit options', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Select
          limit={2}
          moreOption={({ total, hidden }) => (
            <Select.Option value='more'>
              Hidden: {hidden}/{total}
            </Select.Option>
          )}
        >
          <Select.Option value='1'>Option 1</Select.Option>
          <Select.Option value='2'>Option 2</Select.Option>
          <Select.Option value='3'>Option 3</Select.Option>
          <Select.Option value='4'>Option 4</Select.Option>
          <Select.Option value='5'>Option 5</Select.Option>
        </Select>
      </ThemeProvider>,
    );

    cy.get('[data-cy=field]').click();

    cy.get('[data-cy=selectOption-1]').should('exist');
    cy.get('[data-cy=selectOption-2]').should('exist');
    cy.get('[data-cy=selectOption-more]').should('have.text', 'Hidden: 3/5');

    cy.get('[data-cy=selectOption-3]').should('not.exist');
    cy.get('[data-cy=selectOption-4]').should('not.exist');
    cy.get('[data-cy=selectOption-5]').should('not.exist');
  });

  it('should be able to select a hidden option as default value', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} theme={theme}>
        <Select
          defaultValue='5'
          limit={2}
          moreOption={({ total, hidden }) => (
            <Select.Option value='more'>
              Hidden: {hidden}/{total}
            </Select.Option>
          )}
        >
          <Select.Option value='1'>Option 1</Select.Option>
          <Select.Option value='2'>Option 2</Select.Option>
          <Select.Option value='3'>Option 3</Select.Option>
          <Select.Option value='4'>Option 4</Select.Option>
          <Select.Option value='5'>Option 5</Select.Option>
        </Select>
      </ThemeProvider>,
    );

    cy.get('[data-cy=value]').should('have.text', 'Option 5');
    cy.get('[data-cy=field]').click();

    cy.get('[data-cy=selectOption-1]').should('exist');
    cy.get('[data-cy=selectOption-2]').should('exist');
    cy.get('[data-cy=selectOption-more]').should('have.text', 'Hidden: 3/5');

    cy.get('[data-cy=selectOption-3]').should('not.exist');
    cy.get('[data-cy=selectOption-4]').should('not.exist');
    cy.get('[data-cy=selectOption-5]').should('not.exist');
  });
});
