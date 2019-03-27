import { ms ,add } from "./_ms";
$("body").on("click", function() {
  console.log(add(1));
  $(this).html(ms("index"));
});
