test.only('this will be the only test that runs', () => {
  expect(true).toBe(true);
});

test('this test will not run', () => { // skip 된다.
  expect('A').toBe('A'); 
});