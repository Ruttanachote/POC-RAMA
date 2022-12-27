<template>
  <div class="layout-header">
    <div
      v-if="navMode === 'horizontal' || (navMode === 'horizontal-mix' && mixMenu)"
      class="layout-header-left"
    >
      <div v-if="navMode === 'horizontal'" class="logo">
        <img :src="websiteConfig.logo" alt="" />
        <h2 v-show="!collapsed" class="title">{{ websiteConfig.title }}</h2>
      </div>
      <AsideMenu
        v-model:collapsed="collapsed"
        v-model:location="getMenuLocation"
        :inverted="getInverted"
        mode="horizontal"
      />
    </div>
    <div class="layout-header-left" v-else>
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <div
        v-if="headerSetting.isReload"
        class="mr-1 layout-header-trigger layout-header-trigger-min"
        @click="reloadPage"
      >
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
      <n-breadcrumb v-if="crumbsSetting.show">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item v-if="routeItem.meta.title">
            <n-dropdown
              v-if="routeItem.children.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span class="link-text">
                <component
                  :is="routeItem.meta.icon"
                  v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                />
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              <component
                v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                :is="routeItem.meta.icon"
              />
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div class="layout-header-right">
      <!-- <div
        class="layout-header-trigger layout-header-trigger-min"
        v-for="item in iconList"
        :key="item.icon.name"
      >
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="item.icon" v-on="item.eventObject || {}" />
            </n-icon>
          </template>
          <span>{{ item.tips }}</span>
        </n-tooltip>
      </div> -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="fullscreenIcon" @click="toggleFullScreen" />
            </n-icon>
          </template>
          <span>Full screen</span>
        </n-tooltip>
      </div>
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
          <div class="avatar">
            <n-avatar round>
              {{ username }}
              <template #icon>
                <UserOutlined />
              </template>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
      <div class="layout-header-trigger layout-header-trigger-min" @click="openSetting">
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <n-icon size="18" style="font-weight: bold">
              <SettingOutlined />
            </n-icon>
          </template>
          <span>Configuration</span>
        </n-tooltip>
      </div>
    </div>
  </div>
  <ProjectSetting ref="drawerSetting" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed, unref } from "vue";
import { useRouter, useRoute } from "vue-router";
import components from "./components";
import { NDialogProvider, useDialog, useMessage } from "naive-ui";
import { TABS_ROUTES } from "@/store/mutation-types";
import { useUserStore } from "@/store/modules/user";
import { useLockscreenStore } from "@/store/modules/lockscreen";
import ProjectSetting from "./ProjectSetting.vue";
import { AsideMenu } from "@/layout/components/Menu";
import { useProjectSetting } from "@/hooks/setting/useProjectSetting";
import { websiteConfig } from "@/config/website.config";

