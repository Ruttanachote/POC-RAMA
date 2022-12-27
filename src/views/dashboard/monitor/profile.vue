<template>
  <div>
    <div class="container justify-center items-center flex my-5">
      <n-card
        content-style="padding: 0;"
        title="ข้อมูลของฉัน"
        size="small"
        class="max-w-screen-lg bg-[#001527] text-white"
      >
        <div class="bg-white text-black p-5 justify-center items-center flex">
          <n-card class="h-40 w-40">
            <template #cover>
              <img
                clas=""
                src="https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ="
              />
            </template>
          </n-card>
        </div>
        <div class="px-40 bg-white">
          <n-space justify="space-between" class="">
            <h1 class="ml-10 items-left text-black">ชื่อ:</h1>
            <div class="py-5 mr-10">
              <input
                type="text"
                name="name"
                placeholder="Ruttanachot Kaeyai"
                class="w-full px-5 py-2 text-base focus:outline-none focus:border-blue-400"
              />
            </div>
          </n-space>
          <n-space justify="space-between" class="bg-white">
            <h1 class="ml-10 items-left text-black">หมายเลขโทรศัพท์:</h1>
            <div class="py-5 mr-10">
              <input
                type="text"
                name="name"
                placeholder="Ruttanachot Kaeyai"
                class="w-full px-5 py-2 text-base focus:outline-none focus:border-blue-400"
              />
            </div>
          </n-space>
          <n-space justify="space-between" class="bg-white">
            <h1 class="ml-10 items-left text-black">อีเมล</h1>
            <div class="py-5 mr-10">
              <input
                type="text"
                name="name"
                placeholder="Ruttanachot Kaeyai"
                class="w-full px-5 py-2 text-base focus:outline-none focus:border-blue-400"
              />
            </div>
          </n-space>
        </div>
      </n-card>
    </div>
    <div class="container justify-center items-center flex my-5">
      <n-card
        content-style="padding: 0;"
        title="หมวดหมูโปรโมชั่นที่สนใจ"
        size="small"
        class="max-w-screen-lg bg-[#001527] text-white"
      >
        <div class="bg-white text-black p-5 justify-center items-center flex">
          ไม่พบข้อมูล
        </div>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less">
.n-card-header .n-card-header__main {
  color: #fff !important;
}
</style>
