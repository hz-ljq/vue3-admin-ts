<template>
  <div class="TsDemo">
    <h1>TsDemo</h1>
  </div>
</template>

<script setup lang="ts">
// // // 没有ThisType情况下
// // const foo = {
// //   bar() {
// //     console.log(this.a); // error，在foo中只有bar一个函数，不存在a
// //   },
// // };

// // 使用ThisType
// const foo: { bar: any } & ThisType<{ a: number }> = {
//   bar() {
//     console.log(this.bar); // error，因为没有在ThisType中定义
//     console.log(this.a); // ok
//   },
// };

// foo.bar; // ok
// foo.a; // error，在外面的话，就跟ThisType没有关系了

</script>
