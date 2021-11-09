import Player from "./Player.vue";
import { App } from "vue";
import en from "./assets/i18n/en.json";
import de from "./assets/i18n/de.json";

import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { getUserLocale } from "get-user-locale";

const locale = getUserLocale().substring(0, 2);

const i18n = createI18n({
  locale: locale,
  messages: {
    en: en,
    de: de,
  },
  fallbackLocale: ["en", "de"],
});

const defaultComponentName = "SocialVideoPlayer";

const VueSocialVideoPlayer: any = {
  install(app: App, options: any = {}) {
    /**
     * Makes sure that plugin can be installed only once
     */
    if (this.installed) {
      return;
    }

    this.installed = true;

    this.componentName = options.componentName || defaultComponentName;

    app.component(this.componentName, Player);
    app.use(createPinia());
    app.use(i18n);
  },
};

export default VueSocialVideoPlayer;
