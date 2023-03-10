<template>
  <NMenu
    class="main-menu"
    :options="menus"
    :inverted="inverted"
    :mode="mode"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    :default-expanded-keys="defaultExpandedKeys"
    :value="getSelectedKeys"
    :expand-icon="expandIcon"
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"
  />
  <NMenu
    :options="logOut"
    :inverted="inverted"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    :default-expanded-keys="defaultExpandedKeys"
    :value="getSelectedKeys"
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"
    class="logout"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  computed,
  watch,
  toRefs,
  unref,
  h,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAsyncRouteStore } from "@/store/modules/asyncRoute";
import { generatorMenu, generatorMenuMix } from "@/utils";
import { useProjectSettingStore } from "@/store/modules/projectSetting";
import { useProjectSetting } from "@/hooks/setting/useProjectSetting";
import { SignOutAlt, Plus } from "@vicons/fa";
import { renderIcon } from "@/utils/index";
import { NIcon } from "naive-ui";
export default defineComponent({
  name: "Menu",
  components: {},
  props: {
    mode: {
      type: String,
      default: "vertical",
    },
    collapsed: {
      type: Boolean,
    },
    location: {
      type: String,
      default: "left",
    },
  },
  emits: ["update:collapsed", "clickMenuItem"],
  setup(props, { emit }) {
    const currentRoute = useRoute();
    const router = useRouter();
    const asyncRouteStore = useAsyncRouteStore();
    const settingStore = useProjectSettingStore();
    const menus = ref<any[]>([]);
    const selectedKeys = ref<string>(currentRoute.name as string);
    const headerMenuSelectKey = ref<string>("");

    const { getNavMode } = useProjectSetting();

    const navMode = getNavMode;

    const matched = currentRoute.matched;

    const getOpenKeys = matched && matched.length ? matched.map((item) => item.name) : [];

    const state = reactive({
      openKeys: getOpenKeys,
    });

    const inverted = computed(() => {
      return ["dark", "header-dark"].includes(settingStore.navTheme);
    });

    const getSelectedKeys = computed(() => {
      let location = props.location;
      return location === "left" ||
        (location === "header" && unref(navMode) === "horizontal")
        ? unref(selectedKeys)
        : unref(headerMenuSelectKey);
    });

    const logOut = [
      {
        key: "logout",
        title: "??????????????????????????????",
        icon: renderIcon(SignOutAlt),
      },
    ];

    watch(
      () => settingStore.menuSetting.mixMenu,
      () => {
        updateMenu();
        if (props.collapsed) {
          emit("update:collapsed", !props.collapsed);
        }
      }
    );

    // watch(
    //   () => props.collapsed,
    //   (newVal) => {
    //   }
    // );

    watch(
      () => currentRoute.fullPath,
      () => {
        updateMenu();
      }
    );

    function updateSelectedKeys() {
      const matched = currentRoute.matched;
      state.openKeys = matched.map((item) => item.name);
      const activeMenu: string = (currentRoute.meta?.activeMenu as string) || "";
      selectedKeys.value = activeMenu
        ? (activeMenu as string)
        : (currentRoute.name as string);
    }

    function updateMenu() {
      if (!settingStore.menuSetting.mixMenu) {
        menus.value = generatorMenu(asyncRouteStore.getMenus);
      } else {
        const firstRouteName: string = (currentRoute.matched[0].name as string) || "";
        menus.value = generatorMenuMix(
          asyncRouteStore.getMenus,
          firstRouteName,
          props.location
        );
        const activeMenu: string = currentRoute?.matched[0].meta?.activeMenu as string;
        headerMenuSelectKey.value = (activeMenu ? activeMenu : firstRouteName) || "";
      }

      updateSelectedKeys();
    }

    function clickMenuItem(key: string) {
      if (/http(s)?:/.test(key)) {
        window.open(key);
      } else {
        router.push({ name: key });
      }
      emit("clickMenuItem" as any, key);
    }

    function menuExpanded(openKeys: string[]) {
      if (!openKeys) return;
      const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
      const isExistChildren = findChildrenLen(latestOpenKey as string);
      state.openKeys = isExistChildren
        ? latestOpenKey
          ? [latestOpenKey]
          : []
        : openKeys;
    }

    function findChildrenLen(key: string) {
      if (!key) return false;
      const subRouteChildren: string[] = [];
      for (const { children, key } of unref(menus)) {
        if (children && children.length) {
          subRouteChildren.push(key as string);
        }
      }
      return subRouteChildren.includes(key);
    }

    onMounted(() => {
      updateMenu();
    });

    return {
      ...toRefs(state),
      inverted,
      logOut,
      menus,
      selectedKeys,
      headerMenuSelectKey,
      getSelectedKeys,
      defaultExpandedKeys: ["dashboard", "dashboard_point", "dashboard_workplace"],
      clickMenuItem,
      menuExpanded,
      renderMenuIcon: (icon: string) => renderIcon(icon),
      expandIcon: (MenuOption) =>
        h(NIcon, { clsPrefix: "n-menu-item-content__icon" }, { default: () => h(Plus) }),
    };
  },
});
</script>

<style>
/* .logout  .n-menu-item{
    background-color: #c53543;
} */

.n-menu-item{
  margin-top: 0px !important;
} 

.logout .n-menu-item-content__icon {
  color: #c53543 !important;
}

.logout .n-menu-item-content-header {
  color: #c53543 !important;
}
</style>
