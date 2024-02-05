import { of } from 'rxjs';
import { map, reduce, filter } from 'rxjs/operators';

let test1 = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
let case1 = test1.pipe(
   filter(x => x % 2 === 0),
   reduce((acc, one) => acc + one, 0)
)
case1.subscribe(x => console.log(x));