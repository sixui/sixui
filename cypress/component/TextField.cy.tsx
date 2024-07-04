// import stylex from '@stylexjs/stylex';
// import { ThemeProvider } from '@/components/utils/Theme';
// import { theme } from '@/themes/base';
// import '@/styles/main.css';

// import { TextField } from '@/components/atoms/TextField';

// const styles = stylex.create({
//   host: {
//     display: 'flex',
//     padding: '1rem',
//   },
// });

// describe('Uncontrolled TextField', () => {
//   it('should have default value', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <TextField defaultValue='Hello World!' />
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=input]').should('have.value', 'Hello World!');
//   });

//   it('should change value', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <TextField />
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=input]').click();
//     cy.get('[data-cy=input]').type('Hello World!');
//     cy.get('[data-cy=input]').should('have.value', 'Hello World!');
//   });

//   it('should clear value', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <TextField clearable />
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=input]').click();
//     cy.get('[data-cy=input]').type('Hello World!');
//     cy.get('[data-cy=input]').should('have.value', 'Hello World!');
//     cy.get('[data-cy=clearButton]').click();
//     cy.get('[data-cy=input]').should('have.value', '');
//   });
// });

// describe('Controlled TextField', () => {
//   it('should trigger event on value change', () => {
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <TextField value='Hello World!' />
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=input]').click();
//     cy.get('[data-cy=input]').should('have.value', 'Hello World!');
//     cy.get('[data-cy=input]').type('Hello Earth!');
//     cy.get('[data-cy=input]').should('have.value', 'Hello World!');
//   });

//   it('should trigger event on value clear', () => {
//     const onChange = cy.stub().as('onChange');
//     cy.mount(
//       <ThemeProvider sx={styles.host} theme={theme}>
//         <TextField value='Hello World!' onChange={onChange} clearable />
//       </ThemeProvider>,
//     );

//     cy.get('[data-cy=input]').click();
//     cy.get('[data-cy=input]').type('Hello World!');
//     cy.get('[data-cy=input]').should('have.value', 'Hello World!');
//     cy.get('[data-cy=clearButton]').click();
//     cy.get('[data-cy=input]').should('have.value', 'Hello World!');
//     cy.get('@onChange').should('have.been.called');
//   });
// });
