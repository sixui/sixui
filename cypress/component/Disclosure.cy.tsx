// import stylex from '@stylexjs/stylex';
// import { ThemeProvider } from '@/components/utils/Theme';
// import { theme } from '@/themes/base';
// import '@/styles/main.css';

// import { Disclosure } from '@/components/atoms/Disclosure';
// import { DisclosureButton } from '@/components/atoms/DisclosureButton';
// import { DisclosurePanel } from '@/components/atoms/DisclosurePanel';

// const styles = stylex.create({
//   host: {
//     display: 'flex',
//     padding: '1rem',
//   },
// });

// describe('Disclosure', () => {
//   it('should expand and collapse on click', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <Disclosure>
//           <DisclosureButton>Button label</DisclosureButton>
//           <DisclosurePanel>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </DisclosurePanel>
//         </Disclosure>
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=disclosure-panel]').should('not.exist');
//     cy.get('[data-cy=disclosure-button]').click();
//     cy.get('[data-cy=disclosure-panel]').should('be.visible');
//     cy.get('[data-cy=disclosure-button]').click();
//     cy.get('[data-cy=disclosure-panel]').should('not.exist');
//   });

//   it('should be expand by default', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <Disclosure defaultExpanded>
//           <DisclosureButton>Button label</DisclosureButton>
//           <DisclosurePanel>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </DisclosurePanel>
//         </Disclosure>
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=disclosure-panel]').should('be.visible');
//     cy.get('[data-cy=disclosure-button]').click();
//     cy.get('[data-cy=disclosure-panel]').should('not.exist');
//     cy.get('[data-cy=disclosure-button]').click();
//     cy.get('[data-cy=disclosure-panel]').should('be.visible');
//   });
// });

// describe('Checkable Disclosure', () => {
//   it('should be unchecked and collapsed by default', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <Disclosure checkable>
//           <DisclosureButton>Button label</DisclosureButton>
//           <DisclosurePanel>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </DisclosurePanel>
//         </Disclosure>
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=disclosure-panel]').should('not.exist');
//     cy.get('[data-cy=disclosure-button]').should('be.disabled');
//     cy.get('[data-cy=disclosure-checkbox]').should('be.enabled');
//   });

//   it('should be checked and collapsed by default', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <Disclosure checkable checked>
//           <DisclosureButton>Button label</DisclosureButton>
//           <DisclosurePanel>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </DisclosurePanel>
//         </Disclosure>
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=disclosure-panel]').should('not.exist');
//     cy.get('[data-cy=disclosure-button]').should('be.enabled');
//     cy.get('[data-cy=disclosure-checkbox]').should('be.enabled');
//   });

//   it('should expand if checked', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <Disclosure checkable>
//           <DisclosureButton>Button label</DisclosureButton>
//           <DisclosurePanel>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </DisclosurePanel>
//         </Disclosure>
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=disclosure-checkbox]').click();
//     cy.get('[data-cy=disclosure-checkbox]').should('be.checked');
//     cy.get('[data-cy=disclosure-button]').should('be.enabled');
//     cy.get('[data-cy=disclosure-panel]').should('be.visible');
//   });

//   it('should collapse if unchecked', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <Disclosure checkable defaultChecked={true}>
//           <DisclosureButton>Button label</DisclosureButton>
//           <DisclosurePanel>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </DisclosurePanel>
//         </Disclosure>
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=disclosure-checkbox]').should('be.checked');
//     cy.get('[data-cy=disclosure-panel]').should('be.visible');

//     cy.get('[data-cy=disclosure-checkbox]').click();
//     cy.get('[data-cy=disclosure-checkbox]').should('not.be.checked');
//     cy.get('[data-cy=disclosure-panel]').should('not.be.visible');
//   });

//   it('should be disabled', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <Disclosure checkable disabled>
//           <DisclosureButton>Button label</DisclosureButton>
//           <DisclosurePanel>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </DisclosurePanel>
//         </Disclosure>
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=disclosure-checkbox]').should('not.be.checked');
//     cy.get('[data-cy=disclosure-checkbox]').should('be.disabled');
//     cy.get('[data-cy=disclosure-button]').should('be.disabled');
//     cy.get('[data-cy=disclosure-panel]').should('not.exist');
//   });
// });

// describe('Switchable Disclosure', () => {
//   it('should be toggled-off and collapsed by default', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <Disclosure checkable withSwitch>
//           <DisclosureButton>Button label</DisclosureButton>
//           <DisclosurePanel>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </DisclosurePanel>
//         </Disclosure>
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=disclosure-panel]').should('not.exist');
//     cy.get('[data-cy=disclosure-button]').should('be.disabled');
//     cy.get('[data-cy=disclosure-switch]').should('be.enabled');
//   });

//   it('should be toggled-on and collapsed by default', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <Disclosure checkable withSwitch checked>
//           <DisclosureButton>Button label</DisclosureButton>
//           <DisclosurePanel>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </DisclosurePanel>
//         </Disclosure>
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=disclosure-panel]').should('not.exist');
//     cy.get('[data-cy=disclosure-button]').should('be.enabled');
//     cy.get('[data-cy=disclosure-switch]').should('be.enabled');
//   });

//   it('should expand if toggled-on', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <Disclosure checkable withSwitch>
//           <DisclosureButton>Button label</DisclosureButton>
//           <DisclosurePanel>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </DisclosurePanel>
//         </Disclosure>
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=disclosure-switch]').click();
//     cy.get('[data-cy=disclosure-switch]').should('be.checked');
//     cy.get('[data-cy=disclosure-button]').should('be.enabled');
//     cy.get('[data-cy=disclosure-panel]').should('be.visible');
//   });

//   it('should collapse if toggled-off', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <Disclosure checkable withSwitch defaultChecked={true}>
//           <DisclosureButton>Button label</DisclosureButton>
//           <DisclosurePanel>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </DisclosurePanel>
//         </Disclosure>
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=disclosure-switch]').should('be.checked');
//     cy.get('[data-cy=disclosure-panel]').should('be.visible');

//     cy.get('[data-cy=disclosure-switch]').click();
//     cy.get('[data-cy=disclosure-switch]').should('not.be.checked');
//     cy.get('[data-cy=disclosure-panel]').should('not.exist');
//   });

//   it('should be disabled', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <Disclosure checkable withSwitch disabled>
//           <DisclosureButton>Button label</DisclosureButton>
//           <DisclosurePanel>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//           </DisclosurePanel>
//         </Disclosure>
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=disclosure-switch]').should('not.be.checked');
//     cy.get('[data-cy=disclosure-switch]').should('be.disabled');
//     cy.get('[data-cy=disclosure-button]').should('be.disabled');
//     cy.get('[data-cy=disclosure-panel]').should('not.exist');
//   });
// });
