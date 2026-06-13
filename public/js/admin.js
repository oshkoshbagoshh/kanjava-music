/*
 * Kanjava Admin Panel interactions
 * Works with data attributes so PHP templates can stay simple.
 */

(function () {
    "use strict";

    const root = document.documentElement;
    const storageKey = "kanjava-admin-sidebar";

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    function emitToast(message, type = "info") {
        let region = qs("[data-admin-toast-region]");

        if (!region) {
            region = document.createElement("div");
            region.className = "admin-toast-region";
            region.setAttribute("data-admin-toast-region", "");
            document.body.appendChild(region);
        }

        const toast = document.createElement("div");
        toast.className = "admin-toast";
        toast.setAttribute("role", type === "error" ? "alert" : "status");

        const text = document.createElement("div");
        text.textContent = message;

        const close = document.createElement("button");
        close.className = "admin-toast__close";
        close.type = "button";
        close.setAttribute("aria-label", "Dismiss notification");
        close.textContent = "x";
        close.addEventListener("click", () => toast.remove());

        toast.append(text, close);
        region.appendChild(toast);
        window.setTimeout(() => toast.remove(), 4200);
    }

    function initSidebar() {
        const toggle = qs("[data-admin-sidebar-toggle]");
        const mobileToggle = qs("[data-admin-mobile-toggle]");

        if (localStorage.getItem(storageKey) === "collapsed") {
            root.classList.add("is-admin-sidebar-collapsed");
        }

        if (toggle) {
            toggle.addEventListener("click", () => {
                root.classList.toggle("is-admin-sidebar-collapsed");
                localStorage.setItem(
                    storageKey,
                    root.classList.contains("is-admin-sidebar-collapsed") ? "collapsed" : "expanded"
                );
            });
        }

        if (mobileToggle) {
            mobileToggle.addEventListener("click", () => {
                root.classList.toggle("is-admin-nav-open");
                document.body.classList.toggle("admin-scrim-lock", root.classList.contains("is-admin-nav-open"));
            });
        }

        qsa(".admin-nav__link").forEach((link) => {
            link.addEventListener("click", () => {
                root.classList.remove("is-admin-nav-open");
                document.body.classList.remove("admin-scrim-lock");
            });
        });
    }

    function initTabs() {
        qsa("[data-admin-tabs]").forEach((tabs) => {
            const tabButtons = qsa("[data-admin-tab]", tabs);

            tabButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const targetId = button.getAttribute("data-admin-tab");
                    const target = document.getElementById(targetId);

                    if (!target) {
                        return;
                    }

                    tabButtons.forEach((item) => {
                        item.classList.toggle("is-active", item === button);
                        item.setAttribute("aria-selected", item === button ? "true" : "false");
                    });

                    qsa("[data-admin-tab-panel]").forEach((panel) => {
                        panel.hidden = panel !== target;
                    });
                });
            });
        });
    }

    function initFilters() {
        const filterControls = [
            ...qsa("[data-admin-filter-table]"),
            ...qsa("[data-admin-status-filter]")
        ];

        filterControls.forEach((control) => {
            const table = getFilterTable(control);

            if (!table) {
                return;
            }

            const eventName = control.matches("[data-admin-filter-table]") ? "input" : "change";
            control.addEventListener(eventName, () => applyTableFilters(table));
        });
    }

    function getFilterTable(control) {
        const selector = control.getAttribute("data-admin-filter-table") ||
            control.getAttribute("data-admin-status-filter");

        return selector ? qs(selector) : null;
    }

    function applyTableFilters(table) {
        const searchControls = qsa("[data-admin-filter-table]").filter((input) => getFilterTable(input) === table);
        const statusControls = qsa("[data-admin-status-filter]").filter((select) => getFilterTable(select) === table);

        qsa("tbody tr", table).forEach((row) => {
            const matchesSearch = searchControls.every((input) => {
                const term = input.value.trim().toLowerCase();
                return term === "" || row.textContent.toLowerCase().includes(term);
            });

            const matchesStatus = statusControls.every((select) => {
                return select.value === "all" || row.getAttribute("data-status") === select.value;
            });

            row.classList.toggle("is-hidden", !matchesSearch || !matchesStatus);
        });
    }

    function initBulkSelection() {
        qsa("[data-admin-select-all]").forEach((checkbox) => {
            const group = checkbox.getAttribute("data-admin-select-all");
            const targets = () => qsa(`[data-admin-select="${group}"]`);

            checkbox.addEventListener("change", () => {
                targets().forEach((target) => {
                    target.checked = checkbox.checked;
                });
            });
        });
    }

    function initModals() {
        qsa("[data-admin-modal-open]").forEach((button) => {
            button.addEventListener("click", () => {
                const modal = qs(button.getAttribute("data-admin-modal-open"));

                if (modal) {
                    modal.classList.add("is-open");
                    document.body.classList.add("admin-scrim-lock");
                    const firstField = qs("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])", modal);
                    if (firstField) {
                        firstField.focus();
                    }
                }
            });
        });

        qsa("[data-admin-modal-close]").forEach((button) => {
            button.addEventListener("click", () => closeModal(button.closest(".admin-modal")));
        });

        qsa(".admin-modal").forEach((modal) => {
            modal.addEventListener("click", (event) => {
                if (event.target === modal) {
                    closeModal(modal);
                }
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeModal(qs(".admin-modal.is-open"));
            }
        });
    }

    function closeModal(modal) {
        if (!modal) {
            return;
        }

        modal.classList.remove("is-open");
        if (!qs(".admin-modal.is-open")) {
            document.body.classList.remove("admin-scrim-lock");
        }
    }

    function initDirtyForms() {
        qsa("form[data-admin-dirty-check]").forEach((form) => {
            let dirty = false;

            form.addEventListener("input", () => {
                dirty = true;
            });

            form.addEventListener("submit", () => {
                dirty = false;
                emitToast(form.getAttribute("data-admin-success-message") || "Changes saved.");
            });

            window.addEventListener("beforeunload", (event) => {
                if (!dirty) {
                    return;
                }

                event.preventDefault();
                event.returnValue = "";
            });
        });
    }

    function initConfirmActions() {
        qsa("[data-admin-confirm]").forEach((button) => {
            button.addEventListener("click", (event) => {
                const message = button.getAttribute("data-admin-confirm") || "Are you sure?";

                if (!window.confirm(message)) {
                    event.preventDefault();
                }
            });
        });
    }

    function initCopyButtons() {
        qsa("[data-admin-copy]").forEach((button) => {
            button.addEventListener("click", async () => {
                const target = qs(button.getAttribute("data-admin-copy"));
                const value = target ? target.value || target.textContent : "";

                try {
                    await navigator.clipboard.writeText(value.trim());
                    emitToast("Copied to clipboard.");
                } catch (error) {
                    emitToast("Copy failed. Select the text manually.", "error");
                }
            });
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        initSidebar();
        initTabs();
        initFilters();
        initBulkSelection();
        initModals();
        initDirtyForms();
        initConfirmActions();
        initCopyButtons();
    });

    window.KanjavaAdmin = {
        toast: emitToast,
        closeModal
    };
})();
