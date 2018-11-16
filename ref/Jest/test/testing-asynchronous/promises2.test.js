describe('Promises2', () => {
  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('error');
      });
    })
  }
  
  test('the fetch fails with an error', () => {
    expect.assertions(1);
    
    // 아래와 동일 return expect(fetchData()).rejects.toMatch('error');
    return fetchData().catch(e => {
      expect(e).toMatch('error'); // assertion
    })
  });
});
