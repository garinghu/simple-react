module.exports = {
    'GET /api/a/b': function(req, res) {
        res.json({
            data: {
                test: 'hello'
            },
            errno: 0,
            errmasg: 'msg'
        })
    },

    'GET /api/menudata': function(req, res) {
        res.json({
            data: [
                {
                    title: '监考信息',
                    children: [{
                        key: 'invigilate-unassigned',
                        title: '未分配'
                    },{
                        key: 'invigilate-assigned',
                        title: '已分配'
                    },{
                        key: 'invigilate-completed',
                        title: '已完成'
                    }]
                }
            ],
            errno: 0,
            errmasg: 'msg'
        })
    },

    'GET /api/tablesearch': function(req, res) {
        res.json({
            data:{
                tableSearch: [
                    {
                        title: '课程名',
                        key: 'subject',
                        type: 'input'
                    }, {
                        title: '地点',
                        key: 'address',
                        type: 'input'
                    }, {
                        title: '时间',
                        key: 'time',
                        type: 'select',
                        data: [
                            {
                                title: '2:00',
                                value: '2:00',
                            }
                        ]
                    }, {
                        title: '监考教师',
                        key: 'teacher',
                        type: 'input'
                    }
                ],
                colums: [
                    {
                        title: 'Id',
                        dataIndex: 'id',
                        key: 'id',
                    },{
                        title: '课程名',
                        dataIndex: 'subject',
                        key: 'subject',
                    }, {
                        title: '时间',
                        dataIndex: 'time',
                        key: 'time',
                    }, {
                        title: '地点',
                        dataIndex: 'address',
                        key: 'address',
                    }, {
                        title: '监考教师',
                        dataIndex: 'teacher',
                        key: 'teacher',
                    }, 
                ],
                tableData: [
                    {
                        key: '1',
                        id: '1',
                        subject: '数学',
                        time: 32,
                        address: '丹青912',
                        teacher: '老罗'
                    }, {
                        key: '2',
                        name: 'Jim Green',
                        age: 42,
                        address: 'London No. 1 Lake Park',
                    }, {
                        key: '3',
                        name: 'Joe Black',
                        age: 32,
                        address: 'Sidney No. 1 Lake Park',
                    }
                ],
                actions: [
                    {
                        title: '查看',
                        value: 'watch',
                    },
                    {
                        title: '编辑',
                        value: 'edit',
                    },
                    {
                        title: '删除',
                        value: 'delete',
                    }
                ]
            },
            errno: 0,
            errmasg: 'msg'
        })
    }
}