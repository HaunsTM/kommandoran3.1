declare module 'idle-vue' {
  /*https://github.com/soixantecircuits/idle-vue/issues/30*/
  /*https://medium.com/@chris_72272/migrating-to-typescript-write-a-declaration-file-for-a-third-party-npm-module-b1f75808ed2*/
    import Vue, { PluginFunction } from 'vue'
    export interface IdleVueUseOptions {
      events?: string[]
      eventEmitter?: any
      idleTime?: number
      keepTracking?: boolean
      moduleName?: string
      startAtIdle?: boolean
      store?: any
    }
    module "vue/types/vue" {
      interface Vue {
        isAppIdle: boolean
      }
    }
   // In case you want to vue.extend format
    module "vue/types/options" {
      interface ComponentOptions<V extends Vue> {
        onIdle?: () => void
        onActive?: () => void
      }
    }
    export function install(): PluginFunction<IdleVueUseOptions>
  }