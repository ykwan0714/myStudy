import axios from 'axios';
import Users from './mocking-modules';

jest.mock('axios');

test('should fetch users', () => {
  const resp = {data: [{name: 'Bob'}]};
  // 아래와 같은 방법으로도 사용할 수 있다.
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  axios.get.mockResolvedValue(resp);

  return Users.all().then(users => expect(users).toEqual(resp.data));
});