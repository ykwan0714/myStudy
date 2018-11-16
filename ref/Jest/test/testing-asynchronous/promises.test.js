describe('Promises', () => {
  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('peanut butter');
      });
    });
  }

  test('the data is peanut butter', () => {
    expect.assertions(1);

    // 아래와 동일 expect(fetchData()).resolves.toBe('peanut butter');
    return fetchData().then(data => {
      expect(data).toBe('peanut butter'); // assertion
    });
  });
});
