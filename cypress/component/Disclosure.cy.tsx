import stylex from '@stylexjs/stylex';
import { ThemeProvider } from '@/components/utils/Theme';
import { theme } from '@/themes/base';
import '@/styles/main.css';

import { Disclosure } from '@/components/atoms/Disclosure';

const styles = stylex.create({
  host: {
    display: 'flex',
    padding: '1rem',
  },
});

describe('Disclosure', () => {
  it('should expand and collapse on click', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <Disclosure>
          <Disclosure.Button>Button label</Disclosure.Button>
          <Disclosure.Panel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Disclosure.Panel>
        </Disclosure>
      </ThemeProvider>,
    );

    cy.get('[data-cy=disclosure-panel]').should('exist');
    cy.get('[data-cy=disclosure-panel]').should('not.be.visible');
    cy.get('[data-cy=disclosure-button]').click();
    cy.get('[data-cy=disclosure-panel]').should('be.visible');
    cy.get('[data-cy=disclosure-button]').click();
    cy.get('[data-cy=disclosure-panel]').should('exist');
    cy.get('[data-cy=disclosure-panel]').should('not.be.visible');
  });

  it('should be expand by default', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <Disclosure defaultExpanded>
          <Disclosure.Button>Button label</Disclosure.Button>
          <Disclosure.Panel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Disclosure.Panel>
        </Disclosure>
      </ThemeProvider>,
    );

    cy.get('[data-cy=disclosure-panel]').should('be.visible');
    cy.get('[data-cy=disclosure-button]').click();
    cy.get('[data-cy=disclosure-panel]').should('exist');
    cy.get('[data-cy=disclosure-panel]').should('not.be.visible');
    cy.get('[data-cy=disclosure-button]').click();
    cy.get('[data-cy=disclosure-panel]').should('be.visible');
  });
});

describe('Checkable Disclosure', () => {
  it('should be unchecked and collapsed by default', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <Disclosure checkable>
          <Disclosure.Button>Button label</Disclosure.Button>
          <Disclosure.Panel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Disclosure.Panel>
        </Disclosure>
      </ThemeProvider>,
    );

    cy.get('[data-cy=disclosure-panel]').should('exist');
    cy.get('[data-cy=disclosure-panel]').should('not.be.visible');
    cy.get('[data-cy=disclosure-button]').should('be.disabled');
    cy.get('[data-cy=disclosure-checkbox]').should('be.enabled');
  });

  it('should be checked and collapsed by default', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <Disclosure checkable checked>
          <Disclosure.Button>Button label</Disclosure.Button>
          <Disclosure.Panel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Disclosure.Panel>
        </Disclosure>
      </ThemeProvider>,
    );

    cy.get('[data-cy=disclosure-panel]').should('exist');
    cy.get('[data-cy=disclosure-panel]').should('not.be.visible');
    cy.get('[data-cy=disclosure-button]').should('be.enabled');
    cy.get('[data-cy=disclosure-checkbox]').should('be.enabled');
  });

  it('should expand if checked', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <Disclosure checkable>
          <Disclosure.Button>Button label</Disclosure.Button>
          <Disclosure.Panel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Disclosure.Panel>
        </Disclosure>
      </ThemeProvider>,
    );

    cy.get('[data-cy=disclosure-checkbox]').click();
    cy.get('[data-cy=disclosure-checkbox]').should('be.checked');
    cy.get('[data-cy=disclosure-button]').should('be.enabled');
    cy.get('[data-cy=disclosure-panel]').should('be.visible');
  });

  it('should collapse if unchecked', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <Disclosure checkable defaultChecked={true}>
          <Disclosure.Button>Button label</Disclosure.Button>
          <Disclosure.Panel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Disclosure.Panel>
        </Disclosure>
      </ThemeProvider>,
    );

    cy.get('[data-cy=disclosure-checkbox]').should('be.checked');
    cy.get('[data-cy=disclosure-panel]').should('be.visible');

    cy.get('[data-cy=disclosure-checkbox]').click();
    cy.get('[data-cy=disclosure-checkbox]').should('not.be.checked');
    cy.get('[data-cy=disclosure-panel]').should('not.be.visible');
  });

  it('should be disabled', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <Disclosure checkable disabled>
          <Disclosure.Button>Button label</Disclosure.Button>
          <Disclosure.Panel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Disclosure.Panel>
        </Disclosure>
      </ThemeProvider>,
    );

    cy.get('[data-cy=disclosure-checkbox]').should('not.be.checked');
    cy.get('[data-cy=disclosure-checkbox]').should('be.disabled');
    cy.get('[data-cy=disclosure-button]').should('be.disabled');
    cy.get('[data-cy=disclosure-panel]').should('not.be.visible');
  });
});

