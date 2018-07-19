# Lesson03 - Time Complexity

시간 복잡도에 관련한 문제들이다.

## FrogJmp

### 문제

```
A small frog wants to get to the other side of the road. The frog is currently located at position X and wants to get to a position greater than or equal to Y. The small frog always jumps a fixed distance, D.

Count the minimal number of jumps that the small frog must perform to reach its target.

Write a function:

int solution(int X, int Y, int D);

that, given three integers X, Y and D, returns the minimal number of jumps from position X to a position equal to or greater than Y.

For example, given:

  X = 10
  Y = 85
  D = 30
the function should return 3, because the frog will be positioned as follows:

after the first jump, at position 10 + 30 = 40
after the second jump, at position 10 + 30 + 30 = 70
after the third jump, at position 10 + 30 + 30 + 30 = 100
Assume that:

X, Y and D are integers within the range [1..1,000,000,000];
X ≤ Y.
Complexity:

expected worst-case time complexity is O(1);
expected worst-case space complexity is O(1).
```

### 풀이

#### [jake](https://app.codility.com/demo/results/trainingP4JH5J-N6H/)

처음엔 단순히 함수를 재귀 호출하면서 문제를 풀었는데 performance 이슈가 있었다. Y-X를 빼는 것에 눈에 들어와서 아래와 같이 풀게 되었다.

```js
function solution(X, Y, D) {
    return Math.ceil((Y-X) / D)
}
```

#### [monica](https://app.codility.com/demo/results/training65Y7UF-YD8/)

내 풀이 방법과 같다.

```js
function solution(X, Y, D) {
    const currPoint = X, targetPoint = Y, distance = D
    const result = Math.floor((targetPoint - currPoint) / distance)
    const remain = (targetPoint - currPoint) % distance
    
    return remain > 0 ? result + 1 : result
}
```

## PermMissingElem

### 문제

연속된 숫자가 들어있는 배열에서 존재 하지 않는 값을 찾는 문제

```
An array A consisting of N different integers is given. The array contains integers in the range [1..(N + 1)], which means that exactly one element is missing.

Your goal is to find that missing element.

Write a function:

function solution(A);

that, given an array A, returns the value of the missing element.

For example, given array A such that:

  A[0] = 2
  A[1] = 3
  A[2] = 1
  A[3] = 5
the function should return 4, as it is the missing element.

Assume that:

N is an integer within the range [0..100,000];
the elements of A are all distinct;
each element of array A is an integer within the range [1..(N + 1)].
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(1) (not counting the storage required for input arguments).
```

### 풀이

#### [jake](https://app.codility.com/demo/results/trainingF4UBZW-ZVB/)

수학 공식을 이용하여 풀었다. 1개가 비어있는 배열이니 4개가 있으면 5개가 있다고 생각을 하여 1~5까지 더하고, 현재 배열의 값을 모두 더해서 뺀 값이 없는 값이다.

> 1부터 n까지의 수를 더하는 공식: n * (n+1) /2

```js
function solution(A) {
   const len = A.length

   return len ? ((len + 1) * (len + 2) / 2) - A.reduce((ac, el)=>ac+el) : 1
}
```

#### [monica](https://app.codility.com/demo/results/trainingWQRNRS-W9V/)

[Set](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set)을 이용하여 풀었다.

```js
function solution(A) {
    const set = new Set(A);
    let i = 1;

    while (set.has(i)) {
        i++;
    }
    return i;
}
```

#### [dia](https://app.codility.com/demo/results/trainingK9CSNV-KF8/)

선 정렬 후 다음 것과 비교하면서 없는 값을 찾았다.

```js
function solution(A) {
    var result = A.sort(function(a,b) {return a-b})
    for(var i = 0, len = result.length; i < len; i++) {
        if(result[i] != i+1) {
            return compare(result[i-1],result[i])
        }
    }
}

function compare(a,b) {
    return Math.min(a,b) + Math.abs(a-b) - 1
}
```

## TapeEquilibrium

### 문제

많이 헤맸던 문제, 하나의 배열을 P 기준 (N-1까지)으로 두개로 쪼개서 각 배열의 합을 뺀 절대 값 중 제일 작은 것을 찾는 문제이다.

```
A non-empty array A consisting of N integers is given. Array A represents numbers on a tape.

Any integer P, such that 0 < P < N, splits this tape into two non-empty parts: A[0], A[1], ..., A[P − 1] and A[P], A[P + 1], ..., A[N − 1].

The difference between the two parts is the value of: |(A[0] + A[1] + ... + A[P − 1]) − (A[P] + A[P + 1] + ... + A[N − 1])|

In other words, it is the absolute difference between the sum of the first part and the sum of the second part.

For example, consider array A such that:

  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3
We can split this tape in four places:

P = 1, difference = |3 − 10| = 7 
P = 2, difference = |4 − 9| = 5 
P = 3, difference = |6 − 7| = 1 
P = 4, difference = |10 − 3| = 7 
Write a function:

function solution(A);

that, given a non-empty array A of N integers, returns the minimal difference that can be achieved.

For example, given:

  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3
the function should return 1, as explained above.

Assume that:

N is an integer within the range [2..100,000];
each element of array A is an integer within the range [−1,000..1,000].
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(N) (not counting the storage required for input arguments).
```

### [jake](https://app.codility.com/demo/results/trainingJZAB9Q-FAD/)

처음은 배열을 계속 쪼개는 방식으로 문제를 풀었는데 마찬가지로 100%가 나오지 않았다. 그 다음 풀이는 array shift와 while 문을 돌렸는데 마찬가지.   
비슷한 방법으로 reduce를 사용하러 풀었더니 100%가 나왔다. 

```js
function solution(A) {
    const tot = A.reduce((ac, el)=>ac+el)
    let final
    A.reduce((ac, el)=>{
      const val = Math.abs(ac-(tot-ac))
      if(typeof final == 'undefined') final = val
      else final = final < val ? final : val
      
      return ac+el
    })
    return final
}
```

### [monica](https://app.codility.com/demo/results/trainingNXGDBW-83E/)

전체를 더한 값을 먼저 구하는 방식이 나와 똑같다. 다만 결과를 배열에 넣어서 맨 마지막에 min 값을 계산한다.

```js
function solution(A) {
    let different = []
    let presentSum = 0
    let remainSum = A.reduce((a, b) => a + b)
    
    for(n of A) {
        presentSum += n
        remainSum -= n
        different.push(Math.abs(presentSum - remainSum))
    }

    return Math.min(...different)
}
```

### [dia](https://app.codility.com/demo/results/trainingPTA5QR-S6A/)


```js
function solution(A) {
  let result = []
  let acc = A.reduce((prev, curr, idx) => (idx > 0 ? prev + curr : 0))

   A.forEach((el, idx) => {
     sum += el
     result.push(Math.abs(sum - (acc - A[0])))

     if (idx + 1 <= A.length - 1) { acc = acc - A[idx + 1] }
   })
  
  return result.reduce(function(prev, curr, idx){ return (idx > 0)? ((prev < curr)? prev : curr) : curr; }, 0)
}
```


### 참고하기

* [Set](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set)
