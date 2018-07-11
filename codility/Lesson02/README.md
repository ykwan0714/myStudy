# Lesson02 - Array


## CyclicRotation

### 문제
```
An array A consisting of N integers is given. Rotation of the array means that each element is shifted right by one index, and the last element of the array is moved to the first place. For example, the rotation of array A = [3, 8, 9, 7, 6] is [6, 3, 8, 9, 7] (elements are shifted right by one index and 6 is moved to the first place).

The goal is to rotate array A K times; that is, each element of A will be shifted to the right K times.

Write a function:

function solution(A, K);

that, given an array A consisting of N integers and an integer K, returns the array A rotated K times.

For example, given

    A = [3, 8, 9, 7, 6]
    K = 3
the function should return [9, 7, 6, 3, 8]. Three rotations were made:

    [3, 8, 9, 7, 6] -> [6, 3, 8, 9, 7]
    [6, 3, 8, 9, 7] -> [7, 6, 3, 8, 9]
    [7, 6, 3, 8, 9] -> [9, 7, 6, 3, 8]
For another example, given

    A = [0, 0, 0]
    K = 1
the function should return [0, 0, 0]

Given

    A = [1, 2, 3, 4]
    K = 4
the function should return [1, 2, 3, 4]

Assume that:

N and K are integers within the range [0..100];
each element of array A is an integer within the range [−1,000..1,000].
```

### 풀이

#### [jake](https://app.codility.com/demo/results/training2YNJU3-YZ7/)

처음에 A array의 type 체크를 하지 않았는데, Task Score에서 오류가 나서 추가했다.

```js
function solution(A, K) {
	if (typeof A != 'undefined') {
        while (A.length > 0 && K > 0) {
            A = [A.pop()].concat(A) // A.unshift(A.pop())로 수정해도 됨
            K--
        }
    }
    return A
}
```

#### merlin

Array.prototype.unshift 사용

```js
function solution(A, K) {
    // write your code in JavaScript (Node.js 8.9.4)
    var result = [];
    var copyA = Array.prototype.slice.call(A);
    
    if(copyA.length === 0){
        return result;
    }
    
    while(K > 0){
        copyA = shift(copyA);        
        K--;
    }
    result = Array.prototype.slice.call(copyA);
    return result;
}

function shift(array){
    var result = [];
    var copyArray = Array.prototype.slice.call(array);
    
    var lastValue = copyArray.pop();
    copyArray.unshift(lastValue);
    
    result = Array.prototype.slice.call(copyArray);
    return result;
}
```

### etc

모니카가 발견한 solution. 단순히 for문을 돌면서 새로운 index를 생성한다.

```js
function solution(A, K) {
  let result = []
  for(let i = 0; i < A.length; i++) {
    result[(i + K) % A.length] = A[i]
  }
  return result
}
```

## OddOccurrencesInArray

### 문제

```
A non-empty array A consisting of N integers is given. The array contains an odd number of elements, and each element of the array can be paired with another element that has the same value, except for one element that is left unpaired.

For example, in array A such that:

  A[0] = 9  A[1] = 3  A[2] = 9
  A[3] = 3  A[4] = 9  A[5] = 7
  A[6] = 9
the elements at indexes 0 and 2 have value 9,
the elements at indexes 1 and 3 have value 3,
the elements at indexes 4 and 6 have value 9,
the element at index 5 has value 7 and is unpaired.
Write a function:

int solution(int A[], int N);

that, given an array A consisting of N integers fulfilling the above conditions, returns the value of the unpaired element.

For example, given array A such that:

  A[0] = 9  A[1] = 3  A[2] = 9
  A[3] = 3  A[4] = 9  A[5] = 7
  A[6] = 9
the function should return 7, as explained in the example above.

Assume that:

N is an odd integer within the range [1..1,000,000];
each element of array A is an integer within the range [1..1,000,000,000];
all but one of the values in A occur an even number of times.
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(1) (not counting the storage required for input arguments).
```

### 풀이

#### [jake](https://app.codility.com/demo/results/trainingG2VYFF-6DU/)

object를 만들어서 각 숫자 별 카운트를 증가 시키고, object를 순회하며 1인 값을 찾아낸다. task scroe 66%

```js
function solution(A) {
    const result = {}
    A.forEach(el=>{
        if (typeof result[el] == 'undefined') {
            result[el] = 0
        }
        result[el] += 1
    })
    let unpair
    for (let key in result) {
        if (result[key] == 1) {
            unpair = key
        }
    }
    return Number(unpair)
}
```

#### etc

비트 연산자 중 XOR(^)을 사용하면 해결된다.

```
function solution(A) {
    let result = 0
    for(let num in A) {
        result ^= num
    }
    return result
}
```

### 참고하기


* [Array.prototype.unshift()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
