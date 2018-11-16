describe('Mock Implementations', () => {
  test('jest.fn', () => {
    const myMockFn = jest.fn(cb => cb(null, true));

    myMockFn((err, val) => console.log(val));
    // > true

    myMockFn((err, val) => console.log(val));
    // > true
  });

  test('mockImplementation', () => {
    jest.mock('./mock-implementations'); // 이 곳에서 자동 mocking이 일어난다.
    const foo = require('./mock-implementations');

    // foo는 mock 함수 이다.
    foo.mockImplementation(() => 42);
    foo();
    // > 42
  });

  test('mockImplementationOnce', () => {
    const myMockFn = jest
      .fn()
      .mockImplementationOnce(cb => cb(null, true))
      .mockImplementationOnce(cb => cb(null, false));

    myMockFn((err, val) => console.log(val));
    // > true

    myMockFn((err, val) => console.log(val));
    // > false
  });

  test('mockImplementationOnce Default',() => {
    const myMockFn = jest
      .fn(() => 'default') // 기본 구현 설정
      .mockImplementationOnce(() => 'first call')
      .mockImplementationOnce(() => 'second call');

    console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
    // > 'first call', 'second call', 'default', 'default'
  });

  test('Mock Name', () => {
    const myMockFn = jest
      .fn()
      .mockReturnValue('default')
      .mockImplementation(scalar => 42 + scalar)
      .mockName('add42');

      expect(myMockFn(1)).toEqual(43)
  });
});
