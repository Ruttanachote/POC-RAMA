import { defineStore } from 'pinia';
import { IS_LOCKSCREEN } from '@/store/mutation-types';
import { storage } from '@/utils/Storage';

const initTime = 60 * 60;

const isLock = storage.get(IS_LOCKSCREEN, false);

export type ILockscreenState = {
  isLock: boolean; 
  lockTime: number;
};

export const useLockscreenStore = defineStore({
  id: 'app-lockscreen',
  state: (): ILockscreenState => ({
    isLock: isLock === true, 
    lockTime: isLock == 'true' ? initTime : 0,
  }),
  getters: {},
  actions: {
    setLock(payload) {
      this.isLock = payload;
      storage.set(IS_LOCKSCREEN, this.isLock);
    },
    setLockTime(payload = initTime) {
      this.lockTime = payload;
    },
  },
});
