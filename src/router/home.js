export default [
    {
        path: '/',
        component: resolve => require(['@/components/client/client'], resolve)
    },
    {
        path: '/cases',
        component: resolve => require(['@/components/case/cases'], resolve)
    },
    {
        path: '/client',
        component: resolve => require(['@/components/client/client'], resolve)
    },
    {
        path: '/money',
        component: resolve => require(['@/components/money/money'], resolve),
        children:[
            {
                path: '/',
                component: resolve => require(['@/components/money/addall'], resolve),
            },
            {
                path: 'addfn',
                component: resolve => require(['@/components/money/addfn'], resolve),
            },
            {
                path: 'gldk',
                component: resolve => require(['@/components/money/gldk'], resolve),
            },
        ]
    }
]