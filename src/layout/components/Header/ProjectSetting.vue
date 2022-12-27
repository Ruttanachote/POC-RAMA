<template>
  <n-drawer v-model:show="isDrawer" :width="width" :placement="placement">
    <n-drawer-content :title="title" :native-scrollbar="false">
      <div class="drawer">
        <n-divider title-placement="center">Theme</n-divider>

        <div class="justify-center drawer-setting-item dark-switch">
          <n-tooltip placement="bottom">
            <template #trigger>
              <n-switch
                disabled
                v-model:value="designStore.darkTheme"
                class="dark-theme-switch"
              >
                <template #checked>
                  <n-icon size="14" color="#ffd93b">
                    <SunnySharp />
                  </n-icon>
                </template>
                <template #unchecked>
                  <n-icon size="14" color="#ffd93b">
                    <Moon />
                  </n-icon>
                </template>
              </n-switch>
            </template>
            <span>{{ designStore.darkTheme ? "Dark" : "Light" }} Theme</span>
          </n-tooltip>
        </div>

        <n-divider title-placement="center"> Color</n-divider>

        <div class="drawer-setting-item align-items-top">
          <span
            class="theme-item"
            v-for="(item, index) in appThemeList"
            :key="index"
            :style="{ 'background-color': item }"
            @click="togTheme(item)"
          >
            <n-icon size="12" v-if="item === designStore.appTheme">
              <CheckOutlined />
            </n-icon>
          </span>
        </div>

        <n-divider title-placement="center">navbar mode</n-divider>

        <div class="drawer-setting-item align-items-top">
          <div class="drawer-setting-item-style align-items-top">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-theme-dark.svg"
                  @click="togNavMode('vertical')"
                  alt="Left menu mode"
                />
              </template>
              <span>Left menu mode</span>
            </n-tooltip>
            <n-badge dot color="#19be6b" v-show="settingStore.navMode === 'vertical'" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-horizontal.svg"
                  alt="Top menu mode"
                  @click="togNavMode('horizontal')"
                />
              </template>
              <span>Top menu mode</span>
            </n-tooltip>
            <n-badge dot color="#19be6b" v-show="settingStore.navMode === 'horizontal'" />
          </div>
        </div>

        <n-divider title-placement="center">navbar style</n-divider>

        <div class="drawer-setting-item align-items-top">
          <div class="drawer-setting-item-style align-items-top">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-theme-dark.svg"
                  alt="black mode"
                  @click="togNavTheme('dark')"
                />
              </template>
              <span>black mode</span>
            </n-tooltip>
            <n-badge dot color="#19be6b" v-if="settingStore.navTheme === 'dark'" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/nav-theme-light.svg"
                  alt="white mode"
                  @click="togNavTheme('light')"
                />
              </template>
              <span>white mode</span>
            </n-tooltip>
            <n-badge dot color="#19be6b" v-if="settingStore.navTheme === 'light'" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img
                  src="~@/assets/images/header-theme-dark.svg"
                  @click="togNavTheme('header-dark')"
                  alt="black and white mode"
                />
              </template>
              <span>black and white mode</span>
            </n-tooltip>
            <n-badge dot color="#19be6b" v-if="settingStore.navTheme === 'header-dark'" />
          </div>
        </div>
        <!-- <n-divider title-placement="center">interface function</n-divider> -->

        <!-- <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">split menu</div>
          <div class="drawer-setting-item-action">
            <n-switch
              :disabled="settingStore.navMode !== 'horizontal-mix'"
              v-model:value="settingStore.menuSetting.mixMenu"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">fixed topbar</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.headerSetting.fixed" />
          </div>
        </div> -->

        <!--        <div class="drawer-setting-item">-->
        <!--          <div class="drawer-setting-item-title">-->
        <!--          </div>-->
        <!--          <div class="drawer-setting-item-action">-->
        <!--            <n-switch v-model:value="settingStore.menuSetting.fixed" />-->
        <!--          </div>-->
        <!--        </div>-->

        <!-- <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">Fixed history tabs</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.multiTabsSetting.fixed" />
          </div>
        </div> -->

        <!-- <n-divider title-placement="center">interface display</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">Show reload page button</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.headerSetting.isReload" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">Show Breadcrumbs</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.crumbsSetting.show" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title"> Show icon menu </div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.crumbsSetting.showIcon" />
          </div>
        </div> -->

        <!-- <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">Show multiple history tabs</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.multiTabsSetting.show" />
          </div>
        </div> -->

        <n-divider title-placement="center">animation</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">disable animation</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="settingStore.isPageAnimate" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">animation type</div>
          <div class="drawer-setting-item-select">
            <n-select
              v-model:value="settingStore.pageAnimateType"
              :options="animateOptions"
            />
          </div>
        </div>

        <div class="drawer-setting-item">
          <n-alert type="warning" :showIcon="false">
            <p>{{ alertText }}</p>
          </n-alert>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, unref, watch, computed } from "vue";