export default defineComponent({
  name: "PageHeader",
  components: { ...components, NDialogProvider, ProjectSetting, AsideMenu },
  props: {
    collapsed: {
      type: Boolean,
    },
    inverted: {
      type: Boolean,
    },
  },
  setup(props) {
    const userStore = useUserStore();
    const useLockscreen = useLockscreenStore();
    const message = useMessage();
    const dialog = useDialog();
    const {
      getNavMode,
      getNavTheme,
      getHeaderSetting,
      getMenuSetting,
      getCrumbsSetting,
    } = useProjectSetting();

    const { username } = userStore?.info || {};

    const drawerSetting = ref();

    const state = reactive({
      username: username || "",
      fullscreenIcon: "FullscreenOutlined",
      navMode: getNavMode,
      navTheme: getNavTheme,
      headerSetting: getHeaderSetting,
      crumbsSetting: getCrumbsSetting,
    });

    const getInverted = computed(() => {
      const navTheme = unref(getNavTheme);
      return ["light", "header-dark"].includes(navTheme)
        ? props.inverted
        : !props.inverted;
    });

    const mixMenu = computed(() => {
      return unref(getMenuSetting).mixMenu;
    });

    const getChangeStyle = computed(() => {
      const { collapsed } = props;
      const { minMenuWidth, menuWidth }: any = unref(getMenuSetting);
      return {
        left: collapsed ? `${minMenuWidth}px` : `${menuWidth}px`,
        width: `calc(100% - ${collapsed ? `${minMenuWidth}px` : `${menuWidth}px`})`,
      };
    });

    const getMenuLocation = computed(() => {
      return "header";
    });

    const router = useRouter();
    const route = useRoute();

    const generator: any = (routerMap) => {
      return routerMap.map((item) => {
        const currentMenu = {
          ...item,
          label: item.meta.title,
          key: item.name,
          disabled: item.path === "/",
        };
        if (item.children && item.children.length > 0) {
          currentMenu.children = generator(item.children, currentMenu);
        }
        return currentMenu;
      });
    };

    const breadcrumbList = computed(() => {
      return generator(route.matched);
    });

    const dropdownSelect = (key) => {
      router.push({ name: key });
    };

    const reloadPage = () => {
      router.push({
        path: "/redirect" + unref(route).fullPath,
      });
    };

    const doLogout = () => {
      dialog.info({
        title: "Log out",
        content: "are you sure to log out?",
        positiveText: "sure",
        negativeText: "cancel",
        onPositiveClick: () => {
          userStore.logout().then(() => {
            message.success("Successfully logged out");
            localStorage.removeItem(TABS_ROUTES);
            router
              .replace({
                name: "Login",
                query: {
                  redirect: route.fullPath,
                },
              })
              .finally(() => location.reload());
          });
        },
        onNegativeClick: () => {},
      });
    };
    const toggleFullscreenIcon = () =>
      (state.fullscreenIcon =
        document.fullscreenElement !== null
          ? "FullscreenExitOutlined"
          : "FullscreenOutlined");
    document.addEventListener("fullscreenchange", toggleFullscreenIcon);
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    const iconList = [
      {
        icon: "LockOutlined",
        tips: "Lock screen",
        eventObject: {
          click: () => useLockscreen.setLock(true),
        },
      },
    ];
    const avatarOptions = [
      {
        label: "Profile",
        key: 1,
      },
      {
        label: "Logout",
        key: 2,
      },
    ];
    const avatarSelect = (key) => {
      switch (key) {
        case 1:
          router.push({ name: "Setting" });
          break;
        case 2:
          doLogout();
          break;
      }
    };

    function openSetting() {
      const { openDrawer } = drawerSetting.value;
      openDrawer();
    }

    return {
      ...toRefs(state),
      iconList,
      toggleFullScreen,
      doLogout,
      route,
      dropdownSelect,
      avatarOptions,
      getChangeStyle,
      avatarSelect,
      breadcrumbList,
      reloadPage,
      drawerSetting,
      openSetting,
      getInverted,
      getMenuLocation,
      mixMenu,
      websiteConfig,
    };
  },
});
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: @header-height;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 11;

  &-left {
    display: flex;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      line-height: 64px;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 10px;

      img {
        width: auto;
        height: 32px;
        margin-right: 10px;
      }

      .title {
        // margin-bottom: 0;
      }
    }

    ::v-deep(.ant-breadcrumb span:last-child .link-text) {
      color: #515a6e;
    }

    .n-breadcrumb {
      display: inline-block;
    }

    &-menu {
      color: var(--text-color);
    }
  }

  &-right {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .avatar {
      display: flex;
      align-items: center;
      height: 64px;
    }

    > * {
      cursor: pointer;
    }
  }

  &-trigger {
    display: inline-block;
    width: 64px;
    height: 64px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    .n-icon {
      display: flex;
      align-items: center;
      height: 64px;
      line-height: 64px;
    }

    &:hover {
      background: hsla(0, 0%, 100%, 0.08);
    }

    .anticon {
      font-size: 16px;
      color: #515a6e;
    }
  }

  &-trigger-min {
    width: auto;
    padding: 0 12px;
  }
}

.layout-header-light {
  background: #fff;
  color: #515a6e;

  .n-icon {
    color: #515a6e;
  }

  .layout-header-left {
    ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
      color: #515a6e;
    }
  }

  .layout-header-trigger {
    &:hover {
      background: #f8f8f9;
    }
  }
}

.layout-header-fix {
  position: fixed;
  top: 0;
  right: 0;
  left: 200px;
  z-index: 11;
}

//::v-deep(.menu-router-link) {
//  color: #515a6e;
//
//  &:hover {
//    color: #1890ff;
//  }
//}
</style>
