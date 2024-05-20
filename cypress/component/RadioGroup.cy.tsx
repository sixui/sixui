import stylex from '@stylexjs/stylex';
import { ThemeProvider } from '@/components/utils/Theme';
import { theme } from '@/themes/base';
import 'cypress-real-events';
import '@/styles/main.css';

import { RadioGroup } from '@/components/atoms/RadioGroup';
import { Radio } from '@/components/atoms/Radio';

const styles = stylex.create({
  host: {
    display: 'flex',
    padding: '1rem',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
  },
});

describe('Uncontrolled RadioGroup', () => {
  it('should be unchecked by default', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <RadioGroup sx={styles.radioGroup}>
          <Radio value='1' />
          <Radio value='2' />
          <Radio value='3' />
        </RadioGroup>
      </ThemeProvider>,
    );

    cy.get('[data-cy=radioGroup]').should('have.value', '');
    cy.get('[data-cy=radio-1]').should('not.be.checked');
    cy.get('[data-cy=radio-2]').should('not.be.checked');
    cy.get('[data-cy=radio-3]').should('not.be.checked');
  });

  it('should have a default checked item', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <RadioGroup sx={styles.radioGroup} defaultValue='2'>
          <Radio value='1' />
          <Radio value='2' />
          <Radio value='3' />
        </RadioGroup>
      </ThemeProvider>,
    );

    cy.get('[data-cy=radio-2]').click();
    cy.get('[data-cy=radio-1]').should('not.be.checked');
    cy.get('[data-cy=radio-2]').should('be.checked');
    cy.get('[data-cy=radio-3]').should('not.be.checked');
  });

  it('should select one item', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <RadioGroup sx={styles.radioGroup}>
          <Radio value='1' />
          <Radio value='2' />
          <Radio value='3' />
        </RadioGroup>
      </ThemeProvider>,
    );

    cy.get('[data-cy=radio-2]').click();
    cy.get('[data-cy=radio-1]').should('not.be.checked');
    cy.get('[data-cy=radio-2]').should('be.checked');
    cy.get('[data-cy=radio-3]').should('not.be.checked');

    cy.get('[data-cy=radio-3]').click();
    cy.get('[data-cy=radio-1]').should('not.be.checked');
    cy.get('[data-cy=radio-2]').should('not.be.checked');
    cy.get('[data-cy=radio-3]').should('be.checked');
  });

  it('should use keyboard navigation', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <RadioGroup sx={styles.radioGroup}>
          <Radio value='1' />
          <Radio value='2' />
          <Radio value='3' />
        </RadioGroup>
      </ThemeProvider>,
    );

    cy.get('[data-cy=radio-1]').click();

    cy.get('[data-cy=radio-1]').should('be.checked');
    cy.get('[data-cy=radio-2]').should('not.be.checked');
    cy.get('[data-cy=radio-3]').should('not.be.checked');

    cy.realPress('ArrowRight');
    cy.get('[data-cy=radio-1]').should('not.be.checked');
    cy.get('[data-cy=radio-2]').should('be.checked');
    cy.get('[data-cy=radio-3]').should('not.be.checked');

    cy.realPress('ArrowRight');
    cy.get('[data-cy=radio-1]').should('not.be.checked');
    cy.get('[data-cy=radio-2]').should('not.be.checked');
    cy.get('[data-cy=radio-3]').should('be.checked');

    cy.realPress('ArrowRight');
    cy.get('[data-cy=radio-1]').should('be.checked');
    cy.get('[data-cy=radio-2]').should('not.be.checked');
    cy.get('[data-cy=radio-3]').should('not.be.checked');
  });
});

describe('Controlled RadioGroup', () => {
  it('should trigger event on value change', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <RadioGroup sx={styles.radioGroup} onChange={onChange} value='2'>
          <Radio value='1' />
          <Radio value='2' />
          <Radio value='3' />
        </RadioGroup>
      </ThemeProvider>,
    );

    cy.get('[data-cy=radio-1]').should('not.be.checked');
    cy.get('[data-cy=radio-2]').should('be.checked');
    cy.get('[data-cy=radio-3]').should('not.be.checked');

    cy.get('[data-cy=radio-3]').click();
    cy.get('[data-cy=radio-1]').should('not.be.checked');
    cy.get('[data-cy=radio-2]').should('be.checked');
    cy.get('[data-cy=radio-3]').should('not.be.checked');
    cy.get('@onChange').should('have.been.called');
  });
});
