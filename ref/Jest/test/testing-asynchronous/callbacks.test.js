describe('Callbacks', () => {
  function fetchData(cb) {
    setTimeout(() => {
      console.log('log printed after finising test');
      cb('peanut butter');
    });
  }

  // 하지 말 것
  test('the data is peanut butter', () => {
    function callback(data) {
      expect(data).toBe('peanut butter');
    }

    fetchData(callback);
  });

  function fetchData2(cb) {
    setTimeout(() => {
      console.log('log printed before finising test');
      cb('peanut butter');
    });
  }

  test('the data is peanut butter 2', done => {
    function callback(data) {
      expect(data).toBe('peanut butter');
      done();
    }

    fetchData2(callback);
  });
});
