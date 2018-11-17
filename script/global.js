(function () {
    new PerfectScrollbar("main", {"suppressScrollX": true});
    new PerfectScrollbar("#menu ul", {"suppressScrollX": true, "wheelPropagation": false});
    var menuCloseEventListener = function(){
            var toggle  = document.getElementById("nav-toggle"),
                menu    = document.getElementById("menu")
            ;
            if (toggle.classList.contains("open")) {
                toggle.classList.remove("open");
            }
            if (menu.classList.contains("open")) {
                menu.classList.remove("open");
            }
            document.getElementById("main").removeEventListener("click", menuCloseEventListener);
    };
    document.getElementById("nav-toggle").addEventListener(
        "click",
        function () {
            var menu = document.getElementById("menu");
            if (!this.classList.contains("open")) {
                this.classList.add("open");
                if (!menu.classList.contains("open")) {
                    menu.classList.add("open");
                }
                document.getElementById("main").addEventListener("click", menuCloseEventListener);
            } else {
                this.classList.remove("open");
                if (menu.classList.contains("open")) {
                    menu.classList.remove("open");
                }
                document.getElementById("main").removeEventListener("click", menuCloseEventListener);
            }
        }
    );
    
    var tabList = document.querySelectorAll('ul.tabs li'),
        tabCount = tabList.length,
        selectClass = 'selected',
        getTabElements = function (name) {
            if ('string' !== typeof name) {
                return [];
            }

            return document.querySelectorAll(
                '[data-tabs-tab="' + name + '"]'
            );
        },
        removeSelected = function (name) {
            var tabs = getTabElements(name),
                tabsCount = tabs.length
                ;

            for (var i = 0; i < tabsCount; i++) {
                if (tabs[i].classList.contains(selectClass)) {
                    tabs[i].classList.remove(selectClass);
                }
            }
        },
        addSelected = function (name) {
            var tabs = getTabElements(name),
                tabsCount = tabs.length
                ;

            for (var i = 0; i < tabsCount; i++) {
                if (!tabs[i].classList.contains(selectClass)) {
                    tabs[i].classList.add(selectClass);
                }
            }
        },
        getTabName = function ($dom) {
            if ('undefined' === typeof $dom.dataset.tabsTab) {
                return null;
            }

            return $dom.dataset.tabsTab;
        }
        ;

    for (var i = 0; i < tabCount; i++) {
        tabList[i].addEventListener(
            'click',
            function () {
                var brotherTabs = this.parentNode.children,
                    brotherCnt = brotherTabs.length
                    ;

                for (var i = 0; i < brotherCnt; i++) {
                    removeSelected(getTabName(brotherTabs[i]));
                }

                addSelected(getTabName(this));
            },
            false
        );
    }
})();