import { useProjectSettingStore } from "@/store/modules/projectSetting";
import { useDesignSettingStore } from "@/store/modules/designSetting";
import { CheckOutlined } from "@vicons/antd";
import { Moon, SunnySharp } from "@vicons/ionicons5";
import { darkTheme } from "naive-ui";
import { animates as animateOptions } from "@/settings/animateSetting";

export default defineComponent({
  name: "ProjectSetting",
  components: { CheckOutlined, Moon, SunnySharp },
  props: {
    title: {
      type: String,
      default: "Configuration",
    },
    width: {
      type: Number,
      default: 280,
    },
  },
  setup(props) {
    const settingStore = useProjectSettingStore();
    const designStore = useDesignSettingStore();
    const state = reactive({
      width: props.width,
      title: props.title,
      isDrawer: false,
      placement: "right",
      alertText:
        "ส่วนนี้จะเปลี่ยนแปลงการตั้งค่า ตอนเริ่มต้นของระบบ หลังจากนั้น ส่วนนี้จะไม่มี",
      appThemeList: designStore.appThemeList,
    });

    watch(
      () => designStore.darkTheme,
      (to) => {
        settingStore.navTheme = to ? "header-dark" : "dark";
      }
    );

    const directionsOptions = computed(() => {
      return animateOptions.find(
        (item) => item.value == unref(settingStore.pageAnimateType)
      );
    });

    function openDrawer() {
      state.isDrawer = true;
    }

    function closeDrawer() {
      state.isDrawer = false;
    }

    function togNavTheme(theme) {
      settingStore.navTheme = theme;
      if (settingStore.navMode === "horizontal" && ["light"].includes(theme)) {
        settingStore.navTheme = "dark";
      }
    }

    function togTheme(color) {
      designStore.appTheme = color;
    }

    function togNavMode(mode) {
      settingStore.navMode = mode;
      settingStore.menuSetting.mixMenu = false;
    }

    return {
      ...toRefs(state),
      settingStore,
      designStore,
      togNavTheme,
      togNavMode,
      togTheme,
      darkTheme,
      openDrawer,
      closeDrawer,
      animateOptions,
      directionsOptions,
    };
  },
});
</script>

<style lang="less" scoped>
.drawer {
  .n-divider:not(.n-divider--vertical) {
    margin: 10px 0;
  }

  &-setting-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    flex-wrap: wrap;

    &-style {
      display: inline-block;
      position: relative;
      margin-right: 16px;
      cursor: pointer;
      text-align: center;
    }

    &-title {
      flex: 1 1;
      font-size: 14px;
    }

    &-action {
      flex: 0 0 auto;
    }

    &-select {
      flex: 1;
    }

    .theme-item {
      width: 20px;
      min-width: 20px;
      height: 20px;
      cursor: pointer;
      border: 1px solid #eee;
      border-radius: 2px;
      margin: 0 5px 5px 0;
      text-align: center;
      line-height: 14px;

      .n-icon {
        color: #fff;
      }
    }
  }

  .align-items-top {
    align-items: flex-start;
    padding: 2px 0;
  }

  .justify-center {
    justify-content: center;
  }

  .dark-switch .n-switch {
    ::v-deep(.n-switch__rail) {
      background-color: #000e1c;
    }
  }
}
</style>