describe('Switchable Disclosure', () => {
  it('should be toggled-off and collapsed by default', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <Disclosure checkable withSwitch>
          <Disclosure.Button>Button label</Disclosure.Button>
          <Disclosure.Panel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Disclosure.Panel>
        </Disclosure>
      </ThemeProvider>,
    );

    cy.get('[data-cy=disclosure-panel]').should('exist');
    cy.get('[data-cy=disclosure-panel]').should('not.be.visible');
    cy.get('[data-cy=disclosure-button]').should('be.disabled');
    cy.get('[data-cy=disclosure-switch]').should('be.enabled');
  });

  it('should be toggled-on and collapsed by default', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <Disclosure checkable withSwitch checked>
          <Disclosure.Button>Button label</Disclosure.Button>
          <Disclosure.Panel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Disclosure.Panel>
        </Disclosure>
      </ThemeProvider>,
    );

    cy.get('[data-cy=disclosure-panel]').should('exist');
    cy.get('[data-cy=disclosure-panel]').should('not.be.visible');
    cy.get('[data-cy=disclosure-button]').should('be.enabled');
    cy.get('[data-cy=disclosure-switch]').should('be.enabled');
  });

  it('should expand if toggled-on', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <Disclosure checkable withSwitch>
          <Disclosure.Button>Button label</Disclosure.Button>
          <Disclosure.Panel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Disclosure.Panel>
        </Disclosure>
      </ThemeProvider>,
    );

    cy.get('[data-cy=disclosure-switch]').click();
    cy.get('[data-cy=disclosure-switch]').should('be.checked');
    cy.get('[data-cy=disclosure-button]').should('be.enabled');
    cy.get('[data-cy=disclosure-panel]').should('be.visible');
  });

  it('should collapse if toggled-off', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <Disclosure checkable withSwitch defaultChecked={true}>
          <Disclosure.Button>Button label</Disclosure.Button>
          <Disclosure.Panel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Disclosure.Panel>
        </Disclosure>
      </ThemeProvider>,
    );

    cy.get('[data-cy=disclosure-switch]').should('be.checked');
    cy.get('[data-cy=disclosure-panel]').should('be.visible');

    cy.get('[data-cy=disclosure-switch]').click();
    cy.get('[data-cy=disclosure-switch]').should('not.be.checked');
    cy.get('[data-cy=disclosure-panel]').should('not.be.visible');
  });

  it('should be disabled', () => {
    cy.mount(
      <ThemeProvider sx={styles.host} value={{ theme }}>
        <Disclosure checkable withSwitch disabled>
          <Disclosure.Button>Button label</Disclosure.Button>
          <Disclosure.Panel>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Disclosure.Panel>
        </Disclosure>
      </ThemeProvider>,
    );

    cy.get('[data-cy=disclosure-switch]').should('not.be.checked');
    cy.get('[data-cy=disclosure-switch]').should('be.disabled');
    cy.get('[data-cy=disclosure-button]').should('be.disabled');
    cy.get('[data-cy=disclosure-panel]').should('not.be.visible');
  });
});
