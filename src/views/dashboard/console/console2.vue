<template>
  <div>
    <div>
      <div class="container justify-center items-center flex my-5 ">
        <n-card
          content-style="padding: 0;"
          title="โปรโมชั่น ที่ชอบ"
          size="small"
          class="max-w-screen-lg bg-[#001527] fixed-color"
        >
          <div class="bg-white text-black justify-center items-center flex">
            <div class="py-5">
              <div class="">
                <div class="flex justify-center items-center">
                 <n-h1> Horizontal responsive form</n-h1>
                </div>
              </div>
              <div class="">
                <div class="flex flex-col md:flex-row border-b border-gray-200">
                  <div class="flex-1 flex flex-col md:flex-row">
                    <div class="w-full flex-1">
                      <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                        <n-input
                          placeholder="Name"
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                      </div>
                    </div>
                    <div class="w-full flex-1">
                      <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                        <n-input
                          placeholder="Company"
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                      </div>
                    </div>
                    <div class="w-full flex-1">
                      <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                        <n-input
                          placeholder="First Name.."
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="flex flex-col md:flex-row border-b border-gray-200">
                  <div class="flex-1 flex flex-col md:flex-row">
                    <div class="w-full flex-1">
                      <div class="p-1 bg-white flex border border-gray-200 rounded">
                        <n-input
                          placeholder="First Name.."
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                      </div>
                    </div>
                    <div class="w-full flex-1">
                      <div class="p-1 bg-white flex border border-gray-200 rounded">
                        <n-input
                          placeholder="First Name.."
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                      </div>
                    </div>
                    <div class="w-full flex-1">
                      <div class="p-1 bg-white flex border border-gray-200 rounded">
                        <n-input
                          placeholder="First Name.."
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                        <n-switch size="small" class="p-1 px-2" />
                        <n-switch size="small" class="p-1 px-2" />
                      </div>
                    </div>
                    <div class="w-full flex-1">
                      <div class="p-1 bg-white flex border border-gray-200 rounded">
                        <n-input
                          placeholder="First Name.."
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="flex flex-col md:flex-row border-b border-gray-200">
                  <div class="flex-1 flex flex-col md:flex-row">
                    <div class="w-full flex-1">
                      <div class="p-1 bg-white flex border border-gray-200 rounded">
                        <n-select
                          size="large"
                          placeholder="First Name.."
                          :options="options"
                          class="appearance-none outline-none w-full text-gray-800"
                        />
                      </div>
                    </div>
                    <div class="w-full flex-1">
                      <div class="p-1 bg-white flex border border-gray-200 rounded">
                        <n-input
                          placeholder="First Name.."
                          class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        />
                      </div>
                    </div>
                    <div class="w-full flex-1">
                      <div class="p-1 bg-white flex border border-gray-200 rounded">
                        <n-select
                          size="large"
                          :options="options"
                          placeholder="Please select"
                          class="appearance-none outline-none w-full text-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="flex justify-center items-center">
                <n-button type="primary" class="my-2">Submit</n-button>
                </div>
              </div>
            </div>
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
            <n-grid
              cols="1 s:2 m:3 l:8 xl:8 2xl:8"
              responsive="screen"
              :x-gap="16"
              :y-gap="8"
            >
              <n-grid-item v-for="(item, index) in iconList" :key="index">
                <NCard content-style="padding-top: 0;" size="small" :bordered="false">
                  <template #footer>
                    <n-skeleton v-if="loading" size="medium" />
                    <div v-else class="cursor-pointer">
                      <p class="flex justify-center">
                        <span>
                          <n-icon :size="item.size" class="flex-1" :color="item.color">
                            <component :is="item.icon" v-on="item.eventObject || {}" />
                          </n-icon>
                        </span>
                      </p>
                      <p class="flex justify-center">
                        <span>{{ item.title }}</span>
                      </p>
                    </div>
                  </template>
                </NCard>
              </n-grid-item>
            </n-grid>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getConsoleInfo } from "@/api/dashboard/console";
import {
  UsergroupAddOutlined,
  BarChartOutlined,
  ShoppingCartOutlined,
  AccountBookOutlined,
  CreditCardOutlined,
  MailOutlined,
  TagsOutlined,
  SettingOutlined,
} from "@vicons/antd";
import {
  DinnerDiningOutlined,
  LocalHotelOutlined,
  CardTravelFilled,
} from "@vicons/material";
const loading = ref(true);
const visits = ref<any>({});
const saleroom = ref<any>({});
const orderLarge = ref<any>({});
const volume = ref({});

const iconList = [
  {
    icon: ShoppingCartOutlined,
    size: "32",
    title: "Shopping",
    color: "#69c0ff",
    eventObject: {
      click: () => {},
    },
  },
  {
    icon: DinnerDiningOutlined,
    size: "32",
    title: "Dining",
    color: "#69c0ff",
    eventObject: {
      click: () => {},
    },
  },
  {
    icon: LocalHotelOutlined,
    size: "32",
    title: "Hotel",
    color: "#ff9c6e",
    eventObject: {
      click: () => {},
    },
  },
  {
    icon: CardTravelFilled,
    size: "32",
    title: "travel",
    color: "#b37feb",
    eventObject: {
      click: () => {},
    },
  },
  {
    icon: CreditCardOutlined,
    size: "32",
    title: "...",
    color: "#ffd666",
    eventObject: {
      click: () => {},
    },
  },
  {
    icon: MailOutlined,
    size: "32",
    title: "...",
    color: "#5cdbd3",
    eventObject: {
      click: () => {},
    },
  },
  {
    icon: TagsOutlined,
    size: "32",
    title: "...",
    color: "#ff85c0",
    eventObject: {
      click: () => {},
    },
  },
  {
    icon: SettingOutlined,
    size: "32",
    title: "...",
    color: "#ffc069",
    eventObject: {
      click: () => {},
    },
  },
];

const options = [
  {
    label: "Everybody's Got Something to Hide Except Me and My Monkey",
    value: "song0",
    disabled: true,
  },
  {
    label: "Drive My Car",
    value: "song1",
  },
  {
    label: "Norwegian Wood",
    value: "song2",
  },
  {
    label: "You Won't See",
    value: "song3",
    disabled: true,
  },
  {
    label: "Nowhere Man",
    value: "song4",
  },
  {
    label: "Think For Yourself",
    value: "song5",
  },
  {
    label: "The Word",
    value: "song6",
  },
  {
    label: "Michelle",
    value: "song7",
    disabled: true,
  },
  {
    label: "What goes on",
    value: "song8",
  },
  {
    label: "Girl",
    value: "song9",
  },
  {
    label: "I'm looking through you",
    value: "song10",
  },
  {
    label: "In My Life",
    value: "song11",
  },
  {
    label: "Wait",
    value: "song12",
  },
];

onMounted(async () => {
  const data = await getConsoleInfo();
  visits.value = data.visits;
  saleroom.value = data.saleroom;
  orderLarge.value = data.orderLarge;
  volume.value = data.volume;
  loading.value = false;
});


</script>

<style lang="less">

.n-card-header .n-card-header__main {
  color: #fff !important;
}
</style>
