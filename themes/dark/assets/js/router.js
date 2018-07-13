const VueRouter = window.vueRouter;
const { routes, httpVueLoader } = window;

if (!window.router) {
    const loginComponent = httpVueLoader('js/templates/login.vue');
    const configComponent = httpVueLoader('js/templates/config.vue');
    const addShowsComponent = httpVueLoader('js/templates/add-shows.vue');
    const addRecommendedComponent = httpVueLoader('js/templates/add-recommended.vue');
    const notFoundComponent = httpVueLoader('js/templates/http/404.vue');

    const router = new VueRouter({
        base: document.body.getAttribute('web-root') + '/',
        mode: 'history',
        routes: Object.assign(routes || [], [{
            path: '/home',
            children: [{
                path: '',
                name: 'home',
                meta: {
                    title: 'Home',
                    header: 'Show List'
                }
            }, {
                path: 'editShow',
                name: 'editShow'
            }, {
                path: 'displayShow',
                name: 'displayShow'
            }]
        }, {
            path: '/login',
            name: 'login',
            meta: {
                title: 'Login'
            },
            component: loginComponent
        }, {
            path: '/config',
            // @NOTE: This can't be enabled until all child routes are 100% vue
            // component: { template: '<router-view/>' },
            children: [{
                path: '',
                name: 'config',
                meta: {
                    title: 'Help & Info',
                    header: 'Medusa Configuration'
                },
                component: configComponent
            }, {
                path: 'anime',
                name: 'configAnime',
                meta: {
                    title: 'Config - Anime',
                    header: 'Anime'
                }
            }, {
                path: 'backuprestore',
                name: 'configBackupRestore',
                meta: {
                    title: 'Config - Backup/Restore',
                    header: 'Backup/Restore'
                }
            }, {
                path: 'general',
                name: 'configGeneral',
                meta: {
                    title: 'Config - General',
                    header: 'General Configuration'
                }
            }, {
                path: 'notifications',
                name: 'configNotifications',
                meta: {
                    title: 'Config - Notifications',
                    header: 'Notifications'
                }
            }, {
                path: 'postProcessing',
                name: 'configPostProcessing',
                meta: {
                    title: 'Config - Post Processing',
                    header: 'Post Processing'
                }
            }, {
                path: 'providers',
                name: 'configSearchProviders',
                meta: {
                    title: 'Config - Providers',
                    header: 'Search Providers'
                }
            }, {
                path: 'search',
                name: 'configSearchSettings',
                meta: {
                    title: 'Config - Episode Search',
                    header: 'Search Settings'
                }
            }, {
                path: 'subtitles',
                name: 'configSubtitles',
                meta: {
                    title: 'Config - Subtitles',
                    header: 'Subtitles'
                }
            }]
        }, {
            path: '/addShows',
            // @NOTE: This can't be enabled until all child routes are 100% vue
            // component: { template: '<router-view/>' },
            children: [{
                path: '',
                name: 'addShows',
                meta: {
                    title: 'Add Shows',
                    header: 'Add Shows'
                },
                component: addShowsComponent
            }, {
                path: 'addExistingShows',
                name: 'addExistingShows',
                meta: {
                    title: 'Add Existing Shows',
                    header: 'Add Existing Shows'
                }
            }, {
                path: 'newShow',
                name: 'addNewShow',
                meta: {
                    title: 'Add New Show',
                    header: 'Add New Show'
                }
            }]
        }, {
            path: '/addRecommended',
            name: 'addRecommended',
            meta: {
                title: 'Add Recommended Shows',
                header: 'Add Recommended Shows'
            },
            component: addRecommendedComponent
        }, {
            path: '/schedule',
            name: 'schedule',
            meta: {
                title: 'Schedule',
                header: 'Schedule'
            }
        }, {
            path: '/history',
            name: 'history',
            meta: {
                title: 'History',
                header: 'History'
            }
        }, {
            path: '/manage',
            // @NOTE: This can't be enabled until all child routes are 100% vue
            // component: { template: '<router-view/>' },
            children: [{
                path: '',
                name: 'manage',
                meta: {
                    title: 'Mass Update',
                    header: 'Mass Update'
                }
            }, {
                path: 'backlogOverview',
                name: 'manageBacklogOverview',
                meta: {
                    title: 'Backlog Overview',
                    header: 'Backlog Overview'
                }
            }, {
                path: 'episodeStatuses',
                name: 'manageEpisodeOverview',
                meta: {
                    title: 'Episode Overview',
                    header: 'Episode Overview'
                }
            }, {
                path: 'failedDownloads',
                name: 'manageFailedDownloads',
                meta: {
                    title: 'Failed Downloads',
                    header: 'Failed Downlaods'
                }
            }, {
                path: 'manageSearches',
                name: 'manageManageSearches',
                meta: {
                    title: 'Manage Searches',
                    header: 'Manage Searches'
                }
            }, {
                path: 'massEdit',
                name: 'manageMassEdit',
                meta: {
                    title: 'Mass Edit'
                }
            }, {
                path: 'subtitleMissed',
                name: 'manageSubtitleMissed',
                meta: {
                    title: 'Missing Subtitles',
                    header: 'Missing Subtitles'
                }
            }, {
                path: 'subtitleMissedPP',
                name: 'manageSubtitleMissedPP',
                meta: {
                    title: 'Missing Subtitles in Post-Process folder',
                    header: 'Missing Subtitles in Post-Process folder'
                }
            }]
        }, {
            path: '/not-found',
            name: 'not-found',
            meta: {
                title: '404',
                header: '404 - page not found'
            },
            component: notFoundComponent
        // @NOTE: Redirect can only be added once all routes are vue
        // }, {
        //     path: '*',
        //     redirect: '/not-found'
        }])
    });

    router.beforeEach((to, from, next) => {
        const { meta } = to;
        const { title } = meta;

        // If there's no title then it's not a .vue route
        // or it's handling the it's own title
        if (title) {
            document.title = `${to.meta.title} | Medusa`;
        }

        // Always call next otherwise the <router-view> will be empty
        next();
    });

    window.router = router;
}
