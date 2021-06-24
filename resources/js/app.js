import Vue from "vue";

import vuetify from "./Plugins/vuetify";
import { router } from "./Router/router";
import { store } from "./Store/store";
import App from "./App";
import { ApiConsumer } from "./Services/ApiConsumer";

new Vue({
    vuetify,
    router,
    store,
    el: "#app",
    components: { App },
    data: () => {
        return {
            swRegistration: null,
        };
    },
    async beforeCreate() {
        const token = localStorage.getItem("token");
        document.addEventListener("userLogged", () => {
            this.initSW();
        });
        document.addEventListener("userUnlogged", () => {
            this.unsubscribeUser();
        });
        if (token) {
            ApiConsumer.setToken(token);
            try {
                await this.$store.dispatch("user/getUserWithToken");
                await this.$store.commit("user/setToken", token);
                this.initSW();
            } catch {
                this.$store.dispatch("user/logout");
                if (this.$route.name !== "account") {
                    this.$router.push({ name: "account" });
                }
            }
        } else {
            this.$store.dispatch("user/logout");
            if (this.$route.name !== "account") {
                this.$router.push({ name: "account" });
            }
        }
    },
    methods: {
        initSW() {
            if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
                return;
            }
            navigator.serviceWorker
                .register("../sw.js")
                .then((swReg) => {
                    this.swRegistration = swReg;
                    this.initPush();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        initPush() {
            if (!navigator.serviceWorker.ready) {
                return;
            }
            Notification.requestPermission().then((permissionResult) => {
                if (permissionResult !== "granted") {
                    throw new Error("We weren't granted permission.");
                }
                this.subscribeUser();
            });
        },
        subscribeUser() {
            navigator.serviceWorker.ready
                .then((registration) => {
                    const subscribeOptions = {
                        userVisibleOnly: true,
                        applicationServerKey: this.urlBase64ToUint8Array(
                            "BDhlcHd7MqGOXGT4OPUeeFNN1yXWVlmSfckh-3hXJs0uIiacJY4ub_opK13W-Bc5_DMOPupV7QmkHmCapEcw2No"
                        ),
                    };

                    return registration.pushManager.subscribe(subscribeOptions);
                })
                .then((pushSubscription) => {
                    this.storePushSubscription(pushSubscription);
                });
        },
        urlBase64ToUint8Array(base64String) {
            const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
            const base64 = (base64String + padding)
                .replace(/-/g, "+")
                .replace(/_/g, "/");

            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        },
        storePushSubscription(pushSubscription) {
            ApiConsumer.post("user/storePushEndpoint", pushSubscription).then(
                (resp) => {
                    console.log(resp);
                }
            );
        },
        unsubscribeUser() {
            this.swRegistration.pushManager
                .getSubscription()
                .then(function (subscription) {
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                })
                .catch(function (error) {
                    console.log("Error unsubscribing", error);
                });
        },
    },
});
