/*
  Some changes!!
*/
import aThing from './sample-module';

export let main = () => {
  var something = 'something';
  var another = 'another';

  console.log(another, something, 'is here!!!');

  aThing();
}

main();

if(module.hot) {
  module.hot.accept();
}
