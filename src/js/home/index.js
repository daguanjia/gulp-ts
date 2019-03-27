(function () {
  'use strict';

  var ms = function (x) {
      return x + "sss";
  };
  function add(x) {
      return 1 + x;
  }

  $("body").on("click", function () {
      console.log(add(1));
      $(this).html(ms("index"));
  });

}());
